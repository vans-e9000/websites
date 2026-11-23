$ErrorActionPreference = 'Stop'
$base = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 8793
Set-Location $base

$existing = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($existing) {
    $processIds = $existing | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($processId in $processIds) {
        if ($processId -and $processId -ne $PID) {
            Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
        }
    }
    Start-Sleep -Milliseconds 500
}

Write-Host "Starting Angoni Electrical preview on http://192.168.100.243:$port/"
$node = (Get-Command node.exe -ErrorAction Stop).Source
Start-Process -FilePath $node `
    -ArgumentList @('.\preview-server.js') `
    -WorkingDirectory $base `
    -WindowStyle Hidden

Start-Sleep -Seconds 1
try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:$port/index.html" -UseBasicParsing -TimeoutSec 5
    Write-Host "Preview ready: HTTP $($response.StatusCode)"
    Write-Host "Open: http://192.168.100.243:$port/index.html"
} catch {
    Write-Error "Preview failed to start: $($_.Exception.Message)"
    exit 1
}
