/* Cabletronics — hero title "dashed vector paths" effect.
   A vanilla reimplementation of the React Bits TechText component: the H1 is
   rendered to a canvas layer where letters under the cursor morph from solid
   fill into dashed vector outlines, with drifting specks, a scanning sweep,
   click-kick impulse and draggable letters.

   Progressive enhancement: the real <h1> stays in the DOM for SEO and screen
   readers. The canvas is aria-hidden and is only shown once it has drawn its
   first frame. If canvas is unsupported or the user prefers reduced motion the
   effect never initialises and the plain H1 remains visible. */

(function () {
  "use strict";

  var doc = document;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function canvasSupported() {
    try {
      var c = doc.createElement("canvas");
      return !!(c.getContext && c.getContext("2d"));
    } catch (e) {
      return false;
    }
  }

  function init() {
    if (reduceMotion.matches || !canvasSupported()) return;

    var h1 = doc.querySelector(".hero-inner h1");
    if (!h1) return;

    /* ---- configuration (mapped from the TechText snippet onto the palette) ---- */
    var ACCENT = "#ecfba9";          // accentColor, from the design tokens
    var DASH = [4, 2];               // dashLength / dashGap
    var LINE_W = 1.5;                // strokeWidth
    var SOFTNESS = 0.7;              // softness — inner core vs. fade zone
    var REACH_FACTOR = 1.4;          // reach (200) scaled from fontSize 140
    var SPECKS = 28;                 // specks
    var SPEED = 1.2;                 // spring speed
    var BOUNCE = 0.4;                // bounce
    var KICK = 5.5;                  // clickKick impulse
    var LABELS = true;               // labels
    var SWEEP = true;                // sweep
    var PAD = 70;                    // breathing room around the H1 for particles
    var MONO = "600 11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

    var canvas = doc.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.position = "absolute";
    canvas.style.pointerEvents = "none";
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    canvas.style.zIndex = "1";

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var chars = [];
    var specks = [];
    var originX = 0;          // canvas top-left in viewport coords at measure time
    var originY = 0;
    var cssW = 0;
    var cssH = 0;
    var fontPx = 0;
    var reach = 0;
    var h1Font = "";
    var accentRgb = "236, 251, 169";

    var pointer = { x: -99999, y: -99999, active: false };
    var drag = null;
    var sweepT = 0;
    var sweepX = -9999;
    var sweepOn = 0;
    var lastTs = 0;
    var raf = 0;
    var inView = true;
    var started = false;

    /* ---- measure H1 layout character-by-character using the live DOM ---- */
    function measure() {
      var r = h1.getBoundingClientRect();
      if (!r.width) return false;

      var parent = h1.parentElement;               // .hero-inner (position: relative)
      var pRect = parent.getBoundingClientRect();
      var cs = getComputedStyle(h1);

      fontPx = parseFloat(cs.fontSize) || 48;
      reach = fontPx * REACH_FACTOR;
      h1Font = cs.fontWeight + " " + fontPx + "px " + cs.fontFamily;
      ctx.font = h1Font;

      var ascent = fontPx * 0.8;
      try {
        var m = ctx.measureText("H");
        if (m.fontBoundingBoxAscent) ascent = m.fontBoundingBoxAscent;
      } catch (e) {}

      cssW = Math.ceil(r.width + PAD * 2);
      cssH = Math.ceil(r.height + PAD * 2);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      canvas.style.left = Math.round(r.left - PAD - pRect.left) + "px";
      canvas.style.top = Math.round(r.top - PAD - pRect.top) + "px";

      originX = r.left - PAD;
      originY = r.top - PAD;

      // Walk the H1 text nodes so the <em> keeps its own colour.
      chars.length = 0;
      var walker = doc.createTreeWalker(h1, NodeFilter.SHOW_TEXT, null);
      var node;
      while ((node = walker.nextNode())) {
        var color = getComputedStyle(node.parentElement).color;
        var text = node.nodeValue;
        for (var i = 0; i < text.length; i++) {
          var chr = text.charAt(i);
          if (chr === " " || chr === "\n" || chr === "\t") continue;

          var range = doc.createRange();
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          var cr = range.getBoundingClientRect();
          if (!cr.width && !cr.height) continue;

          chars.push({
            ch: chr,
            color: color,
            x: cr.left - originX,                       // canvas-local left
            y: cr.top + ascent - originY,               // canvas-local baseline
            w: cr.width,
            cx: cr.left + cr.width / 2 - originX,       // centre
            cy: cr.top + cr.height / 2 - originY,
            act: 0,
            ox: 0, oy: 0, vx: 0, vy: 0, pOx: 0, pOy: 0,
            dragged: false
          });
        }
      }

      if (!specks.length) {
        for (var s = 0; s < SPECKS; s++) specks.push(makeSpeck());
      }
      return chars.length > 0;
    }

    function makeSpeck() {
      return { x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, size: 1, on: false };
    }

    function activeChar() {
      var pool = [];
      for (var i = 0; i < chars.length; i++) {
        if (chars[i].act > 0.35) pool.push(chars[i]);
      }
      if (!pool.length) return null;
      return pool[(Math.random() * pool.length) | 0];
    }

    function respawn(s) {
      var a = activeChar();
      if (!a) {
        s.on = false;
        s.life = 0.2;
        return;
      }
      s.on = true;
      s.x = a.cx + (Math.random() - 0.5) * a.w * 2.4;
      s.y = a.cy + (Math.random() - 0.5) * fontPx * 1.1;
      s.vx = (Math.random() - 0.5) * 0.35;
      s.vy = (Math.random() - 0.5) * 0.35 - 0.05;
      s.size = 0.8 + Math.random() * 1.4;
      s.max = 0.5 + Math.random() * 1.1;
      s.life = s.max;
    }

    function update(dt, now) {
      var speed = SPEED;
      var damp = 0.86 - BOUNCE * 0.12;

      for (var i = 0; i < chars.length; i++) {
        var c = chars[i];

        // --- activation: soft core inside (1 - softness) * reach, fading to reach ---
        var target = 0;
        if (pointer.active) {
          var dx = pointer.x - c.cx;
          var dy = pointer.y - c.cy;
          var d = Math.sqrt(dx * dx + dy * dy);
          var inner = reach * (1 - SOFTNESS);
          if (d <= inner) {
            target = 1;
          } else if (d < reach) {
            var u = (reach - d) / (reach - inner);
            target = u * u * (3 - 2 * u);
          }
        }

        // --- sweep boost: a scanning band raises activation as it passes ---
        if (SWEEP && sweepOn > 0) {
          var sd = Math.abs(c.cx - sweepX);
          var band = reach * 0.5;
          if (sd < band) {
            var g = 1 - sd / band;
            g = g * g * (3 - 2 * g) * sweepOn;
            if (g > target) target = g;
          }
        }

        c.act += (target - c.act) * Math.min(1, 0.18 * dt);

        // --- spring physics for kick / drag release ---
        if (!c.dragged) {
          c.vx = (c.vx - c.ox * (0.11 * speed)) * damp;
          c.vy = (c.vy - c.oy * (0.11 * speed)) * damp;
          c.ox += c.vx * dt;
          c.oy += c.vy * dt;
          if (Math.abs(c.ox) < 0.02 && Math.abs(c.vx) < 0.02) { c.ox = 0; c.vx = 0; }
          if (Math.abs(c.oy) < 0.02 && Math.abs(c.vy) < 0.02) { c.oy = 0; c.vy = 0; }
        } else {
          c.pOx = c.ox;
          c.pOy = c.oy;
        }
      }

      // --- specks ---
      for (var s = 0; s < specks.length; s++) {
        var sp = specks[s];
        sp.life -= dt / 60;
        if (sp.life <= 0) respawn(sp);
        if (sp.on) {
          sp.x += sp.vx * dt;
          sp.y += sp.vy * dt;
          sp.vx *= 0.99;
          sp.vy *= 0.99;
        }
      }

      // --- sweep timeline (~3s cycle, ~1.6s travel) ---
      if (SWEEP) {
        sweepT += (dt / 60) * 0.02 * speed;
        var cyc = 1;
        var p = sweepT % cyc;
        if (p < 0.5) {
          var k = p / 0.5;
          sweepX = -reach + (cssW + reach * 2) * k;
          sweepOn = Math.sin(k * Math.PI);
        } else {
          sweepOn = 0;
          sweepX = -9999;
        }
      }
    }

    function draw(now) {
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.font = h1Font;
      ctx.textBaseline = "alphabetic";
      ctx.lineJoin = "round";

      // --- letters ---
      for (var i = 0; i < chars.length; i++) {
        var c = chars[i];
        var dx = c.x + c.ox;
        var dy = c.y + c.oy;
        var fillA = 1 - c.act;
        var strokeA = c.act;

        if (fillA > 0.02) {
          ctx.globalAlpha = fillA;
          ctx.fillStyle = c.color;
          ctx.fillText(c.ch, dx, dy);
        }
        if (strokeA > 0.02) {
          ctx.globalAlpha = strokeA;
          ctx.strokeStyle = "rgba(" + accentRgb + ",1)";
          ctx.lineWidth = LINE_W;
          ctx.setLineDash(DASH);
          ctx.lineDashOffset = (now * 0.012) % 6;
          ctx.strokeText(c.ch, dx, dy);
          ctx.setLineDash([]);
        }
      }
      ctx.globalAlpha = 1;

      // --- sweep band ---
      if (SWEEP && sweepOn > 0) {
        var grad = ctx.createLinearGradient(sweepX - 26, 0, sweepX + 26, 0);
        grad.addColorStop(0, "rgba(" + accentRgb + ",0)");
        grad.addColorStop(0.5, "rgba(" + accentRgb + "," + (0.1 * sweepOn).toFixed(3) + ")");
        grad.addColorStop(1, "rgba(" + accentRgb + ",0)");
        ctx.fillStyle = grad;
        ctx.fillRect(sweepX - 26, 0, 52, cssH);
      }

      // --- specks ---
      for (var s = 0; s < specks.length; s++) {
        var sp = specks[s];
        if (!sp.on || sp.life <= 0) continue;
        var a = (sp.life / sp.max) * 0.85;
        ctx.globalAlpha = a;
        ctx.fillStyle = "rgba(" + accentRgb + ",1)";
        ctx.fillRect(sp.x, sp.y, sp.size, sp.size);
      }
      ctx.globalAlpha = 1;

      // --- label on the most active letter ---
      if (LABELS) {
        var top = null;
        for (var j = 0; j < chars.length; j++) {
          if (chars[j].act > 0.65 && (!top || chars[j].act > top.act)) top = chars[j];
        }
        if (top) {
          ctx.globalAlpha = Math.min(1, (top.act - 0.65) / 0.3);
          ctx.font = MONO;
          ctx.fillStyle = "rgba(" + accentRgb + ",1)";
          ctx.textBaseline = "middle";
          var label = top.ch + "  " + Math.round(top.cx) + "." + Math.round(top.cy);
          var lx = top.cx + top.w / 2 + 10 + top.ox;
          var ly = top.cy + top.oy;
          ctx.fillText(label, lx, ly);
          ctx.strokeStyle = "rgba(" + accentRgb + ",1)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(lx - 6, ly);
          ctx.lineTo(lx - 2, ly);
          ctx.stroke();
          ctx.textBaseline = "alphabetic";
        }
      }
    }

    function frame(ts) {
      raf = requestAnimationFrame(frame);
      if (!inView || doc.hidden) return;
      if (!lastTs) lastTs = ts;
      var raw = ts - lastTs;
      lastTs = ts;
      var dt = Math.max(0.4, Math.min(2, raw / 16.667));
      update(dt, ts);
      draw(ts);
    }

    function toLocal(clientX, clientY) {
      var rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function overTitle(p) {
      return p.x >= -PAD && p.x <= cssW + PAD && p.y >= -PAD && p.y <= cssH + PAD;
    }

    function nearestChar(p, radius) {
      var best = null;
      var bestD = radius;
      for (var i = 0; i < chars.length; i++) {
        var c = chars[i];
        var dx = p.x - (c.cx + c.ox);
        var dy = p.y - (c.cy + c.oy);
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < bestD) { bestD = d; best = c; }
      }
      return best;
    }

    function kick(p) {
      var radius = reach;
      for (var i = 0; i < chars.length; i++) {
        var c = chars[i];
        var cx = c.cx + c.ox;
        var cy = c.cy + c.oy;
        var dx = cx - p.x;
        var dy = cy - p.y;
        var d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < radius) {
          var f = (1 - d / radius) * KICK;
          c.vx += (dx / d) * f;
          c.vy += (dy / d) * f;
        }
      }
    }

    /* ---- pointer wiring (canvas is pointer-events: none) ---- */
    function onMove(e) {
      var p = toLocal(e.clientX, e.clientY);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = true;
      if (drag) {
        drag.ox = p.x - drag.cx;
        drag.oy = p.y - drag.cy;
      }
    }

    function onDown(e) {
      if (e.button != null && e.button !== 0) return;
      var p = toLocal(e.clientX, e.clientY);
      if (!overTitle(p)) return;
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = true;

      var grab = nearestChar(p, Math.max(24, fontPx * 0.5));
      kick(p);
      if (grab && !grab.dragged) {
        drag = grab;
        grab.dragged = true;
        grab.vx = 0;
        grab.vy = 0;
        e.preventDefault();
      }
    }

    function onUp() {
      if (drag) {
        drag.dragged = false;
        var release = 0.9;
        drag.vx = Math.max(-18, Math.min(18, (drag.ox - drag.pOx) * release));
        drag.vy = Math.max(-18, Math.min(18, (drag.oy - drag.pOy) * release));
        drag = null;
      }
    }

    function onLeave() {
      pointer.active = false;
      onUp();
    }

    /* ---- lifecycle ---- */
    function start() {
      if (started) return;
      started = true;
      lastTs = 0;
      raf = requestAnimationFrame(frame);
    }

    function teardown() {
      cancelAnimationFrame(raf);
      started = false;
    }

    function remeasure() {
      if (measure()) draw(performance.now());
    }

    // Reveal only after the canvas has drawn a real frame.
    function boot() {
      if (!measure()) return;
      var parent = h1.parentElement;      // sibling of the H1 — never its child,
      parent.appendChild(canvas);         // so opacity:0 on the H1 can't hide it
      draw(performance.now());
      h1.style.opacity = "0";             // hand the visuals to the canvas layer
      canvas.style.opacity = "1";
      start();
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: false });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    doc.documentElement.addEventListener("pointerleave", onLeave);

    var resizeTimer = 0;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(remeasure, 140);
    });

    doc.addEventListener("visibilitychange", function () {
      if (!doc.hidden) lastTs = 0;
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
      }, { threshold: 0 }).observe(h1);
    }

    reduceMotion.addEventListener &&
      reduceMotion.addEventListener("change", function (e) {
        if (e.matches) {
          teardown();
          h1.style.opacity = "";
          if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
          started = false;
        }
      });

    // Measure only once the web font is ready so metrics match the DOM.
    if (doc.fonts && doc.fonts.ready) {
      doc.fonts.ready.then(boot).catch(function () {});
    } else {
      boot();
    }
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
