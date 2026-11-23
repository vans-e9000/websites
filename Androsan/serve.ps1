$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
node .\serve.mjs
