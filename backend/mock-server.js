/**
 * Mock Backend Server - No MongoDB Required
 * This provides mock data for frontend development
 */

const express = require('express');
const cors = require('cors');
const { createServer } = require('http');

const app = express();
const httpServer = createServer(app);
const port = 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Mock data
const mockMetrics = {
    totalUsers: 1247,
    activeUsers: 342,
    totalConnections: 5623,
    totalGigs: 189,
    totalServices: 456,
    avgResponseTime: 1.2,
    userGrowth: 23.5,
    engagementRate: 67.8,
    satisfactionScore: 4.6
};

// Agriculture Dashboard Mock Data
const mockAgricultureDashboard = {
    farm: {
        _id: 'farm-1',
        userId: 'demo-user',
        name: 'Sunny Valley Farm',
        location: {
            address: '123 Rural Road, Dubbo, NSW 2830',
            coordinates: {
                latitude: -32.9595,
                longitude: 147.3494
            },
            postcode: '2830',
            state: 'NSW'
        },
        totalArea: 500,
        farmType: 'Mixed Farming',
        crops: [
            {
                name: 'Wheat',
                variety: 'Suntop',
                plantingDate: new Date('2024-05-15').toISOString(),
                expectedHarvestDate: new Date('2024-12-15').toISOString(),
                area: 200,
                status: 'growing',
                notes: 'Looking healthy'
            },
            {
                name: 'Barley',
                variety: 'Compass',
                plantingDate: new Date('2024-06-01').toISOString(),
                expectedHarvestDate: new Date('2025-01-10').toISOString(),
                area: 150,
                status: 'growing'
            }
        ],
        livestock: [
            {
                type: 'Cattle',
                breed: 'Angus',
                count: 150,
                age: '2-5 years',
                healthStatus: 'healthy'
            },
            {
                type: 'Sheep',
                breed: 'Merino',
                count: 300,
                age: '1-4 years',
                healthStatus: 'healthy'
            }
        ],
        equipment: [
            {
                name: 'Tractor',
                type: 'Heavy Machinery',
                model: 'John Deere 6155R',
                condition: 'good'
            }
        ],
        soilType: 'Clay loam',
        irrigationType: 'Drip irrigation',
        organicCertified: false,
        createdAt: new Date('2023-01-15').toISOString(),
        updatedAt: new Date().toISOString()
    },
    weather: {
        location: {
            name: 'Dubbo',
            region: 'NSW',
            country: 'Australia',
            lat: -32.9595,
            lon: 147.3494
        },
        current: {
            temperature: 28,
            humidity: 45,
            windSpeed: 15,
            windDirection: 'NW',
            pressure: 1013,
            visibility: 10,
            uvIndex: 7,
            condition: 'Sunny',
            icon: 'sunny',
            rainfall: 0
        },
        forecast: [
            {
                date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                maxTemp: 30,
                minTemp: 18,
                avgTemp: 24,
                humidity: 50,
                rainfall: 0,
                condition: 'Partly Cloudy',
                icon: 'partly-cloudy',
                windSpeed: 12,
                uvIndex: 6
            },
            {
                date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
                maxTemp: 27,
                minTemp: 16,
                avgTemp: 21,
                humidity: 65,
                rainfall: 5,
                condition: 'Cloudy',
                icon: 'cloudy',
                windSpeed: 18,
                uvIndex: 4
            },
            {
                date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
                maxTemp: 25,
                minTemp: 15,
                avgTemp: 20,
                humidity: 80,
                rainfall: 15,
                condition: 'Rain',
                icon: 'rain',
                windSpeed: 20,
                uvIndex: 3
            }
        ],
        agricultural: {
            soilMoisture: 65,
            evapotranspiration: 4.5,
            growingDegreeDays: 1250,
            frostRisk: false,
            irrigationRecommendation: 'No irrigation needed for next 3 days',
            sprayingConditions: 'good'
        }
    },
    marketPrices: [
        {
            commodity: 'Wheat',
            variety: 'APW',
            price: 385,
            unit: 'tonne',
            currency: 'AUD',
            market: 'Dubbo',
            date: new Date().toISOString(),
            change: 2.5,
            trend: 'up'
        },
        {
            commodity: 'Barley',
            variety: 'Feed',
            price: 320,
            unit: 'tonne',
            currency: 'AUD',
            market: 'Dubbo',
            date: new Date().toISOString(),
            change: -1.2,
            trend: 'down'
        },
        {
            commodity: 'Canola',
            price: 720,
            unit: 'tonne',
            currency: 'AUD',
            market: 'Dubbo',
            date: new Date().toISOString(),
            change: 5.8,
            trend: 'up'
        }
    ],
    marketAlerts: [
        {
            commodity: 'Wheat',
            alertType: 'price_increase',
            message: 'Wheat prices up 2.5% due to strong export demand',
            severity: 'medium',
            date: new Date().toISOString()
        }
    ],
    recentAnalyses: [
        {
            _id: 'analysis-1',
            farmId: 'farm-1',
            cropName: 'Wheat',
            photoUrl: 'https://example.com/crop-photos/wheat-1.jpg',
            photoMetadata: {
                captureDate: new Date().toISOString(),
                location: {
                    latitude: -32.9595,
                    longitude: 147.3494
                },
                weather: {
                    temperature: 28,
                    humidity: 45,
                    rainfall: 0
                }
            },
            analysis: {
                healthScore: 85,
                diseaseDetected: [],
                pestDetected: ['Minor aphid activity'],
                nutritionDeficiency: [],
                growthStage: 'Vegetative',
                recommendations: [
                    'Apply organic pest control',
                    'Monitor closely for next week',
                    'Consider nitrogen application'
                ],
                confidence: 0.92
            },
            aiModel: 'CropVision-v2.1',
            processed: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            _id: 'analysis-2',
            farmId: 'farm-1',
            cropName: 'Barley',
            photoUrl: 'https://example.com/crop-photos/barley-1.jpg',
            photoMetadata: {
                captureDate: new Date(Date.now() - 86400000).toISOString(),
                location: {
                    latitude: -32.9595,
                    longitude: 147.3494
                }
            },
            analysis: {
                healthScore: 92,
                diseaseDetected: [],
                pestDetected: [],
                nutritionDeficiency: [],
                growthStage: 'Vegetative',
                recommendations: [
                    'Continue current care routine',
                    'Excellent crop health'
                ],
                confidence: 0.95
            },
            aiModel: 'CropVision-v2.1',
            processed: true,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString()
        }
    ],
    recommendations: [
        'Weather forecast shows rain in 3 days - good for crop growth',
        'Wheat prices trending up - consider selling strategy',
        'Soil moisture levels optimal - no irrigation needed'
    ],
    summary: {
        totalCrops: 2,
        totalLivestock: 2,
        healthyCrops: 2,
        alertsCount: 1,
        avgHealthScore: 88.5
    }
};

