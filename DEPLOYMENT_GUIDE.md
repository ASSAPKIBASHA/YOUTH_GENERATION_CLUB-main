# Deployment Guide for Youth Generation Club

## Backend Deployment (Railway)

### Step 1: Prepare Backend
The backend is already configured for deployment. Key changes made:
- Updated `package.json` with proper production scripts
- Backend uses `process.env.PORT` for port configuration
- CORS is enabled for cross-origin requests

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Set the root directory to `backend`
7. Railway will automatically detect it's a Node.js app and deploy

### Step 3: Get Backend URL
After deployment, Railway will provide a URL like:
`https://your-app-name.railway.app`

Your API will be available at:
`https://your-app-name.railway.app/api`

## Frontend Deployment (Vercel)

### Step 1: Configure Environment Variables
In your Vercel project settings, add the environment variable:
```
VITE_API_URL=https://your-backend-url.railway.app/api
```

### Step 2: Deploy Frontend
1. Your frontend is already configured for Vercel deployment
2. The `vercel.json` in the `frontend/` directory handles SPA routing
3. Vercel will automatically deploy when you push to GitHub

## Local Development

### Step 1: Start Backend
```bash
cd backend
npm install
npm run dev
```

### Step 2: Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### Step 3: Create Local Environment File
Create `frontend/.env.local` with:
```
VITE_API_URL=http://localhost:4000/api
```

## Testing the Integration

1. **Backend Test:**
   - Visit `https://your-backend-url.railway.app/api/gallery`
   - Should return JSON data

2. **Frontend Test:**
   - Visit your Vercel frontend URL
   - Check Gallery and Blog pages load data from backend
   - Test join form submission

## Troubleshooting

### CORS Issues
If you see CORS errors, ensure the backend CORS configuration includes your frontend domain:
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.vercel.app', 'http://localhost:3000']
}));
```

### Environment Variables
- Frontend environment variables must start with `VITE_` to be accessible
- Check Vercel environment variables are set correctly
- Restart deployment after changing environment variables

### Database Persistence
- Railway provides persistent storage for the `database.json` file
- Data will persist between deployments
- You can view/edit the database file in Railway's file explorer

## Alternative Backend Hosting

If Railway doesn't work for you, consider:
- **Render**: Similar to Railway, free tier available
- **Heroku**: More established, has free tier
- **DigitalOcean App Platform**: Reliable, paid service
- **Vercel Functions**: Serverless functions (more complex setup)

## Security Notes

- The current setup uses a simple JSON file database
- For production use, consider:
  - Adding authentication to admin endpoints
  - Using a proper database (PostgreSQL, MongoDB)
  - Implementing rate limiting
  - Adding input validation 