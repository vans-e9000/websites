param(
  [string]$OutDir = "assets/img"
)
$photos = @(
  @{ id = 32751450; name = "pexels-32751450.webp" },
  @{ id = 39356833; name = "pexels-39356833.webp" },
  @{ id = 8586035;  name = "pexels-8586035.webp" },
  @{ id = 39576121; name = "pexels-39576121.webp" },
  @{ id = 13319078; name = "pexels-13319078.webp" },
  @{ id = 4956914;  name = "pexels-4956914.webp" },
  @{ id = 35641136; name = "pexels-35641136.webp" },
  @{ id = 38706741; name = "pexels-38706741.webp" }
)
$UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
foreach ($p in $photos) {
  $out = Join-Path $OutDir $p.name
  if (Test-Path $out) { Write-Host "$($p.name) already present"; continue }
  $url = "https://images.pexels.com/photos/$($p.id)/pexels-photo-$($p.id).jpeg"
  Write-Host "Downloading $($p.name)..."
  curl.exe -s -A $UA --max-time 90 -o $out $url
  if (Test-Path $out) {
    $sz = (Get-Item $out).Length
    Write-Host "  OK $sz bytes"
  } else {
    Write-Warning "  failed $out"
  }
}
