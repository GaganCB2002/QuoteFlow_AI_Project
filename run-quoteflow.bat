@echo off
echo ========================================
echo   QuoteFlow AI - Full Project Launcher
echo ========================================

:: Step 1: Start the Database via Docker
echo [1/3] Starting Database services (PostgreSQL ^& Redis)...
cd database
docker-compose up -d
cd ..

:: Wait briefly for the database to accept connections
timeout /t 5 /nobreak >nul

:: Step 2: Start the Spring Boot Backend in a new window
echo [2/3] Starting Spring Boot Backend...
cd backend
start "QuoteFlow Backend (Port 8081)" cmd /k ".\mvnw.cmd spring-boot:run"
cd ..

echo ========================================
echo   All services have been started!
echo   Application is running on http://localhost:8081
echo ========================================
pause
