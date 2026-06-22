@echo off
echo ==============================================
echo   Starting QuoteFlow AI Services
echo ==============================================

:: Try starting Docker containers if docker-compose is available
where docker-compose >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [1/3] Starting Docker database containers...
    cd database
    docker-compose up -d
    cd ..
) else (
    echo [1/3] Docker Compose not found. Using local in-memory dev database profile.
)

echo [2/3] Starting Spring Boot Backend...
echo Freeing up port 8081 if in use...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8081') do taskkill /f /pid %%a 2>nul
start "QuoteFlow Backend" cmd /k "cd backend && mvnw.cmd spring-boot:run"

echo [3/3] Starting React Frontend (Vite)...
start "QuoteFlow Frontend" cmd /k "cd frontend && npm run dev"

echo Waiting for services to initialize...
timeout /t 5 /nobreak >nul

echo Opening landing page in your browser...
start http://localhost:5173

echo ==============================================
echo   QuoteFlow AI is now running!
echo ==============================================