// Wellbeing Dashboard Mock Data
const mockWellbeingDashboard = {
    recentCheckIns: [
        {
            _id: 'checkin-1',
            userId: 'demo-user',
            date: new Date().toISOString(),
            moodScore: 7,
            stressLevel: 4,
            sleepQuality: 8,
            socialConnection: 6,
            physicalActivity: 7,
            notes: 'Feeling good today, got plenty of rest',
            tags: ['positive', 'rested'],
            isAnonymous: false,
            riskLevel: 'low',
            followUpRequired: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            _id: 'checkin-2',
            userId: 'demo-user',
            date: new Date(Date.now() - 86400000).toISOString(),
            moodScore: 6,
            stressLevel: 6,
            sleepQuality: 6,
            socialConnection: 5,
            physicalActivity: 5,
            notes: 'Bit stressed with farm work',
            tags: ['stressed', 'work'],
            isAnonymous: false,
            riskLevel: 'low',
            followUpRequired: false,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString()
        }
    ],
    trends: {
        mood: [6, 6.5, 7, 6.8, 7.2, 7, 7],
        stress: [6, 5.5, 5, 5.2, 4.8, 5, 4],
        sleep: [6, 6.5, 7, 7.5, 8, 7.8, 8],
        social: [5, 5.5, 6, 5.8, 6.2, 6, 6],
        activity: [5, 5.5, 6, 6.5, 7, 6.8, 7],
        dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    riskAssessment: {
        currentRisk: 'low',
        riskTrend: 'improving',
        lastCheckIn: new Date().toISOString()
    },
    supportConnections: [
        {
            _id: 'connection-1',
            supporterId: 'supporter-1',
            supporteeId: 'demo-user',
            connectionType: 'peer_support',
            status: 'active',
            matchingScore: 92,
            matchingFactors: {
                locationProximity: 90,
                experienceSimilarity: 95,
                availabilityMatch: 88,
                personalityMatch: 92,
                supportNeedsAlignment: 94
            },
            supportAreas: ['farming', 'mental health', 'rural life'],
            communicationPreferences: {
                methods: ['chat', 'video'],
                frequency: 'weekly',
                timezone: 'Australia/Sydney'
            },
            isAnonymous: false,
            lastInteraction: new Date().toISOString(),
            totalInteractions: 15,
            averageRating: 4.8,
            createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
            updatedAt: new Date().toISOString()
        }
    ],
    recommendedResources: [
        {
            _id: 'resource-1',
            title: 'Beyond Blue',
            description: 'Support for anxiety and depression',
            category: 'crisis',
            resourceType: 'phone',
            contactInfo: {
                phone: '1300 22 4636',
                website: 'https://www.beyondblue.org.au'
            },
            availability: {
                hours: '24/7',
                days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                timezone: 'Australia/Sydney',
                is24x7: true
            },
            targetAudience: ['adults', 'youth', 'seniors'],
            services: ['crisis support', 'counseling', 'information'],
            cost: 'free',
            location: {
                state: 'National',
                isNational: true
            },
            languages: ['English'],
            specializations: ['anxiety', 'depression', 'suicide prevention'],
            rating: 4.8,
            reviewCount: 1250,
            isVerified: true,
            lastVerified: new Date().toISOString()
        },
        {
            _id: 'resource-2',
            title: 'Lifeline',
            description: 'Crisis support and suicide prevention',
            category: 'crisis',
            resourceType: 'phone',
            contactInfo: {
                phone: '13 11 14',
                website: 'https://www.lifeline.org.au'
            },
            availability: {
                hours: '24/7',
                days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                timezone: 'Australia/Sydney',
                is24x7: true
            },
            targetAudience: ['adults', 'youth', 'seniors'],
            services: ['crisis support', 'suicide prevention', 'counseling'],
            cost: 'free',
            location: {
                state: 'National',
                isNational: true
            },
            languages: ['English'],
            specializations: ['crisis', 'suicide prevention', 'mental health'],
            rating: 4.9,
            reviewCount: 2100,
            isVerified: true,
            lastVerified: new Date().toISOString()
        }
    ]
};

// Business Dashboard Mock Data
const mockBusinessDashboard = {
    profile: {
        id: 'business-1',
        name: 'Rural Supplies Co',
        type: 'Agricultural Supplies',
        location: 'Dubbo, NSW',
        rating: 4.7,
        reviewCount: 45
    },
    analytics: {
        views: 234,
        inquiries: 18,
        connections: 12,
        revenue: 45000
    },
    opportunities: [
        {
            id: 'opp-1',
            title: 'Bulk Grain Purchase',
            type: 'buyer',
            value: 15000,
            location: 'Orange, NSW',
            distance: 45,
            matchScore: 88
        },
        {
            id: 'opp-2',
            title: 'Equipment Rental Partnership',
            type: 'partnership',
            value: 8000,
            location: 'Dubbo, NSW',
            distance: 5,
            matchScore: 92
        }
    ],
    recentMatches: [
        {
            id: 'match-1',
            businessName: 'Green Valley Farms',
            matchScore: 85,
            commonInterests: ['organic farming', 'sustainability'],
            distance: 12
        }
    ]
};

const mockGigs = [
    {
        id: '1',
        title: 'Farm Hand Needed',
        description: 'Help with harvest season',
        location: 'Dubbo, NSW',
        pay: 25,
        skills: ['farming', 'physical work'],
        aiMatchScore: 85
    },
    {
        id: '2',
        title: 'Tractor Operator',
        description: 'Experienced tractor driver needed',
        location: 'Wagga Wagga, NSW',
        pay: 35,
        skills: ['machinery', 'farming'],
        aiMatchScore: 92
    }
];

const mockServices = [
    {
        id: '1',
        name: 'Dubbo Base Hospital',
        category: 'health',
        location: 'Dubbo, NSW',
        distance: 5.2,
        rating: 4.5,
        contact: '02 6809 6000'
    },
    {
        id: '2',
        name: 'Rural Financial Counselling',
        category: 'financial',
        location: 'Orange, NSW',
        distance: 45.3,
        rating: 4.8,
        contact: '1800 686 175'
    }
];

// Health check
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Mock backend is running',
        timestamp: new Date().toISOString()
    });
});

