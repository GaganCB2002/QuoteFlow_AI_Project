@echo off
cd /d "%~dp0..\backend"
echo ========================================
echo   QuoteFlow AI - Starting Application
echo ========================================
echo   Port: 8081
echo   URL:  http://localhost:8081
echo ========================================
call .\mvnw.cmd spring-boot:run
pause
