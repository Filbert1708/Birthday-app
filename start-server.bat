@echo off
REM Birthday Celebration App - Local Server
REM This script starts a simple HTTP server to serve the app

echo.
echo ====================================
echo Birthday Celebration App Server
echo ====================================
echo.
echo Starting server...
echo.

REM Get the directory of this script
cd /d "%~dp0"

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Python to start the server...
    echo.
    echo The app will be available at:
    echo - Local: http://localhost:8000
    echo - Or open index.html directly in your browser
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
) else (
    echo Python not found. Trying Node.js...
    node --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo Using Node.js to start the server...
        echo Please run: npx http-server
    ) else (
        echo Neither Python nor Node.js found.
        echo You can still open index.html directly in your browser!
        echo Or use any local server tool.
        pause
    )
)