// Metrics endpoint
app.get('/api/v1/metrics', (req, res) => {
    res.json({
        success: true,
        data: mockMetrics
    });
});

app.get('/api/v1/metrics/dashboard', (req, res) => {
    res.json({
        success: true,
        data: {
            ...mockMetrics,
            recentActivity: [
                { type: 'gig_posted', count: 12, timestamp: new Date() },
                { type: 'connection_made', count: 34, timestamp: new Date() }
            ],
            topRegions: [
                { name: 'Dubbo', users: 234 },
                { name: 'Orange', users: 189 },
                { name: 'Wagga Wagga', users: 156 }
            ]
        }
    });
});

// Gigs endpoints
app.get('/api/v1/gigs', (req, res) => {
    res.json({
        success: true,
        data: mockGigs
    });
});

app.post('/api/v1/gigs', (req, res) => {
    const newGig = {
        id: String(mockGigs.length + 1),
        ...req.body,
        aiMatchScore: Math.floor(Math.random() * 30) + 70
    };
    mockGigs.push(newGig);
    res.json({
        success: true,
        data: newGig
    });
});

// Services endpoints
app.get('/api/v1/services', (req, res) => {
    res.json({
        success: true,
        data: mockServices
    });
});

app.get('/api/v1/services/search', (req, res) => {
    const query = req.query.q || '';
    const filtered = mockServices.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase())
    );
    res.json({
        success: true,
        data: filtered
    });
});

// User endpoints
app.get('/api/v1/users/me', (req, res) => {
    res.json({
        success: true,
        data: {
            id: 'demo-user',
            name: 'Demo User',
            email: 'demo@ruralconnect.au',
            location: 'Dubbo, NSW',
            skills: ['farming', 'machinery'],
            reputation: 4.7
        }
    });
});

// Blockchain endpoints
app.get('/api/v1/blockchain/credentials', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: '1',
                name: 'Community Helper',
                description: 'Helped 10+ community members',
                issueDate: new Date(),
                verified: true
            }
        ]
    });
});

// Notifications endpoints
app.get('/api/v1/notifications', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: '1',
                type: 'gig_match',
                message: 'New gig matches your skills!',
                timestamp: new Date(),
                read: false
            }
        ]
    });
});

