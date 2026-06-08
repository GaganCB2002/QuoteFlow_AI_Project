@echo off
echo ========================================
echo   QuoteFlow AI - Full Project Launcher
echo ========================================

:: Step 1: Start the Database via Docker
echo [1/2] Starting Database services (PostgreSQL ^& Redis)...
cd database
docker-compose up -d
cd ..

:: Wait briefly for the database to accept connections
timeout /t 5 /nobreak >nul

:: Step 2: Start the Spring Boot Backend
echo [2/2] Starting Spring Boot Backend...
cd backend
echo ========================================
echo   QuoteFlow AI - Starting Application
echo ========================================
echo   Port: 8081
echo   URL:  http://localhost:8081
echo ========================================
call .\mvnw.cmd spring-boot:run
pause
