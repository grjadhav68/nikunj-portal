@echo off
echo Installing Nikunj Portal dependencies...
echo.

echo Installing server dependencies...
cd server
call npm install
if errorlevel 1 (
    echo Failed to install server dependencies
    pause
    exit /b 1
)

cd ..

echo Installing client dependencies...
cd client
call npm install
if errorlevel 1 (
    echo Failed to install client dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo ✅ All dependencies installed successfully!
echo.
echo Next steps:
echo 1. Run: npm start (in root folder to start both server and client)
echo    OR
echo 2. Run server: cd server && npm start
echo    Run client: cd client && npm start (in separate terminal)
echo.
pause
