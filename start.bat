@echo off
title 3D Political Map of India
echo ========================================================
echo   3D Political Map of India — Educational Atlas
echo ========================================================
echo.
echo 1. Opening interactive 3D map in your browser...
start "" "%~dp0standalone.html"
echo.
echo 2. Starting Vite local development server on http://localhost:3000 ...
echo.
npm run dev
pause
