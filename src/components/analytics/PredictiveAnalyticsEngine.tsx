import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Calendar,
  DollarSign,
  Droplets,
  Thermometer,
  Users,
  Target,
  Brain,
  Zap,
  Eye,
  RefreshCw
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface PredictionModel {
  id: string;
  name: string;
  type: 'crop_yield' | 'market_price' | 'weather' | 'health_risk' | 'equipment_failure' | 'community_growth';
  accuracy: number;
  lastTrained: Date;
  status: 'active' | 'training' | 'needs_update';
  predictions: Prediction[];
}

interface Prediction {
  id: string;
  modelId: string;
  target: string;
  timeframe: string;
  confidence: number;
  value: number | string;
  unit?: string;
  trend: 'up' | 'down' | 'stable';
  factors: {
    name: string;
    impact: number;
    description: string;
  }[];
  recommendations: string[];
  createdAt: Date;
}

interface AnalyticsData {
  historical: {
    date: string;
    actual: number;
    predicted: number;
  }[];
  forecast: {
    date: string;
    predicted: number;
    confidence_low: number;
    confidence_high: number;
  }[];
}

const MOCK_MODELS: PredictionModel[] = [
  {
    id: 'crop-yield-wheat',
    name: 'Wheat Yield Prediction',
    type: 'crop_yield',
    accuracy: 87.5,
    lastTrained: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'active',
    predictions: [
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
          { name: 'Rainfall', impact: 68, description: 'Above average rainfall in critical periods' },
          { name: 'Pest Pressure', impact: -15, description: 'Low pest activity detected' }
        ],
        recommendations: [
          'Continue current irrigation schedule',
          'Monitor for rust diseases in next 2 weeks',
          'Consider early harvest if weather conditions deteriorate'
        ],
        createdAt: new Date()
      }
    ]
  },
  {
    id: 'market-price-wheat',
    name: 'Wheat Price Forecasting',
    type: 'market_price',
    accuracy: 82.3,
    lastTrained: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: 'active',
    predictions: [
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
          { name: 'Local Supply', impact: -45, description: 'Above average harvest expected' },
          { name: 'Currency Exchange', impact: 32, description: 'Favorable AUD/USD rates' },
          { name: 'Weather Events', impact: 25, description: 'Drought conditions in competing regions' }
        ],
        recommendations: [
          'Consider forward selling 60% of expected harvest',
          'Monitor export market developments',
          'Delay selling if possible until Q1 2025'
        ],
        createdAt: new Date()
      }
    ]
  },
  {
    id: 'health-risk-community',
    name: 'Community Health Risk Assessment',
    type: 'health_risk',
    accuracy: 91.2,
    lastTrained: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'active',
    predictions: [
      {
        id: 'mental-health-winter',
        modelId: 'health-risk-community',
        target: 'Mental Health Risk - Rural NSW',
        timeframe: 'Winter 2024',
        confidence: 91,
        value: 'Moderate Risk',
        trend: 'up',
        factors: [
          { name: 'Seasonal Patterns', impact: 65, description: 'Historical increase in winter months' },
          { name: 'Economic Stress', impact: 58, description: 'Farm income pressures' },
          { name: 'Social Isolation', impact: 72, description: 'Reduced community activities in winter' },
          { name: 'Weather Conditions', impact: 45, description: 'Extended periods of poor weather' }
        ],
        recommendations: [
          'Increase mental health outreach programs',
          'Organize more indoor community events',
          'Promote telehealth services',
          'Early intervention for at-risk individuals'
        ],
        createdAt: new Date()
      }
    ]
  }
];

const MOCK_ANALYTICS_DATA: AnalyticsData = {
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
    { date: '2024-03', predicted: 4.3, confidence_low: 4.0, confidence_high: 4.6 },
    { date: '2024-04', predicted: 4.2, confidence_low: 3.9, confidence_high: 4.5 },
    { date: '2024-05', predicted: 4.4, confidence_low: 4.1, confidence_high: 4.7 },
    { date: '2024-06', predicted: 4.5, confidence_low: 4.2, confidence_high: 4.8 }
  ]
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00', '#ff00ff'];

