@echo off
title Yamaha Racing Website
cd /d "%~dp0"
if not exist node_modules (
  echo Installing packages for the first time - needs internet...
  call npm install
)
echo.
echo Starting the Yamaha Racing website...
echo Your browser will open in a few seconds. Keep this window open.
echo To stop the website, close this window.
echo.
start "" cmd /c "timeout /t 10 >nul & start http://localhost:3000"
call npm run dev
pause
