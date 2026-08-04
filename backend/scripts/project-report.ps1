Clear-Host

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "        POVOS ONE PROJECT REPORT" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "Checking Build..." -ForegroundColor Yellow

npm run build

Write-Host ""

if ($LASTEXITCODE -eq 0) {
    Write-Host "BUILD STATUS : PASS" -ForegroundColor Green
}
else {
    Write-Host "BUILD STATUS : FAIL" -ForegroundColor Red
}

Write-Host ""
Write-Host "Current Directory :" -ForegroundColor Yellow
Get-Location

Write-Host ""
Write-Host "Next Sprint : Opportunity Intelligence" -ForegroundColor Cyan

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan