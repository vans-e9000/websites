function Download-IfMissing($url, $dest) {
  if (Test-Path $dest -PathType Leaf) {
    return "exists: $dest"
  }
  try {
    $r = Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -TimeoutSec 120 -Headers @{"User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"}
    return "downloaded: $dest -> $($r.BaseResponse.StatusCode) size=$($r.ContentLength)"
  } catch {
    return "failed: $dest -> $_"
  }
}

$out = "assets/img"
$calls = @(
  @("https://images.pexels.com/photos/13319078/pexels-photo-13319078.jpeg", "$out/pexels-13319078.webp"),
  @("https://images.pexels.com/photos/4956914/pexels-photo-4956914.jpeg", "$out/pexels-4956914.webp"),
  @("https://images.pexels.com/photos/35641136/pexels-photo-35641136.jpeg", "$out/pexels-35641136.webp"),
  @("https://images.pexels.com/photos/38706741/pexels-photo-38706741.jpeg", "$out/pexels-38706741.webp"),
  @("https://images.pexels.com/photos/32751450/pexels-photo-32751450.jpeg", "$out/pexels-32751450.webp"),
  @("https://images.pexels.com/photos/39356833/pexels-photo-39356833.jpeg", "$out/pexels-39356833.webp"),
  @("https://images.pexels.com/photos/8586035/pexels-photo-8586035.jpeg", "$out/pexels-8586035.webp"),
  @("https://images.pexels.com/photos/39576121/pexels-photo-39576121.jpeg", "$out/pexels-39576121.webp"),
  @("https://www.pexels.com/photo/construction-worker-on-scaffolding-at-work-38706741/", "$out/pexels-38706741.webp")
)

$results = foreach ($item in $calls) {
  $url, $dest = $item
  Write-Host "($url) -> $dest"
  Download-IfMissing $url $dest
  Write-Host ""
}
