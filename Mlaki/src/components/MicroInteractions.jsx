import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Activity, 
  Calendar, 
  Droplet, 
  Gauge, 
  ArrowRight, 
  CheckCircle,
  Radio,
  Layers,
  Sparkles
} from 'lucide-react';

export default function MicroInteractions() {
  /* ---------------- Card 1: Diagnostic Shuffler ---------------- */
  const [shufflerCards, setShufflerCards] = useState([
    {
      id: 1,
      title: "HDPE PE100 Electrofusion Rig",
      capacity: "DN 90mm – 450mm",
      metric: "16.0 Bar Certified",
      status: "Active Deployment",
      zone: "Dodoma Rural Reticulation"
    },
    {
      id: 2,
      title: "Rotary DTH Air-Hammer Drilling Rig",
      capacity: "Depth capability 250m",
      metric: "32,000 L/hr Aquifer Yield",
      status: "Operational",
      zone: "Bahi Basin Hydrogeology"
    },
    {
      id: 3,
      title: "Continuous Monolithic Concrete Batching",
      capacity: "50m³/hr Output",
      metric: "Class C30/37 Waterproof",
      status: "Casting Phase",
      zone: "Morogoro Reservoir Tower"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShufflerCards((prev) => {
        const copy = [...prev];
        const last = copy.pop();
        copy.unshift(last);
        return copy;
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- Card 2: Telemetry Typewriter ---------------- */
  const telemetryMessages = [
    "RUWASA DODOMA-SECTOR 4: INTAKE FLOW 42.8 L/S · STATIC PRESSURE 7.4 BAR",
    "KILOSA RESERVOIR TANK #2: WATER LEVEL 21.8M (92% FULL) · OUTLET CLEAR",
    "BAHI BOREHOLE #09: SOLAR PV ARRAY YIELD 12.4 KW · DISCHARGE ACTIVE",
    "CHAMWINO BULK LINE: HYDROSTATIC INTEGRITY 100% · 0.00 LEAK DETECTED",
    "MKAMBAKO ROAD CULVERT: STORMWATER DRAIN VELOCITY 2.8 M/S · OPTIMAL"
  ];

  const [messageIndex, setMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFull = telemetryMessages[messageIndex];
    let timer;

    if (!isDeleting && displayText.length < currentFull.length) {
      timer = setTimeout(() => {
        setDisplayText(currentFull.slice(0, displayText.length + 1));
      }, 45);
    } else if (!isDeleting && displayText.length === currentFull.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentFull.slice(0, displayText.length - 1));
      }, 20);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setMessageIndex((prev) => (prev + 1) % telemetryMessages.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, messageIndex]);

  /* ---------------- Card 3: Cursor Protocol Scheduler ---------------- */
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDayIndex, setActiveDayIndex] = useState(2); // Tuesday default
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const schedulerTimer = setInterval(() => {
      setActiveDayIndex((prev) => (prev + 1) % 7);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 1200);
    }, 3500);
    return () => clearInterval(schedulerTimer);
  }, []);

  const milestones = [
    { day: 1, title: "Geotech Soil Profiling & Surveying" },
    { day: 2, title: "Trench Shoring & HDPE Pipe Laying" },
    { day: 3, title: "Reservoir Formwork Concrete Pour" },
    { day: 4, title: "Aquifer 72hr Step-Drawdown Flush" },
    { day: 5, title: "Hydrostatic 20-Bar Pressure Testing" },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="pill-tag mb-3 inline-flex">
            <Cpu className="w-3.5 h-3.5" />
            <span>FUNCTIONAL ENGINEERING ARTIFACTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#131b33] tracking-tight">
            Precision Field Protocols
          </h2>
          <p className="mt-3 text-base text-[#434f59]">
            Live operational micro-UIs showcasing equipment availability, real-time telemetry from remote water distribution schemes, and weekly QA/QC verification workflows.
          </p>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Diagnostic Shuffler */}
          <div className="card-surface bg-[#f5f6f7] flex flex-col justify-between border border-[#ced0d2]/70 h-[440px] relative overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-telemetry font-bold text-[#165cfd] uppercase tracking-wider">
                  Artifact 01 // Shuffler
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white text-[#131b33] font-medium border border-[#ced0d2]/50 shadow-xs">
                  Rotating Fleet
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-[#131b33]">
                Diagnostic Capacity Shuffler
              </h3>
              <p className="text-xs text-[#434f59] mt-1">
                Real-time equipment availability and field unit readiness cycle.
              </p>
            </div>

            {/* Overlapping Shuffling Cards Stack */}
            <div className="relative h-56 w-full flex items-center justify-center my-auto">
              {shufflerCards.map((card, idx) => {
                // Spring bounce transition styling based on stack index
                const translateY = idx * 16;
                const scale = 1 - idx * 0.05;
                const opacity = 1 - idx * 0.18;
                const zIndex = 30 - idx;

                return (
                  <div
                    key={card.id}
                    style={{
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      opacity,
                      zIndex,
                      transition: 'all 600ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                    className="absolute top-4 left-0 right-0 p-5 bg-white rounded-2xl shadow-md border border-[#ced0d2]/60"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#f5f6f7]">
                      <span className="text-[11px] font-mono-telemetry font-bold text-[#165cfd]">
                        FLEET #{card.id}
                      </span>
                      <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-200">
                        {card.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#131b33] mt-2">
                      {card.title}
                    </h4>

                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-[#8a8a8a]">Capacity:</span>
                      <span className="font-semibold text-[#131b33]">{card.capacity}</span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="text-[#8a8a8a]">Rating:</span>
                      <span className="font-mono-telemetry text-[#165cfd] font-bold">{card.metric}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#ced0d2]/60 text-xs text-[#8a8a8a]">
              <span>Cycle: Every 3.2s</span>
              <span className="font-mono-telemetry text-[#131b33] font-semibold">100% OPERATIONAL</span>
            </div>
          </div>

          {/* Card 2: Telemetry Typewriter */}
          <div className="card-surface bg-[#101828] text-white flex flex-col justify-between border border-white/10 h-[440px] relative overflow-hidden group shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-telemetry font-bold text-[#165cfd] uppercase tracking-wider">
                  Artifact 02 // Feed
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-telemetry">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>LIVE FEED</span>
                </div>
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                Telemetry Typewriter
              </h3>
              <p className="text-xs text-white/70 mt-1">
                Monitored pressure, flow, and reservoir metrics streamed from field sensors.
              </p>
            </div>

            {/* Typewriter Terminal Console */}
            <div className="my-auto p-5 bg-black/60 rounded-2xl border border-white/10 font-mono-telemetry">
              <div className="flex items-center justify-between text-[11px] text-white/40 pb-2 mb-3 border-b border-white/10">
                <span>TERMINAL: RUWASA-SCADA-01</span>
                <span>BAUD: 115200</span>
              </div>

              <div className="min-h-[90px] flex items-center">
                <p className="text-sm text-emerald-400 leading-relaxed font-mono">
                  &gt; {displayText}
                  <span className="inline-block w-2 h-4 ml-1 bg-[#165cfd] animate-pulse"></span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10 text-xs text-white/60">
                <div>
                  <span className="block text-[10px] text-white/40 uppercase">Channel Status</span>
                  <span className="text-white font-semibold">SECURE GSM ENCRYPTED</span>
                </div>
                <div>
                  <span className="block text-[10px] text-white/40 uppercase">Latency</span>
                  <span className="text-white font-semibold">42 ms</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-white/50">
              <span>Automatic Refresh</span>
              <span className="font-mono-telemetry text-emerald-400">TZ-WATER-NET OK</span>
            </div>
          </div>

          {/* Card 3: Cursor Protocol Scheduler */}
          <div className="card-surface bg-[#f5f6f7] flex flex-col justify-between border border-[#ced0d2]/70 h-[440px] relative overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-telemetry font-bold text-[#165cfd] uppercase tracking-wider">
                  Artifact 03 // Scheduler
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white text-[#131b33] font-medium border border-[#ced0d2]/50 shadow-xs">
                  Active Sprint
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-[#131b33]">
                Cursor Protocol Scheduler
              </h3>
              <p className="text-xs text-[#434f59] mt-1">
                Automated weekly milestone validation & QA protocol dispatch.
              </p>
            </div>

            {/* Weekly Days Grid (S M T W T F S) */}
            <div className="my-auto space-y-4">
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, idx) => {
                  const isSelected = activeDayIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveDayIndex(idx)}
                      className={`h-11 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all duration-300 relative ${
                        isSelected
                          ? 'bg-[#165cfd] text-white shadow-md scale-105'
                          : 'bg-white text-[#434f59] hover:bg-black/5 border border-[#ced0d2]/50'
                      }`}
                    >
                      <span>{day}</span>
                      <span className={`text-[9px] ${isSelected ? 'text-white/80' : 'text-[#8a8a8a]'}`}>
                        +{idx + 1}
                      </span>
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Milestone Display */}
              <div className="p-4 bg-white rounded-xl border border-[#ced0d2]/60 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-[#8a8a8a] mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#165cfd]" />
                  <span>Scheduled Protocol For Day {activeDayIndex + 1}:</span>
                </div>
                <div className="text-sm font-bold text-[#131b33]">
                  {milestones[activeDayIndex % milestones.length].title}
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[#165cfd] font-semibold">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle className="w-3.5 h-3.5" /> Ready for Inspector Signoff
                  </span>
                  <span className="font-mono-telemetry text-xs">CRB-QA/QC</span>
                </div>
              </div>
            </div>

            {/* Save / Dispatch Button with Magnetic Scale */}
            <div className="pt-3 border-t border-[#ced0d2]/60 flex items-center justify-between">
              <button
                onClick={() => {
                  setSavedSuccess(true);
                  setTimeout(() => setSavedSuccess(false), 1500);
                }}
                className={`w-full py-2.5 px-4 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  savedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#131b33] text-white hover:bg-[#165cfd]'
                }`}
              >
                <span>{savedSuccess ? 'Milestone Confirmed & Logged' : 'Dispatch Field Protocol'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
