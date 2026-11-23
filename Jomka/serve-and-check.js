const http = require('http');
const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/HP/Documents/Web/Jomka';
const port = 18083;

const server = http.createServer((req, res) => {
  const raw = req.url || '/';
  const norm = raw.replace(/^\/+/, '').split('?')[0].split('#')[0];
  console.log('req', JSON.stringify({ url: raw, norm }));
  const file = path.join(dir, norm === 'contact.html' ? 'contact.html' : norm);
  fs.stat(file, (err, st) => {
    if (err) {
      console.log('missing', norm, err && err.code);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('missing ' + norm);
      return;
    }
    fs.readFile(file, (err, buf) => {
      if (err) {
        console.log('read err', norm, err && err.code);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('read error ' + norm);
        return;
      }
      const ext = path.extname(file).toLowerCase();
      const ct = ext === '.html' ? 'text/html; charset=utf-8' : 'application/octet-stream';
      console.log('serving', norm, buf && buf.length);
      res.writeHead(200, { 'Content-Type': ct });
      res.end(buf);
    });
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log('listening', port);
  setTimeout(() => {
    console.log('closing');
    server.close();
    process.exit(0);
  }, 45000);
});
