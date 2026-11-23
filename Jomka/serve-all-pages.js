const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/HP/Documents/Web/Jomka';
const port = 8124;

const server = http.createServer((req, res) => {
  let name = (req.url || '/').split('?')[0].split('#')[0];
  if (name.charAt(0) === '/') name = name.slice(1);
  if (name === '' || name === 'index.html') name = 'index.html';
  const file = path.join(dir, name);
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); res.end('missing ' + name); return; }
    res.writeHead(200, { 'Content-Type': path.extname(file) === '.html' ? 'text/html; charset=utf-8' : 'application/octet-stream' });
    res.end(buf);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log('ok ' + port);
});
