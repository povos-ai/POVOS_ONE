Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd D:\povos_one\backend; npx ts-node --transpile-only src/main.ts"
Start-Sleep -Seconds 4
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd D:\povos_one\frontend; Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue; npm run dev"
Write-Host "✅ Backend and frontend started. Open http://localhost:3000." -ForegroundColor Green