// ============================================
// AGRICULTURE ENDPOINTS
// ============================================

app.get('/api/agriculture/dashboard', (req, res) => {
    res.json({
        success: true,
        data: mockAgricultureDashboard
    });
});

app.post('/api/agriculture/farm', (req, res) => {
    res.json({
        success: true,
        data: { ...mockAgricultureDashboard.farm, ...req.body }
    });
});

app.post('/api/agriculture/analyze-crop', (req, res) => {
    res.json({
        success: true,
        data: {
            id: 'analysis-' + Date.now(),
            ...req.body,
            healthScore: Math.floor(Math.random() * 30) + 70,
            issues: Math.random() > 0.5 ? ['Minor pest activity'] : [],
            recommendations: ['Monitor closely', 'Maintain current care'],
            analyzedAt: new Date().toISOString()
        }
    });
});

app.get('/api/agriculture/crop-analysis/:farmId', (req, res) => {
    res.json({
        success: true,
        data: mockAgricultureDashboard.recentAnalysis
    });
});

app.get('/api/agriculture/weather', (req, res) => {
    res.json({
        success: true,
        data: mockAgricultureDashboard.weather
    });
});

app.get('/api/agriculture/market/:farmId', (req, res) => {
    res.json({
        success: true,
        data: mockAgricultureDashboard.marketPrices
    });
});

app.get('/api/agriculture/nearby-farms', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'farm-2',
                name: 'Green Valley Farm',
                location: { latitude: -32.95, longitude: 147.35, address: 'Near Dubbo, NSW' },
                distance: 12.5,
                crops: ['wheat', 'corn']
            },
            {
                id: 'farm-3',
                name: 'Riverside Ranch',
                location: { latitude: -32.97, longitude: 147.37, address: 'Dubbo Region, NSW' },
                distance: 18.3,
                livestock: { cattle: 200 }
            }
        ]
    });
});

// ============================================
// WELLBEING ENDPOINTS
// ============================================

app.get('/api/wellbeing/dashboard', (req, res) => {
    res.json({
        success: true,
        data: mockWellbeingDashboard
    });
});

app.post('/api/wellbeing/checkin', (req, res) => {
    res.json({
        success: true,
        data: {
            id: 'checkin-' + Date.now(),
            ...req.body,
            timestamp: new Date().toISOString()
        }
    });
});

app.get('/api/wellbeing/checkins', (req, res) => {
    res.json({
        success: true,
        data: {
            checkIns: mockWellbeingDashboard.recentCheckIns,
            pagination: {
                page: 1,
                limit: 20,
                total: mockWellbeingDashboard.recentCheckIns.length,
                pages: 1
            }
        }
    });
});

app.get('/api/wellbeing/resources', (req, res) => {
    res.json({
        success: true,
        data: mockWellbeingDashboard.resources
    });
});

app.get('/api/wellbeing/crisis-resources', (req, res) => {
    res.json({
        success: true,
        data: mockWellbeingDashboard.resources.filter(r => r.category === 'crisis')
    });
});

app.get('/api/wellbeing/support-matches', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'support-1',
                supporterName: 'Sarah M.',
                matchScore: 92,
                commonInterests: ['farming', 'mental health'],
                available: true
            },
            {
                id: 'support-2',
                supporterName: 'John D.',
                matchScore: 85,
                commonInterests: ['rural life', 'wellbeing'],
                available: true
            }
        ]
    });
});

app.post('/api/wellbeing/support-connection', (req, res) => {
    res.json({
        success: true,
        data: {
            id: 'connection-' + Date.now(),
            ...req.body,
            status: 'pending',
            createdAt: new Date().toISOString()
        }
    });
});

app.get('/api/wellbeing/support-connections', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'connection-1',
                supporterName: 'Sarah M.',
                status: 'active',
                connectionType: 'peer_support'
            }
        ]
    });
});

app.patch('/api/wellbeing/support-connection/:id', (req, res) => {
    res.json({
        success: true,
        data: {
            id: req.params.id,
            status: req.body.status,
            updatedAt: new Date().toISOString()
        }
    });
});

app.get('/api/wellbeing/peer-chats', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'chat-1',
                connectionId: 'connection-1',
                lastMessage: 'How are you doing today?',
                unreadCount: 2
            }
        ]
    });
});

app.post('/api/wellbeing/peer-chat', (req, res) => {
    res.json({
        success: true,
        data: {
            id: 'chat-' + Date.now(),
            ...req.body,
            createdAt: new Date().toISOString()
        }
    });
});

// ============================================
// BUSINESS ENDPOINTS
// ============================================

app.get('/api/business/directory', (req, res) => {
    res.json({
        success: true,
        data: {
            businesses: [
                mockBusinessDashboard.profile,
                {
                    id: 'business-2',
                    name: 'Farm Equipment Hire',
                    type: 'Equipment Rental',
                    location: 'Orange, NSW',
                    rating: 4.5,
                    reviewCount: 32
                },
                {
                    id: 'business-3',
                    name: 'Organic Produce Co-op',
                    type: 'Agricultural Co-op',
                    location: 'Wagga Wagga, NSW',
                    rating: 4.8,
                    reviewCount: 67
                }
            ],
            total: 3,
            page: 1,
            totalPages: 1
        }
    });
});

