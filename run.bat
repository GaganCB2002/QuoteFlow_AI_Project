@echo off
echo ===================================================
echo        Starting QuoteFlow Full-Stack App
echo ===================================================
echo.

echo [1/2] Starting Spring Boot Backend...
start "QuoteFlow Backend" cmd /k "cd backend && ..\mvnw.cmd spring-boot:run"

echo [2/2] Starting React Frontend...
start "QuoteFlow Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ===================================================
echo QuoteFlow has been launched! 
echo Two new windows have opened for the frontend and backend.
echo You can safely close this window.
echo ===================================================
pause
