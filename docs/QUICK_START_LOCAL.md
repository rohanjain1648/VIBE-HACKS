# Quick Start - Running Locally (No MongoDB Required)

## ✅ Your Application is Now Running!

### Access Points:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## What's Running:

### 1. Mock Backend Server (Port 3001)
- ✅ Provides mock data for all API endpoints
- ✅ No MongoDB installation required
- ✅ No Redis installation required
- ✅ Perfect for frontend development and testing

### 2. Frontend Development Server (Port 5173)
- ✅ React + Vite with hot reload
- ✅ All UI features working
- ✅ Connected to mock backend

## Available Features:

### ✅ Working Features:
- Voice interface (Web Speech API)
- 3D visualizations and animations
- All UI components
- Navigation and routing
- Mock data for:
  - Metrics dashboard
  - Gig board
  - Service navigator
  - User profiles
  - Notifications
  - Blockchain credentials

### ⚠️ Limited Features (Mock Data):
- Database operations (using mock data)
- Real-time Socket.io (not connected)
- Blockchain transactions (mock responses)
- External API calls (mock responses)

## Testing the Application:

### 1. Open the Frontend
Visit: http://localhost:5173

### 2. Try These Features:
- **Voice Interface**: Click the microphone icon and say "search for health services"
- **Gig Board**: Browse mock job listings with AI matching scores
- **Service Navigator**: Search for services (mock data)
- **Metrics Dashboard**: View platform statistics (mock data)
- **3D Map**: See the spirit trails visualization

### 3. Test API Endpoints:
```powershell
# Health check
curl http://localhost:3001/health

# Get metrics
curl http://localhost:3001/api/v1/metrics

# Get gigs
curl http://localhost:3001/api/v1/gigs

# Get services
curl http://localhost:3001/api/v1/services
```

## Stopping the Servers:

Press `Ctrl+C` in each terminal window, or I can stop them for you.

## Next Steps:

### To Run with Full Backend (MongoDB Required):

1. **Install MongoDB**:
   - Download from: https://www.mongodb.com/try/download/community
   - Or use Docker: `docker run -d -p 27017:27017 mongo`

2. **Setup Backend Environment**:
   ```powershell
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Start Full Backend**:
   ```powershell
   cd backend
   npm run dev
   ```

4. **Seed Demo Data**:
   ```powershell
   cd backend
   npm run seed:demo
   ```

### To Deploy to Production:

See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for deployment instructions.

## Troubleshooting:

### Port Already in Use:
If you see "Port 3001 is in use" or "Port 5173 is in use":
```powershell
# Find and kill the process
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Frontend Can't Connect to Backend:
1. Check backend is running: http://localhost:3001/health
2. Check CORS settings in backend/mock-server.js
3. Check .env.development has correct API URL

### Voice Interface Not Working:
1. Make sure you're using HTTPS or localhost
2. Grant microphone permissions in browser
3. Use Chrome or Edge (best Web Speech API support)

## Demo Credentials:

For the full backend (when MongoDB is set up):
- Email: `demo@ruralconnect.au`
- Password: `demo2024`

## Support:

- Check [DEMO_WALKTHROUGH.md](DEMO_WALKTHROUGH.md) for feature guide
- Check [README.md](README.md) for full documentation
- Check [KIRO_WRITEUP.md](KIRO_WRITEUP.md) for development process

---

**Built with ❤️ for Rural Australia | Powered by Kiro AI**
