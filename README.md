# Rural Connect AI 🌏

> An intelligent community platform designed specifically for regional and rural Australia, featuring voice-first accessibility, blockchain trust, and immersive UI/UX.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://rural-connect-ai.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Built with Kiro](https://img.shields.io/badge/built%20with-Kiro-purple)](https://kiro.ai)

## 🎯 Overview

Rural Connect AI addresses critical challenges faced by rural communities including social isolation, limited access to services, economic opportunities, and emergency preparedness. Our platform combines cutting-edge AI, blockchain technology, and voice-first design to create an accessible, trustworthy, and engaging community platform.

## ⚡ Quick Start for Judges

**Want to see the platform with realistic data? Run this one command:**

```bash
# Windows
.\setup-demo.ps1

# Mac/Linux
./setup-demo.sh
```

Then open [http://localhost:5173](http://localhost:5173) and explore!

📖 **Full demo guide:** See [DEMO_WALKTHROUGH.md](DEMO_WALKTHROUGH.md)

## ✨ Key Features

### 🎤 Multilingual Voice-First Interface
- **Multi-language Support**: Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada
- **Hands-free interaction** for users while driving or working
- **Natural language processing** in local languages
- **Text-to-speech feedback** with native language support
- **Voice navigation** - complete menu-free operation
- **Offline voice commands** for basic navigation

### 👻 Ethereal Notification System
- **Holographic effects** with stunning visual animations
- **Contextual sounds** using Web Audio API
- **Spirit avatars** with AI-generated personalized designs
- **Haptic feedback** for mobile devices

### 💼 Gig Economy Platform
- **AI-powered job matching** based on skills and location
- **Micro-job board** for short-term work opportunities
- **Mutual ratings** for transparent reputation building
- **Real-time updates** via Socket.io

### 🔗 Blockchain Trust System
- **NFT credentials** on Polygon blockchain
- **Immutable reputation** with tamper-proof verification
- **Offline queue** for areas with poor connectivity
- **Public verification** for transparent trust

### 🗺️ Service Navigator
- **Government API integration** for Australian services
- **Voice search** with natural language
- **Offline cache** for essential services
- **Low-data mode** optimized for rural connectivity

### 🚨 Disaster & Weather Alert System
- **Real-time alerts** for floods, droughts, cyclones, heatwaves
- **Crop-specific advisories** with actionable recommendations
- **Emergency contacts** and crisis resources
- **Multi-language alerts** for diverse communities
- **Offline emergency information** always available

### 👩‍🌾 Women-First Mode
- **Women-only community groups** with privacy-first design
- **Health & finance focus** with specialized resources
- **Anonymous browsing** and encrypted messaging
- **Emergency exit button** for safety
- **Trusted contacts** and safety check-ins
- **Confidential support** for domestic violence

### ♿ Advanced Accessibility
- **WCAG AAA compliance** with comprehensive features
- **Screen reader optimization** for all content
- **High contrast mode** and adjustable text sizes
- **Keyboard-only navigation** with shortcuts
- **Reduced motion** options for cognitive accessibility
- **Color-blind friendly** design patterns

### 📱 Offline-First Architecture
- **Smart caching** of essential services and data
- **Auto-sync** when connectivity is restored
- **Low-data mode** for limited bandwidth areas
- **Offline voice commands** for basic navigation
- **Emergency services** always cached locally
- **Progressive download** of content by priority

### 🌾 Agriculture Intelligence
- **Farm dashboard** with crop and livestock management
- **Weather forecasting** with agricultural insights
- **Market prices** with real-time trends
- **Crop health analysis** using AI

### 💚 Wellbeing Support
- **Mental health check-ins** with mood tracking
- **Crisis resources** (Beyond Blue, Lifeline)
- **Peer support matching** with AI
- **Wellbeing trends** and insights

### 🏪 Business Networking
- **Business directory** for rural enterprises
- **Economic opportunities** discovery
- **Analytics dashboard** for business insights
- **AI-powered business matching**

### 📊 Metrics Dashboard
- **Real-time analytics** of platform usage
- **Geographic distribution** maps
- **Impact calculations** (time saved, economic value)
- **Engagement metrics** and trends

### ✨ Spirit Trails Map
- **3D visualization** with Three.js
- **Animated connections** between users
- **Event beacons** with pulsing effects
- **AR overlay** support with WebXR

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Three.js** + React Three Fiber for 3D graphics
- **Framer Motion** for smooth animations
- **Tailwind CSS** for styling
- **Chart.js** for data visualization
- **Web Speech API** for voice interface
- **Socket.io Client** for real-time updates

### Backend
- **Node.js** + Express with TypeScript
- **MongoDB** with Mongoose ODM
- **Redis** for caching
- **Socket.io** for real-time communication
- **JWT** for authentication
- **ethers.js** for blockchain integration

### External Services
- **OpenAI API** for AI features
- **Polygon Mumbai** testnet for blockchain
- **Australian Government APIs** (data.gov.au, Health Direct)
- **Weather APIs** for agricultural forecasting

### Testing & Quality
- **Jest** + React Testing Library
- **Playwright** for E2E testing
- **jest-axe** for accessibility testing
- **ESLint** + Prettier for code quality

## 🚀 Installation & Setup

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- MongoDB (optional - mock server available)
- Redis (optional)

### Quick Setup (Frontend Only with Mock Backend)

```bash
# Clone the repository
git clone https://github.com/yourusername/rural-connect-ai.git
cd rural-connect-ai

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Start mock backend server
cd backend
node mock-server.js

# In another terminal, start frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Full Stack Setup (with MongoDB)

```bash
# Install all dependencies
npm install
cd backend && npm install && cd ..

# Set up environment files
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and other settings

# Start MongoDB (if using Docker)
docker-compose -f docker-compose.dev.yml up -d mongodb redis

# Start backend
cd backend
npm run dev

# In another terminal, start frontend
npm run dev
```

### Using PowerShell Scripts (Windows)

```powershell
# Set up environment
.\setup-env.ps1

# Start frontend only with mock backend
.\start-frontend-only.ps1

# Start full stack
.\start-local.ps1
```

## 📁 Project Structure

```
rural-connect-ai/
├── src/                           # Frontend source code
│   ├── components/
│   │   ├── voice/                # Voice interface
│   │   ├── notifications/        # Ethereal notifications
│   │   ├── gig/                  # Gig board
│   │   ├── blockchain/           # Blockchain credentials
│   │   ├── services/             # Service navigator
│   │   ├── three/                # 3D graphics
│   │   ├── admin/                # Metrics dashboard
│   │   ├── agriculture/          # Farm management
│   │   ├── wellbeing/            # Mental health
│   │   └── business/             # Business networking
│   ├── services/                 # API services
│   ├── hooks/                    # Custom React hooks
│   ├── types/                    # TypeScript definitions
│   └── utils/                    # Utility functions
├── backend/                       # Backend source code
│   ├── src/
│   │   ├── models/               # MongoDB models
│   │   ├── services/             # Business logic
│   │   ├── routes/               # API endpoints
│   │   ├── middleware/           # Express middleware
│   │   └── validation/           # Input validation
│   ├── mock-server.js            # Mock backend for development
│   └── scripts/                  # Database seeding
├── __tests__/                     # Test files
│   ├── accessibility/            # Accessibility tests
│   ├── e2e/                      # End-to-end tests
│   ├── integration/              # Integration tests
│   ├── mobile/                   # Mobile tests
│   └── performance/              # Performance tests
├── public/                        # Static assets
├── scripts/                       # Build and deployment scripts
└── docs/                          # Documentation
```

## 🎬 Feature Demonstrations

### 1. Voice Interface
```
1. Click the microphone icon in navigation
2. Say "Search for agricultural services"
3. Watch voice command processing
4. Try: "Go to gig board", "Show my profile"
```

### 2. Ethereal Notifications
```
1. Navigate to Notifications demo
2. Click "Trigger Notification"
3. Observe holographic effects
4. Check notification history
```

### 3. Gig Board
```
1. Browse available micro-jobs
2. View AI matching scores
3. Post a new gig
4. Apply to jobs with real-time updates
```

### 4. Blockchain Credentials
```
1. Visit your profile
2. View earned NFT badges
3. Click "Verify on Blockchain"
4. Share verification link
```

### 5. Agriculture Dashboard
```
1. View farm profile and crops
2. Check weather forecast
3. Monitor market prices
4. Review crop health analysis
```

### 6. Wellbeing Dashboard
```
1. View wellbeing score and trends
2. Complete a check-in
3. Browse mental health resources
4. Connect with peer support
```

### 7. Service Navigator
```
1. Search for services by voice
2. View distance and ratings
3. Access contact information
4. Toggle low-data mode
```

### 8. Metrics Dashboard
```
1. View real-time platform statistics
2. Explore geographic distribution
3. Check impact calculations
4. Monitor engagement metrics
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suites
npm run test:integration
npm run test:e2e
npm run test:accessibility
npm run test:mobile
npm run test:performance

# Run all tests (frontend + backend)
npm run test:all
```

## 📚 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

### Backend
```bash
cd backend
npm run dev          # Start backend server
npm run build        # Build backend
npm test             # Run backend tests
node mock-server.js  # Start mock backend
```

## 🌐 API Endpoints

### Agriculture
- `GET /api/agriculture/dashboard` - Farm dashboard data
- `POST /api/agriculture/analyze-crop` - Analyze crop health
- `GET /api/agriculture/weather` - Weather forecast
- `GET /api/agriculture/market/:farmId` - Market prices

### Wellbeing
- `GET /api/wellbeing/dashboard` - Wellbeing dashboard
- `POST /api/wellbeing/checkin` - Submit check-in
- `GET /api/wellbeing/resources` - Mental health resources
- `GET /api/wellbeing/support-matches` - Find peer support

### Business
- `GET /api/business/directory` - Business directory
- `GET /api/business/:id/analytics` - Business analytics
- `GET /api/business/opportunities/area` - Economic opportunities

### Gigs
- `GET /api/v1/gigs` - List all gigs
- `POST /api/v1/gigs` - Create new gig
- `POST /api/v1/gigs/:id/apply` - Apply to gig

### Services
- `GET /api/v1/services` - List services
- `GET /api/v1/services/search` - Search services

### Blockchain
- `GET /api/v1/blockchain/credentials` - User credentials
- `POST /api/v1/blockchain/verify` - Verify credential

### Metrics
- `GET /api/v1/metrics` - Platform metrics
- `GET /api/v1/metrics/dashboard` - Detailed analytics

See [backend/README.md](backend/README.md) for complete API documentation.

## 🔒 Security

- **JWT Authentication** with secure token management
- **Input Validation** and sanitization
- **Rate Limiting** on API endpoints
- **HTTPS/TLS** encryption
- **CORS** configuration
- **Security Headers** (HSTS, CSP, X-Frame-Options)
- **Environment Variables** for sensitive data

## ♿ Accessibility

- **WCAG AAA Compliance** - Highest accessibility standards
- **Screen Reader Support** - Full ARIA labels
- **Keyboard Navigation** - All features accessible
- **High Contrast Mode** - Enhanced visibility
- **Adjustable Text Size** - Customizable fonts
- **Voice Interface** - Alternative input method

## 📱 Mobile Optimization

- **Responsive Design** - Works on all screen sizes
- **Touch Optimized** - Large touch targets
- **Offline First** - Service workers
- **PWA** - Installable progressive web app
- **Performance** - Optimized for mobile networks

## 🌍 Multi-Language Support

- **Translation API** integration
- **Aboriginal Languages** support
- **RTL Support** for right-to-left languages
- **Language Selector** for easy switching

## 📖 Documentation

### Quick Start Guides
- [Judges' Quick Reference](JUDGES_QUICK_REFERENCE.md)
- [Demo Walkthrough](DEMO_WALKTHROUGH.md)
- [Hackathon Features Test](HACKATHON_FEATURES_TEST.md)

### Development
- [Local Setup Guide](LOCAL_SETUP_GUIDE.md)
- [Backend API Documentation](backend/README.md)
- [Kiro Development Process](KIRO_WRITEUP.md)

### Feature Documentation
- [Voice Interface](VOICE_INTERFACE_IMPLEMENTATION.md)
- [Ethereal Notifications](ETHEREAL_NOTIFICATIONS_IMPLEMENTATION.md)
- [Gig Board](GIG_BOARD_IMPLEMENTATION.md)
- [Blockchain Trust](BLOCKCHAIN_IMPLEMENTATION_SUMMARY.md)
- [Service Navigator](SERVICE_NAVIGATOR_IMPLEMENTATION.md)
- [Spirit Trails](SPIRIT_TRAILS_IMPLEMENTATION.md)
- [Metrics Dashboard](METRICS_DASHBOARD_IMPLEMENTATION.md)
- [Accessibility](ACCESSIBILITY_IMPLEMENTATION.md)

### Deployment
- [Vercel Deployment](VERCEL_DEPLOYMENT.md)
- [Deployment Guide](README-DEPLOYMENT.md)

## 🎯 Impact & Problem Solving

### Problems Addressed
- **Social Isolation** - Limited community connections in rural areas
- **Service Access** - Difficulty finding essential services
- **Economic Opportunity** - Limited job prospects
- **Digital Divide** - Poor connectivity and digital literacy barriers
- **Trust Issues** - Lack of verification in online interactions

### Our Solutions
1. **Voice-First Design** - Accessible for all literacy levels
2. **Offline Capability** - Works with poor connectivity
3. **AI-Powered Matching** - Connects people with opportunities
4. **Blockchain Trust** - Verifiable credentials and reputation
5. **Immersive UX** - Engaging design encourages adoption

### Measurable Impact
- **Connections Made** - AI facilitates meaningful community connections
- **Jobs Created** - Gig board enables micro-employment
- **Services Accessed** - Navigator simplifies finding help
- **Time Saved** - Voice interface reduces friction
- **Trust Built** - Blockchain creates transparent reputation

## 🏗️ Built with Kiro

This project was developed using **Kiro's spec-driven development methodology**:

1. **Requirements Gathering** - EARS-compliant acceptance criteria
2. **Design Phase** - Comprehensive architecture and correctness properties
3. **Task Planning** - Incremental implementation with clear milestones
4. **Iterative Development** - Continuous refinement with feedback

See [KIRO_WRITEUP.md](KIRO_WRITEUP.md) for detailed insights.

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with tests
4. Run linting and tests (`npm run lint && npm test`)
5. Commit with semantic messages
6. Push and open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Kiro AI** - For the spec-driven development platform
- **Australian Government** - For open data APIs
- **Rural Communities** - For inspiring this solution
- **Open Source Community** - For amazing tools and libraries

## 📞 Contact & Support

- **Live Demo**: [rural-connect-ai.vercel.app](https://rural-connect-ai.vercel.app)
- **GitHub**: [github.com/yourusername/rural-connect-ai](https://github.com/yourusername/rural-connect-ai)
- **Issues**: [GitHub Issues](https://github.com/yourusername/rural-connect-ai/issues)
- **Email**: support@ruralconnect.au

## 🎥 Demo Video

Watch our 3-minute demo video: [YouTube Link](https://youtube.com/watch?v=demo-video-id)

---

**Built with ❤️ for Rural Australia** | **Powered by Kiro AI** | **Hackathon 2024**
