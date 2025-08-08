@echo off
echo 🚀 Youth Generation Club Deployment Script
echo ==========================================

echo.
echo 📋 Prerequisites:
echo 1. GitHub repository connected to Vercel
echo 2. Railway account (for backend)
echo 3. Node.js installed locally
echo.

echo 🔧 Step 1: Testing Backend Locally
echo ----------------------------------
cd backend
echo Installing backend dependencies...
call npm install

echo Starting backend server...
start /B npm run dev

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo Testing backend health endpoint...
curl -s http://localhost:4000/api/health || echo ❌ Backend health check failed

echo.
echo 🔧 Step 2: Testing Frontend Locally
echo -----------------------------------
cd ..\frontend
echo Installing frontend dependencies...
call npm install

echo Testing frontend build...
call npm run build

echo.
echo ✅ Local testing complete!
echo.
echo 🚀 Deployment Steps:
echo ====================
echo.
echo 1. Backend Deployment (Railway):
echo    - Go to https://railway.app
echo    - Create new project from GitHub
echo    - Set root directory to 'backend'
echo    - Deploy and get your backend URL
echo.
echo 2. Frontend Deployment (Vercel):
echo    - In Vercel project settings, add environment variable:
echo      VITE_API_URL=https://your-backend-url.railway.app/api
echo    - Deploy will happen automatically via GitHub
echo.
echo 3. Testing:
echo    - Test backend: https://your-backend-url.railway.app/api/health
echo    - Test frontend: Your Vercel URL
echo.

echo 🧹 Cleanup complete!
pause 