import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Sparkles,
  Zap,
  Star,
  TrendingUp
} from 'lucide-react';
import AdvancedFeaturesNav from '../navigation/AdvancedFeaturesNav';

// Lazy load components for better performance
const MatildaAIAssistant = lazy(() => import('../ai/MatildaAIAssistant'));
const MultilingualVoiceInterface = lazy(() => import('../voice/MultilingualVoiceInterface'));
const IoTFarmMonitoring = lazy(() => import('../iot/IoTFarmMonitoring'));
const PredictiveAnalyticsEngine = lazy(() => import('../analytics/PredictiveAnalyticsEngine'));
const DisasterAlertSystem = lazy(() => import('../emergency/DisasterAlertSystem'));
const WomenFirstMode = lazy(() => import('../community/WomenFirstMode'));
const AdvancedAccessibilityFeatures = lazy(() => import('../accessibility/AdvancedAccessibilityFeatures'));
const OfflineFirstManager = lazy(() => import('../offline/OfflineFirstManager'));

interface AdvancedFeaturesDashboardProps {
  onBack?: () => void;
}

const COMPONENT_MAP = {
  MatildaAIAssistant,
  MultilingualVoiceInterface,
  IoTFarmMonitoring,
  PredictiveAnalyticsEngine,
  DisasterAlertSystem,
  WomenFirstMode,
  AdvancedAccessibilityFeatures,
  OfflineFirstManager
};

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading advanced feature...' }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

const ErrorBoundary: React.FC<{ children: React.ReactNode; featureName: string }> = ({
  children,
  featureName
}) => {
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Unable to Load {featureName}
          </h3>
          <p className="text-gray-600 mb-4">
            This advanced feature is temporarily unavailable. Please try again later.
          </p>
          <button
            onClick={() => setHasError(false)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const AdvancedFeaturesDashboard: React.FC<AdvancedFeaturesDashboardProps> = ({ onBack }) => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const handleFeatureSelect = (featureId: string, component: string) => {
    setActiveFeature(featureId);
    setActiveComponent(component);
  };

  const handleBackToOverview = () => {
    setActiveFeature(null);
    setActiveComponent(null);
  };

  const renderActiveComponent = () => {
    if (!activeComponent || !COMPONENT_MAP[activeComponent as keyof typeof COMPONENT_MAP]) {
      return null;
    }

    const Component = COMPONENT_MAP[activeComponent as keyof typeof COMPONENT_MAP];

    return (
      <ErrorBoundary featureName={activeComponent}>
        <Suspense fallback={<LoadingSpinner message={`Loading ${activeComponent}...`} />}>
          <Component />
        </Suspense>
      </ErrorBoundary>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {(activeFeature || onBack) && (
                <button
                  onClick={activeFeature ? handleBackToOverview : onBack}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>{activeFeature ? 'Back to Features' : 'Back to Dashboard'}</span>
                </button>
              )}
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {activeFeature ? 'Advanced Feature' : 'Advanced Features Hub'}
                  </h1>
                  <p className="text-gray-600">
                    {activeFeature
                      ? 'Experience next-generation rural technology'
                      : 'Discover cutting-edge AI and IoT solutions for rural communities'
                    }
                  </p>
                </div>
              </div>
            </div>

            {!activeFeature && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">8 New Features</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">AI Powered</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {!activeFeature ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Hero Section */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-green-700 mb-4">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Next-Generation Technology</span>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Advanced Features for Rural Australia
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Experience the future of rural technology with AI-powered insights,
                    IoT monitoring, predictive analytics, and inclusive accessibility features
                    designed specifically for rural communities.
                  </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                >
                  {[
                    { label: 'AI Models', value: '12+', color: 'green' },
                    { label: 'Languages', value: '8', color: 'blue' },
                    { label: 'IoT Sensors', value: '50+', color: 'emerald' },
                    { label: 'Accuracy', value: '94%', color: 'teal' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <p className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</p>
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Features Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <AdvancedFeaturesNav
                  onFeatureSelect={handleFeatureSelect}
                  activeFeature={activeFeature}
                />
              </motion.div>

              {/* Benefits Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Advanced Features Matter for Rural Communities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: 'AI-Powered Intelligence',
                      description: 'Get personalized insights and recommendations from Matilda, your AI rural companion who understands local challenges.',
                      benefits: ['Contextual advice', 'Predictive insights', 'Natural conversation']
                    },
                    {
                      title: 'Real-Time Monitoring',
                      description: 'Monitor your farm, livestock, and equipment with IoT sensors and get instant alerts for optimal decision-making.',
                      benefits: ['Sensor integration', 'Live tracking', 'Automated alerts']
                    },
                    {
                      title: 'Inclusive Accessibility',
                      description: 'Voice commands in 8 languages, offline functionality, and comprehensive accessibility ensure everyone can participate.',
                      benefits: ['Multilingual support', 'Offline capability', 'Universal design']
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="text-center">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h4>
                      <p className="text-gray-600 mb-4">{benefit.description}</p>
                      <ul className="space-y-2">
                        {benefit.benefits.map((item, i) => (
                          <li key={i} className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="feature"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="min-h-[600px]"
            >
              {renderActiveComponent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Matilda AI Assistant - Always Available */}
      {!activeFeature && (
        <Suspense fallback={null}>
          <MatildaAIAssistant />
        </Suspense>
      )}
    </div>
  );
};

export default AdvancedFeaturesDashboard;