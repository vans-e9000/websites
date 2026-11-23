param(
  [string]$BaseUrl = "https://images.pexels.com/photos",
  [string]$OutDir = "assets/img"
)
$photos = @(
  @{ id = 32751450; name = "pexels-32751450.webp"; ext = "jpeg" },
  @{ id = 39356833; name = "pexels-39356833.webp"; ext = "jpeg" },
  @{ id = 8586035;  name = "pexels-8586035.webp";  ext = "jpeg" },
  @{ id = 39576121; name = "pexels-39576121.webp"; ext = "jpeg" },
  @{ id = 13319078; name = "pexels-13319078.webp"; ext = "jpeg" },
  @{ id = 4956914;  name = "pexels-4956914.webp";  ext = "jpeg" },
  @{ id = 35641136; name = "pexels-35641136.webp"; ext = "jpeg" },
  @{ id = 38706741; name = "pexels-38706741.webp"; ext = "jpeg" }
)
$curlArgs = @("-s","-A","Mozilla/5.0 (Windows NT 10.0; Win64; x64)","--max-time","60","--retry","3","--retry-delay","2","-o","NA")
function DownloadOne($photo) {
  $out = Join-Path $OutDir $photo.name
  $url = "$BaseUrl/$($photo.id)/pexels-photo-$($photo.id).$($photo.ext)"
  if (Test-Path $out) {
    $sz = (Get-Item $out).Length
    Write-Host "$($photo.name) already present ($sz bytes)"
    return
  }
  Write-Host "Downloading $($photo.name)..."
  $cmd = "curl.exe $curlArgs $url $((Join-Path $OutDir $photo.name))"
  Invoke-Expression $cmd
  if (Test-Path $out) {
    $sz = (Get-Item $out).Length
    Write-Host "  OK $sz bytes"
  } else {
    Write-Warning "  missing $out"
  }
}
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
foreach ($p in $photos) { DownloadOne $p }
Write-Host "Done."
