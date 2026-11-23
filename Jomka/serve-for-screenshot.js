const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/HP/Documents/Web/Jomka';
const port = 18085;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let name = (req.url || '/').split('?')[0].split('#')[0];
  if (name.charAt(0) === '/') name = name.slice(1);
  if (name === '' || name === 'contact.html') name = 'contact.html';
  const file = path.join(dir, name);
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); res.end('missing ' + name); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(buf);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log('ok ' + port);
});