app.get('/api/business/recommendations', (req, res) => {
    res.json({
        success: true,
        data: [mockBusinessDashboard.profile]
    });
});

app.post('/api/business/profile', (req, res) => {
    res.json({
        success: true,
        data: { ...mockBusinessDashboard.profile, ...req.body }
    });
});

app.get('/api/business/:businessId', (req, res) => {
    res.json({
        success: true,
        data: mockBusinessDashboard.profile
    });
});

app.put('/api/business/:businessId', (req, res) => {
    res.json({
        success: true,
        data: { ...mockBusinessDashboard.profile, ...req.body }
    });
});

app.post('/api/business/matches', (req, res) => {
    res.json({
        success: true,
        data: {
            matches: mockBusinessDashboard.recentMatches
        }
    });
});

app.post('/api/business/:businessId/reviews', (req, res) => {
    res.json({
        success: true,
        data: {
            id: 'review-' + Date.now(),
            ...req.body,
            createdAt: new Date().toISOString()
        }
    });
});

app.get('/api/business/:businessId/analytics', (req, res) => {
    res.json({
        success: true,
        data: mockBusinessDashboard.analytics
    });
});

app.get('/api/business/opportunities/area', (req, res) => {
    res.json({
        success: true,
        data: {
            opportunities: mockBusinessDashboard.opportunities
        }
    });
});

// ============================================
// DUPLICATE ROUTES WITHOUT /api PREFIX FOR COMPATIBILITY
// ============================================

// Agriculture routes without /api
app.get('/agriculture/dashboard', (req, res) => {
    res.json({ success: true, data: mockAgricultureDashboard });
});

// Wellbeing routes without /api
app.get('/wellbeing/dashboard', (req, res) => {
    res.json({ success: true, data: mockWellbeingDashboard });
});

app.post('/wellbeing/checkin', (req, res) => {
    res.json({
        success: true,
        data: { id: 'checkin-' + Date.now(), ...req.body, timestamp: new Date().toISOString() }
    });
});

app.get('/wellbeing/resources', (req, res) => {
    res.json({ success: true, data: mockWellbeingDashboard.resources });
});

// Business routes without /api
app.get('/business/directory', (req, res) => {
    res.json({
        success: true,
        data: {
            businesses: [
                mockBusinessDashboard.profile,
                {
                    id: 'business-2',
                    name: 'Farm Equipment Hire',
                    type: 'Equipment Rental',
                    location: 'Orange, NSW',
                    rating: 4.5,
                    reviewCount: 32
                },
                {
                    id: 'business-3',
                    name: 'Organic Produce Co-op',
                    type: 'Agricultural Co-op',
                    location: 'Wagga Wagga, NSW',
                    rating: 4.8,
                    reviewCount: 67
                }
            ],
            total: 3,
            page: parseInt(req.query.page) || 1,
            totalPages: 1
        }
    });
});

app.get('/business/:businessId/analytics', (req, res) => {
    res.json({ success: true, data: mockBusinessDashboard.analytics });
});

// ============================================
// MULTILINGUAL VOICE ENDPOINTS
// ============================================

app.post('/api/voice/process-command', (req, res) => {
    const { text, language, confidence } = req.body;
    
    // Mock voice command processing
    let action = 'unknown';
    let response = '';
    
    if (text.toLowerCase().includes('search') || text.includes('खोजें') || text.includes('খুঁজুন')) {
        action = 'search';
        response = language === 'hi-IN' ? 'आपके लिए खोज रहा हूं...' : 'Searching for you now...';
    } else if (text.toLowerCase().includes('weather') || text.includes('मौसम') || text.includes('আবহাওয়া')) {
        action = 'weather';
        response = language === 'hi-IN' ? 'यहां मौसम की जानकारी है...' : 'Here is the weather information...';
    } else if (text.toLowerCase().includes('agriculture') || text.includes('कृषि') || text.includes('কৃষি')) {
        action = 'agriculture';
        response = language === 'hi-IN' ? 'कृषि डैशबोर्ड खोल रहा हूं...' : 'Opening agriculture dashboard...';
    }
    
    res.json({
        success: true,
        data: {
            action,
            response,
            confidence: confidence || 0.9
        }
    });
});

