$urls = @{
  'pexels-13319078.webp' = 'https://images.pexels.com/photos/13319078/pexels-photo-13319078.jpeg'
  'pexels-4956914.webp'  = 'https://images.pexels.com/photos/4956914/pexels-photo-4956914.jpeg'
  'pexels-35641136.webp' = 'https://images.pexels.com/photos/35641136/pexels-photo-35641136.jpeg'
  'pexels-38706741.webp' = 'https://images.pexels.com/photos/38706741/pexels-photo-38706741.jpeg'
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
