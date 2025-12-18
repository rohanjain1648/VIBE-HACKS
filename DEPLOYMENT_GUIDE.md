# 🚀 Rural Connect AI - Hackathon Deployment Guide

## Quick Start Deployment (Recommended for Hackathon)

### Option 1: Deploy to Vercel + Render (Easiest & Free)

This is the **fastest and easiest** way to get your project live for the hackathon.

---

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ Git installed and project pushed to GitHub
- ✅ Node.js 18+ installed locally
- ✅ Accounts created on:
  - [Vercel](https://vercel.com) (for frontend)
  - [Render](https://render.com) (for backend)

---

## 🎯 Step-by-Step Deployment

### Part 1: Deploy Backend to Render

#### 1. Prepare Backend for Deployment

Create a `backend/start.js` file:

```javascript
// backend/start.js
const { spawn } = require('child_process');

// Start the mock server for demo purposes
const mockServer = spawn('node', ['mock-server.js'], {
  cwd: __dirname,
  stdio: 'inherit'
});

mockServer.on('error', (error) => {
  console.error('Failed to start mock server:', error);
  process.exit(1);
});

mockServer.on('close', (code) => {
  console.log(`Mock server exited with code ${code}`);
  process.exit(code);
});

process.on('SIGTERM', () => {
  mockServer.kill('SIGTERM');
});

process.on('SIGINT', () => {
  mockServer.kill('SIGINT');
});
```

#### 2. Update Backend package.json

Add this to `backend/package.json` scripts:

```json
{
  "scripts": {
    "start": "node start.js"
  }
}
```

#### 3. Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `rural-connect-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `3001`

6. Click **"Create Web Service"**
7. Wait 5-10 minutes for deployment
8. Copy your backend URL (e.g., `https://rural-connect-backend.onrender.com`)

---

### Part 2: Deploy Frontend to Vercel

#### 1. Create Environment File

Create `.env.production` in the root directory:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Replace `your-backend-url` with your actual Render backend URL.

#### 2. Update CORS in Backend

Update `backend/mock-server.js` to allow your Vercel domain:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app',  // Add your Vercel URL here
    'https://*.vercel.app'  // Allow all Vercel preview deployments
  ],
  credentials: true
}));
```

#### 3. Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Option B: Using Vercel Dashboard**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

6. Click **"Deploy"**
7. Wait 3-5 minutes for deployment
8. Your app will be live at `https://your-app.vercel.app`

---

## 🔧 Alternative Deployment Options

### Option 2: Deploy to Netlify + Railway

#### Frontend on Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub repository
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Environment variables**: Add `VITE_API_URL`

#### Backend on Railway

1. Go to [Railway](https://railway.app/)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Add environment variables
5. Railway will auto-detect and deploy

---

### Option 3: Deploy Everything to Single Platform (Render)

#### Deploy Full Stack on Render

1. **Backend Service** (as described above)
2. **Frontend Static Site**:
   - Click **"New +"** → **"Static Site"**
   - Connect repository
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - Add environment variables

---

## 🎨 Post-Deployment Checklist

### 1. Test All Features

Visit your deployed app and test:
- ✅ Home page loads
- ✅ 3D Landscape renders
- ✅ Business Directory filters work
- ✅ Matilda AI chatbot responds
- ✅ Agricultural Dashboard displays data
- ✅ Cultural Heritage stories load
- ✅ Wellbeing Dashboard works
- ✅ Advanced Features accessible

### 2. Update Backend URL

If you deployed backend first, update frontend environment variable:
```bash
# On Vercel
vercel env add VITE_API_URL production
# Enter your backend URL when prompted
vercel --prod
```

### 3. Enable HTTPS

Both Vercel and Render provide automatic HTTPS. Verify:
- Frontend URL starts with `https://`
- Backend URL starts with `https://`

### 4. Test API Connectivity

Open browser console on your deployed site and check:
```javascript
// Should see successful API calls
fetch('https://your-backend-url.onrender.com/health')
  .then(r => r.json())
  .then(console.log)
```

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch" errors

**Solution**: Check CORS configuration in backend
```javascript
// backend/mock-server.js
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

### Issue: 3D scenes not rendering

**Solution**: Ensure Three.js assets are included in build
- Check `dist` folder contains all assets
- Verify no console errors about missing modules

### Issue: Environment variables not working

**Solution**: 
- Vercel: Variables must start with `VITE_`
- Rebuild after adding variables
- Check deployment logs for errors

### Issue: Backend sleeping (Render free tier)

**Solution**: 
- Free tier sleeps after 15 min inactivity
- First request takes 30-60 seconds to wake up
- Consider upgrading for hackathon demo
- Or use a ping service to keep it awake

---

## 📱 Mobile Testing

Test on mobile devices:
1. Open deployed URL on phone
2. Test touch controls in 3D landscape
3. Verify responsive design
4. Check voice features work

---

## 🎤 Hackathon Demo Tips

### Before Your Presentation

1. **Pre-load the site** 5 minutes before demo
2. **Test all features** in the demo environment
3. **Have backup screenshots** ready
4. **Note the URLs**:
   - Frontend: `https://your-app.vercel.app`
   - Backend: `https://your-backend.onrender.com`

### During Demo

1. Start with the **Home Page** - show feature cards
2. Demo **3D Landscape** - interactive terrain
3. Show **Matilda AI** - voice and chat
4. Display **Business Directory** - working filters
5. Highlight **Advanced Features** - IoT, Analytics
6. Emphasize **Mobile Responsive** design

### Talking Points

- ✨ **AI-Powered**: Matilda AI assistant with personality
- 🌏 **3D Interactive**: Real-time Australian landscape
- 📊 **IoT Integration**: Farm monitoring dashboard
- 🗣️ **Multilingual**: Voice interface in 8 languages
- 📱 **Mobile-First**: Responsive design for rural areas
- 🎨 **Modern UI**: Consistent green/blue theme
- ♿ **Accessible**: WCAG compliant features

---

## 🚀 Quick Deploy Commands

```bash
# 1. Commit all changes
git add .
git commit -m "Ready for hackathon deployment"
git push origin main

# 2. Deploy frontend to Vercel
vercel --prod

# 3. Backend deploys automatically on Render (if connected to GitHub)
# Or manually trigger deployment from Render dashboard
```

---

## 📊 Monitoring Your Deployment

### Vercel Analytics
- View deployment logs: `vercel logs`
- Check analytics: Vercel Dashboard → Analytics

### Render Logs
- View logs: Render Dashboard → Your Service → Logs
- Monitor health: Check `/health` endpoint

---

## 🎯 Final Pre-Demo Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and responding
- [ ] All environment variables set correctly
- [ ] CORS configured for production URLs
- [ ] All features tested in production
- [ ] Mobile responsiveness verified
- [ ] Demo script prepared
- [ ] Backup screenshots ready
- [ ] URLs bookmarked and ready to share

---

## 🆘 Emergency Backup Plan

If deployment fails before demo:

1. **Run locally** and share screen
2. **Record video** of features working
3. **Use ngrok** to expose local server:
   ```bash
   npm install -g ngrok
   ngrok http 5173
   ```

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html

---

## 🎉 You're Ready!

Your Rural Connect AI platform is now deployed and ready to impress the hackathon judges!

**Good luck with your presentation! 🌾🚀**