app.get('/api/voice/supported-languages', (req, res) => {
    res.json({
        success: true,
        data: [
            { code: 'en-AU', name: 'English (Australia)', nativeName: 'English', flag: '🇦🇺' },
            { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
            { code: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
            { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
            { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
            { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' }
        ]
    });
});

// ============================================
// DISASTER ALERT ENDPOINTS
// ============================================

app.get('/api/alerts/weather', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'alert-1',
                type: 'flood',
                severity: 'high',
                title: 'Flash Flood Warning',
                description: 'Heavy rainfall expected in the next 6 hours. River levels rising rapidly.',
                location: 'Dubbo Region, NSW',
                coordinates: [-32.2431, 148.6011],
                issuedAt: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
                source: 'Bureau of Meteorology',
                actionRequired: [
                    'Move livestock to higher ground',
                    'Secure farm equipment',
                    'Avoid low-lying areas',
                    'Monitor local radio for updates'
                ],
                cropImpact: {
                    affectedCrops: ['wheat', 'barley', 'canola'],
                    recommendations: [
                        'Harvest mature crops immediately if possible',
                        'Improve drainage in affected fields',
                        'Monitor for fungal diseases post-flood'
                    ]
                }
            },
            {
                id: 'alert-2',
                type: 'drought',
                severity: 'moderate',
                title: 'Drought Conditions Developing',
                description: 'Below average rainfall for 3 consecutive months.',
                location: 'Central West NSW',
                coordinates: [-32.9595, 147.3494],
                issuedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                source: 'NSW Department of Primary Industries',
                actionRequired: [
                    'Implement water conservation measures',
                    'Consider drought-resistant crop varieties',
                    'Review livestock feed supplies'
                ]
            }
        ]
    });
});

app.get('/api/alerts/crop-advisories', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'advisory-1',
                crop: 'Wheat',
                stage: 'Flowering',
                advisory: 'Monitor for rust diseases due to high humidity. Apply fungicide if symptoms appear.',
                priority: 'high',
                weatherCondition: 'High humidity, moderate temperatures',
                actionBy: 'Next 48 hours',
                resources: ['Fungicide application guide', 'Disease identification chart']
            },
            {
                id: 'advisory-2',
                crop: 'Cotton',
                stage: 'Boll Development',
                advisory: 'Increase irrigation frequency due to drought conditions.',
                priority: 'urgent',
                weatherCondition: 'Extended dry period',
                actionBy: 'Immediately'
            }
        ]
    });
});

// ============================================
// WOMEN-FIRST MODE ENDPOINTS
// ============================================

app.get('/api/women/groups', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'group-1',
                name: 'Rural Women\'s Health Circle',
                description: 'Safe space to discuss women\'s health issues, share experiences, and access resources.',
                category: 'health',
                memberCount: 156,
                isPrivate: true,
                moderators: ['Dr. Sarah Chen', 'Nurse Mary Williams'],
                location: 'Central West NSW',
                meetingSchedule: 'Every Tuesday 7 PM',
                tags: ['health', 'support', 'confidential', 'women-only']
            },
            {
                id: 'group-2',
                name: 'Women in Agriculture Network',
                description: 'Connecting female farmers, sharing knowledge, and supporting women in agricultural leadership.',
                category: 'business',
                memberCount: 89,
                isPrivate: false,
                moderators: ['Emma Thompson', 'Lisa Rodriguez'],
                location: 'Regional Australia',
                meetingSchedule: 'Monthly workshops',
                tags: ['farming', 'business', 'leadership', 'networking']
            },
            {
                id: 'group-3',
                name: 'Financial Independence for Women',
                description: 'Learn about budgeting, investing, and building financial security in rural areas.',
                category: 'finance',
                memberCount: 234,
                isPrivate: true,
                moderators: ['Financial Advisor Jane Smith'],
                location: 'NSW & QLD',
                meetingSchedule: 'Bi-weekly online sessions',
                tags: ['finance', 'education', 'independence', 'planning']
            }
        ]
    });
});

app.get('/api/women/health-resources', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'health-1',
                title: 'Women\'s Health Nurse',
                category: 'reproductive',
                description: 'Confidential reproductive health consultations via telehealth',
                provider: 'Rural Women\'s Health Service',
                contact: '1800 WOMEN (1800 966 363)',
                isConfidential: true
            },
            {
                id: 'health-2',
                title: 'Perinatal Mental Health Support',
                category: 'mental',
                description: 'Specialized support for pregnancy and postpartum mental health',
                provider: 'PANDA (Perinatal Anxiety & Depression Australia)',
                contact: '1300 726 306',
                isConfidential: true
            }
        ]
    });
});

app.get('/api/women/financial-resources', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'finance-1',
                title: 'Women in Agriculture Grant',
                type: 'grant',
                description: 'Funding for women starting or expanding agricultural businesses',
                eligibility: ['Female-owned business', 'Agricultural sector', 'Rural location'],
                amount: 'Up to $50,000',
                provider: 'Department of Agriculture',
                applicationDeadline: '30 June 2024'
            },
            {
                id: 'finance-2',
                title: 'Financial Literacy Program',
                type: 'education',
                description: 'Free financial education workshops specifically for rural women',
                eligibility: ['Women in rural areas', 'All income levels'],
                provider: 'Rural Financial Counselling Service',
                applicationDeadline: 'Ongoing enrollment'
            }
        ]
    });
});

// ============================================
// ADDITIONAL FEATURES ENDPOINTS
// ============================================

app.get('/api/features/offline-sync', (req, res) => {
    res.json({
        success: true,
        data: {
            lastSync: new Date().toISOString(),
            pendingUploads: 3,
            cachedData: {
                services: 45,
                gigs: 12,
                messages: 8
            }
        }
    });
});

