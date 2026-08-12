Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd D:\povos_one\backend; npx ts-node --transpile-only src/main.ts"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd D:\povos_one\frontend; Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue; npm run dev"
Write-Host "✅ Backend and frontend started." -ForegroundColor Green
Write-Host "🌐 Open http://localhost:3000" -ForegroundColor Yellow
