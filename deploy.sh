#!/bin/bash

# Rural Connect AI - Quick Deployment Script
# This script helps you deploy your hackathon project quickly

echo "🚀 Rural Connect AI - Deployment Helper"
echo "========================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if there are uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "📝 You have uncommitted changes. Committing them now..."
    git add .
    git commit -m "Ready for hackathon deployment - $(date +%Y-%m-%d)"
    echo "✅ Changes committed"
else
    echo "✅ No uncommitted changes"
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git push origin main || git push origin master

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Deploy Backend to Render:"
echo "   → Go to https://dashboard.render.com/"
echo "   → Click 'New +' → 'Web Service'"
echo "   → Connect your GitHub repo"
echo "   → Root Directory: backend"
echo "   → Build Command: npm install"
echo "   → Start Command: npm start"
echo "   → Click 'Create Web Service'"
echo ""
echo "2. Deploy Frontend to Vercel:"
echo "   → Run: vercel --prod"
echo "   → Or go to https://vercel.com/dashboard"
echo "   → Import your GitHub repo"
echo "   → Framework: Vite"
echo "   → Build Command: npm run build"
echo "   → Output Directory: dist"
echo ""
echo "3. Update Environment Variables:"
echo "   → In Vercel, add: VITE_API_URL=<your-render-backend-url>/api"
echo "   → In Render, add: NODE_ENV=production, PORT=3001"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 Good luck with your hackathon! 🌾"