app.get('/api/features/accessibility', (req, res) => {
    res.json({
        success: true,
        data: {
            highContrast: false,
            largeText: false,
            screenReader: true,
            voiceNavigation: true,
            keyboardOnly: false
        }
    });
});

app.post('/api/features/accessibility', (req, res) => {
    res.json({
        success: true,
        data: {
            ...req.body,
            updated: new Date().toISOString()
        }
    });
});

// ============================================
// MATILDA AI ASSISTANT ENDPOINTS
// ============================================

app.post('/api/ai/matilda/chat', (req, res) => {
    const { message, context } = req.body;
    
    // Mock AI response generation
    let response = "I'm here to help you with anything rural life related! ";
    let emotion = 'supportive';
    let suggestions = [];
    let actionItems = [];
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('weather')) {
        response = "I've been monitoring the weather patterns in your area! The forecast shows some interesting changes coming up that might affect your farming operations.";
        emotion = 'informative';
        suggestions = ['Show detailed forecast', 'Check crop advisories', 'Set weather alerts'];
    } else if (lowerMessage.includes('crop') || lowerMessage.includes('farm')) {
        response = "Your crops are looking good! Based on the latest sensor data and weather patterns, I'm seeing positive trends for your harvest.";
        emotion = 'excited';
        suggestions = ['View crop analysis', 'Check market prices', 'Plan harvest'];
        actionItems = [{
            type: 'reminder',
            title: 'Crop Health Check',
            description: 'Schedule weekly crop monitoring',
            action: 'schedule_reminder'
        }];
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
        response = "I'm always here to help, mate! What specific area would you like support with today?";
        emotion = 'supportive';
        suggestions = ['Farm management', 'Mental health', 'Business opportunities', 'Community connections'];
    }
    
    res.json({
        success: true,
        data: {
            response,
            emotion,
            suggestions,
            actionItems,
            timestamp: new Date().toISOString()
        }
    });
});

app.get('/api/ai/matilda/context', (req, res) => {
    res.json({
        success: true,
        data: {
            userName: 'Demo User',
            location: 'Dubbo, NSW',
            farmType: 'Mixed Farming',
            recentActivity: [
                'Checked weather forecast',
                'Completed wellbeing check-in',
                'Applied for grant'
            ],
            preferences: {
                communicationStyle: 'casual',
                topics: ['farming', 'mental health', 'community'],
                language: 'en-AU'
            }
        }
    });
});

// ============================================
// IOT FARM MONITORING ENDPOINTS
// ============================================

app.get('/api/iot/sensors', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'soil-temp-1',
                name: 'Soil Temperature - Field A',
                type: 'temperature',
                value: 22.5 + (Math.random() - 0.5) * 2,
                unit: '°C',
                status: 'online',
                location: { field: 'Field A - Wheat', coordinates: { lat: -32.9595, lng: 147.3494 } },
                batteryLevel: 85,
                signalStrength: 92,
                trend: 'stable',
                thresholds: { min: 15, max: 35, optimal: { min: 18, max: 25 } },
                lastUpdate: new Date().toISOString()
            },
            {
                id: 'soil-moisture-1',
                name: 'Soil Moisture - Field A',
                type: 'moisture',
                value: 68 + (Math.random() - 0.5) * 5,
                unit: '%',
                status: 'online',
                location: { field: 'Field A - Wheat', coordinates: { lat: -32.9595, lng: 147.3494 } },
                batteryLevel: 78,
                signalStrength: 88,
                trend: 'down',
                thresholds: { min: 30, max: 90, optimal: { min: 60, max: 80 } },
                lastUpdate: new Date().toISOString()
            }
        ]
    });
});

app.get('/api/iot/livestock', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'cattle-001',
                animalId: 'C001',
                type: 'cattle',
                location: { lat: -32.9585, lng: 147.3484 },
                health: {
                    temperature: 38.5,
                    heartRate: 72,
                    activity: 85,
                    status: 'healthy'
                },
                lastUpdate: new Date().toISOString()
            },
            {
                id: 'cattle-002',
                animalId: 'C002',
                type: 'cattle',
                location: { lat: -32.9575, lng: 147.3474 },
                health: {
                    temperature: 39.2,
                    heartRate: 88,
                    activity: 45,
                    status: 'attention'
                },
                lastUpdate: new Date().toISOString()
            }
        ]
    });
});

app.get('/api/iot/equipment', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'tractor-001',
                name: 'John Deere 6155R',
                type: 'tractor',
                status: 'running',
                location: { lat: -32.9565, lng: 147.3464 },
                metrics: {
                    engineHours: 1247,
                    fuelLevel: 78,
                    temperature: 92,
                    vibration: 2.3
                },
                nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                lastUpdate: new Date().toISOString()
            }
        ]
    });
});

app.get('/api/iot/alerts', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'battery-low-1',
                type: 'warning',
                title: 'Low Battery Alert',
                message: 'Soil pH sensor battery at 45%',
                timestamp: new Date().toISOString(),
                severity: 'medium'
            },
            {
                id: 'health-alert-1',
                type: 'alert',
                title: 'Animal Health Alert',
                message: 'Cattle C002 requires attention - elevated heart rate',
                timestamp: new Date().toISOString(),
                severity: 'high'
            }
        ]
    });
});