export const PredictiveAnalyticsEngine: React.FC = () => {
  const [models, setModels] = useState<PredictionModel[]>(MOCK_MODELS);
  const [selectedModel, setSelectedModel] = useState<PredictionModel>(MOCK_MODELS[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'predictions' | 'models' | 'insights'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [analyticsData] = useState<AnalyticsData>(MOCK_ANALYTICS_DATA);

  useEffect(() => {
    // Simulate real-time model updates
    const interval = setInterval(() => {
      setModels(prev => prev.map(model => ({
        ...model,
        accuracy: Math.max(75, Math.min(95, model.accuracy + (Math.random() - 0.5) * 2)),
        predictions: model.predictions.map(pred => ({
          ...pred,
          confidence: Math.max(70, Math.min(95, pred.confidence + (Math.random() - 0.5) * 3))
        }))
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const getModelIcon = (type: PredictionModel['type']) => {
    switch (type) {
      case 'crop_yield': return <Activity className="w-5 h-5" />;
      case 'market_price': return <DollarSign className="w-5 h-5" />;
      case 'weather': return <Thermometer className="w-5 h-5" />;
      case 'health_risk': return <Users className="w-5 h-5" />;
      case 'equipment_failure': return <AlertTriangle className="w-5 h-5" />;
      case 'community_growth': return <TrendingUp className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'training': return 'text-blue-600 bg-blue-100';
      case 'needs_update': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-blue-600';
    if (accuracy >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAllPredictions = () => {
    return models.flatMap(model => model.predictions);
  };

  const getHighConfidencePredictions = () => {
    return getAllPredictions().filter(pred => pred.confidence >= 85);
  };

  const getModelPerformanceData = () => {
    return models.map(model => ({
      name: model.name.split(' ')[0],
      accuracy: model.accuracy,
      predictions: model.predictions.length
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Predictive Analytics Engine</h1>
            <p className="text-gray-600">AI-powered insights and forecasting for your rural operations</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Models</span>
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Brain className="w-4 h-4 text-indigo-500" />
              <span>AI Powered</span>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Models</p>
                <p className="text-2xl font-bold text-gray-900">
                  {models.filter(m => m.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Brain className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(models.reduce((acc, m) => acc + m.accuracy, 0) / models.length).toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Confidence</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getHighConfidencePredictions().length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Predictions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getAllPredictions().length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'predictions', label: 'Predictions', icon: TrendingUp },
            { id: 'models', label: 'Models', icon: Brain },
            { id: 'insights', label: 'Insights', icon: Zap }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Model Performance Chart */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Model Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getModelPerformanceData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="accuracy" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Historical vs Predicted */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Historical vs Predicted Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData.historical}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="actual" stroke="#82ca9d" strokeWidth={2} name="Actual" />
                      <Line type="monotone" dataKey="predicted" stroke="#8884d8" strokeWidth={2} name="Predicted" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Forecast with Confidence Intervals */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Future Predictions with Confidence Intervals</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData.forecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="confidence_high" 
                        stackId="1" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.2}
                        name="High Confidence"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="confidence_low" 
                        stackId="1" 
                        stroke="#8884d8" 
                        fill="#ffffff" 
                        name="Low Confidence"
                      />
                      <Line type="monotone" dataKey="predicted" stroke="#8884d8" strokeWidth={2} name="Predicted" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'predictions' && (
            <motion.div
              key="predictions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {getAllPredictions().map(prediction => (
                <div key={prediction.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        {getModelIcon(models.find(m => m.id === prediction.modelId)?.type || 'crop_yield')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{prediction.target}</h3>
                        <p className="text-sm text-gray-600">{prediction.timeframe}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {typeof prediction.value === 'number' ? prediction.value.toFixed(1) : prediction.value}
                          {prediction.unit && <span className="text-lg text-gray-600 ml-1">{prediction.unit}</span>}
                        </p>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(prediction.trend)}
                          <span className="text-sm text-gray-600">{prediction.confidence}% confidence</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Factors */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Key Factors</h4>
                    <div className="space-y-2">
                      {prediction.factors.map((factor, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">{factor.name}</span>
                              <span className={`text-sm font-medium ${
                                factor.impact > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {factor.impact > 0 ? '+' : ''}{factor.impact}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  factor.impact > 0 ? 'bg-green-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.abs(factor.impact)}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{factor.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {prediction.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'models' && (
            <motion.div
              key="models"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {models.map(model => (
                <div key={model.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        {getModelIcon(model.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{model.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{model.type.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(model.status)}`}>
                      {model.status.replace('_', ' ')}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Accuracy</p>
                      <p className={`text-2xl font-bold ${getAccuracyColor(model.accuracy)}`}>
                        {model.accuracy.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Predictions</p>
                      <p className="text-2xl font-bold text-gray-900">{model.predictions.length}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                      <p>Last Trained:</p>
                      <p className="font-medium">{model.lastTrained.toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={() => setSelectedModel(model)}
                      className="text-indigo-500 hover:text-indigo-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Key Insights */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Positive Crop Outlook</h4>
                      <p className="text-sm text-green-700">
                        Wheat yield predictions show 15% increase over last year due to optimal weather conditions and improved soil management.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <DollarSign className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Market Opportunity</h4>
                      <p className="text-sm text-blue-700">
                        Wheat prices expected to rise 9% in Q4 2024. Consider strategic selling to maximize revenue.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">Health Risk Alert</h4>
                      <p className="text-sm text-yellow-700">
                        Mental health risk factors increasing for winter season. Proactive community support recommended.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Model Comparison Radar */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Model Performance Comparison</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={models.map(model => ({
                      name: model.name.split(' ')[0],
                      accuracy: model.accuracy,
                      predictions: model.predictions.length * 10,
                      confidence: model.predictions.reduce((acc, p) => acc + p.confidence, 0) / model.predictions.length || 0
                    }))}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Accuracy" dataKey="accuracy" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      <Radar name="Confidence" dataKey="confidence" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Action Items */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                  {[
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
                    },
                    {
                      priority: 'low',
                      action: 'Update crop yield model with latest sensor data',
                      deadline: '3 weeks',
                      impact: 'Improved accuracy'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          item.priority === 'high' ? 'bg-red-500' :
                          item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-900">{item.action}</p>
                          <p className="text-sm text-gray-600">Impact: {item.impact}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{item.deadline}</p>
                        <p className="text-xs text-gray-600 capitalize">{item.priority} priority</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PredictiveAnalyticsEngine;