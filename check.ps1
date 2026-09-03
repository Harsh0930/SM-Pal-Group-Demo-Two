$ids = @(
  'photo-1511818966892-d7d671e672a2',
  'photo-1581094288338-2314dddb7ece',
  'photo-1504309092620-4d0a726d0f1b',
  'photo-1565008447742-97f6f38c985c',
  'photo-1591375275624-c4ac39c8af3a',
  'photo-1602152516060-c2ff4d8d5a8c',
  'photo-1518568814500-bf0f8d125f46',
  'photo-1455165814004-1126a7199f9b',
  'photo-1465146344425-f00d5f5c8f07',
  'photo-1564415051543-2e0b62a7e75b',
  'photo-1518486645465-b0e2c8b7d8a3',
  'photo-1503656142023-618e7d1f435a',
  'photo-1622920537-32b6b5b3a4d3'
)
foreach ($id in $ids) {
  $u = "https://images.unsplash.com/$id`?auto=format&fit=crop&w=1200&q=85"
  try {
    $r = Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -ErrorAction Stop
    Write-Host "$id => $($r.StatusCode)"
  } catch {
    Write-Host "$id => 404"
  }
}