// ============================================
// PREDICTIVE ANALYTICS ENDPOINTS
// ============================================

app.get('/api/analytics/models', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'crop-yield-wheat',
                name: 'Wheat Yield Prediction',
                type: 'crop_yield',
                accuracy: 87.5,
                status: 'active',
                lastTrained: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                predictions: 1
            },
            {
                id: 'market-price-wheat',
                name: 'Wheat Price Forecasting',
                type: 'market_price',
                accuracy: 82.3,
                status: 'active',
                lastTrained: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                predictions: 1
            },
            {
                id: 'health-risk-community',
                name: 'Community Health Risk Assessment',
                type: 'health_risk',
                accuracy: 91.2,
                status: 'active',
                lastTrained: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                predictions: 1
            }
        ]
    });
});

app.get('/api/analytics/predictions', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 'wheat-yield-2024',
                modelId: 'crop-yield-wheat',
                target: 'Wheat Yield - Field A',
                timeframe: 'Harvest 2024',
                confidence: 87,
                value: 4.2,
                unit: 'tonnes/hectare',
                trend: 'up',
                factors: [
                    { name: 'Soil Moisture', impact: 85, description: 'Optimal moisture levels throughout growing season' },
                    { name: 'Temperature', impact: 72, description: 'Favorable temperature patterns' },
                    { name: 'Rainfall', impact: 68, description: 'Above average rainfall in critical periods' }
                ],
                recommendations: [
                    'Continue current irrigation schedule',
                    'Monitor for rust diseases in next 2 weeks',
                    'Consider early harvest if weather conditions deteriorate'
                ],
                createdAt: new Date().toISOString()
            },
            {
                id: 'wheat-price-q4',
                modelId: 'market-price-wheat',
                target: 'Wheat Price - Dubbo Market',
                timeframe: 'Next 3 months',
                confidence: 82,
                value: 420,
                unit: 'AUD/tonne',
                trend: 'up',
                factors: [
                    { name: 'Export Demand', impact: 78, description: 'Strong international demand from Asia' },
                    { name: 'Local Supply', impact: -45, description: 'Above average harvest expected' }
                ],
                recommendations: [
                    'Consider forward selling 60% of expected harvest',
                    'Monitor export market developments'
                ],
                createdAt: new Date().toISOString()
            }
        ]
    });
});

app.get('/api/analytics/insights', (req, res) => {
    res.json({
        success: true,
        data: {
            keyInsights: [
                {
                    type: 'positive',
                    title: 'Positive Crop Outlook',
                    description: 'Wheat yield predictions show 15% increase over last year due to optimal weather conditions.',
                    impact: 'high',
                    confidence: 87
                },
                {
                    type: 'opportunity',
                    title: 'Market Opportunity',
                    description: 'Wheat prices expected to rise 9% in Q4 2024. Consider strategic selling.',
                    impact: 'high',
                    confidence: 82
                },
                {
                    type: 'warning',
                    title: 'Health Risk Alert',
                    description: 'Mental health risk factors increasing for winter season.',
                    impact: 'medium',
                    confidence: 91
                }
            ],
            actionItems: [
                {
                    priority: 'high',
                    action: 'Review wheat selling strategy based on price predictions',
                    deadline: '2 weeks',
                    impact: 'High revenue potential'
                },
                {
                    priority: 'medium',
                    action: 'Implement winter mental health support programs',
                    deadline: '1 month',
                    impact: 'Community wellbeing'
                }
            ]
        }
    });
});

app.get('/api/analytics/performance', (req, res) => {
    res.json({
        success: true,
        data: {
            historical: [
                { date: '2023-01', actual: 3.8, predicted: 3.9 },
                { date: '2023-02', actual: 3.9, predicted: 3.8 },
                { date: '2023-03', actual: 4.1, predicted: 4.0 },
                { date: '2023-04', actual: 4.0, predicted: 4.1 },
                { date: '2023-05', actual: 4.2, predicted: 4.2 },
                { date: '2023-06', actual: 4.3, predicted: 4.1 }
            ],
            forecast: [
                { date: '2024-01', predicted: 4.1, confidence_low: 3.8, confidence_high: 4.4 },
                { date: '2024-02', predicted: 4.2, confidence_low: 3.9, confidence_high: 4.5 },
                { date: '2024-03', predicted: 4.3, confidence_low: 4.0, confidence_high: 4.6 }
            ]
        }
    });
});

// Catch all
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found in mock server`
    });
});

// Start server
httpServer.listen(port, () => {
    console.log('🌏 Rural Connect AI - Mock Backend Server');
    console.log('==========================================');
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`🔗 Health check: http://localhost:${port}/health`);
    console.log(`📊 Metrics: http://localhost:${port}/api/v1/metrics`);
    console.log('');
    console.log('✨ No MongoDB required - using mock data');
    console.log('⚠️  This is for frontend development only');
    console.log('');
    console.log('Press Ctrl+C to stop');
});

// Handle shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down mock server...');
    process.exit(0);
});
