$urls = @{
  'pexels-39576121.webp' = 'https://images.pexels.com/photos/39576121/pexels-photo-39576121.jpeg'
  'pexels-8586035.webp'  = 'https://images.pexels.com/photos/8586035/pexels-photo-8586035.jpeg'
  'pexels-39356833.webp' = 'https://images.pexels.com/photos/39356833/pexels-photo-39356833.jpeg'
  'pexels-32751450.webp' = 'https://images.pexels.com/photos/32751450/pexels-photo-32751450.jpeg'
}

$ps = Join-Path $PWD.Path 'assets/img'
if (-not (Test-Path $ps)) {
  New-Item -Path $ps -ItemType Directory -Force | Out-Null
}

foreach ($file in $urls.Keys) {
  $url = $urls[$file]
  $path = Join-Path $ps $file
  $attempts = 0
  $ok = $false
  while (-not $ok -and $attempts -lt 2) {
    $attempts++
    try {
      curl.exe -L -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36" --max-time 120 -o $path $url
      if ($LASTEXITCODE -eq 0) {
        $len = (Get-Item $path).Length
        if ($len -gt 0) {
          Write-Output "saved $file size=$len source=$url"
          $ok = $true
        } else {
          Write-Output "skip $file empty size=$len source=$url"
          $ok = $true
        }
      } else {
        Write-Output "fail $file curlExit=$LASTEXITCODE source=$url"
      }
    } catch {
      Write-Output "fail $file attempt=$attempts err=$($_) source=$url"
    }
  }
}
