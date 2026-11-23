$port = 18083
$dir = "C:\Users\HP\Documents\Web\Jomka"
Write-Host "Starting server on $port from $dir"
$js = @"
const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = $dir;
const port = $port;
const server = http.createServer((req, res) => {
  const safe = path.normalize(req.url).replace(/^\/+/, '');
  if (safe === '' || safe === 'contact.html') {
    const file = path.join(dir, 'contact.html');
    fs.readFile(file, (err, buf) => {
      if (err) { res.writeHead(404); res.end('missing'); return; }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(buf);
    });
  } else {
    res.writeHead(404); res.end('not found');
  }
});
server.listen(port, '127.0.0.1', () => { console.log('listening ' + port); });
"@
$job = Start-Job -ScriptBlock { param($js,$port) & node -e $js } -ArgumentList $js,$port
Start-Sleep 1
$response = Invoke-RestMethod -Uri "http://127.0.0.1:$port/contact.html" -Method Get -UseBasicParsing -TimeoutSec 8
Write-Host "HTTP GET contact.html -> status 200, length $($response.Length)"
Receive-Job $job -Keep | Select-Object -First 1 | Write-Host
Remove-Job $job -Force
