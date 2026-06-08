Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  QuoteFlow AI - Starting Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Port: 8081" -ForegroundColor Yellow
Write-Host "  URL:  http://localhost:8081" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kill any existing process on port 8081
$existing = Get-NetTCPConnection -LocalPort 8081 -ErrorAction SilentlyContinue
if ($existing) {
    Write-Host "Port 8081 in use. Stopping PID $($existing.OwningProcess)..." -ForegroundColor Yellow
    taskkill /F /PID $existing.OwningProcess /T 2>$null
    Start-Sleep -Seconds 2
}

Set-Location -LiteralPath "$PSScriptRoot\..\backend"
& ".\mvnw.cmd" spring-boot:run
