import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Activity,
  TrendingUp,
  Mic,
  AlertTriangle,
  Users,
  Accessibility,
  WifiOff,
  Zap,
  Brain,
  Satellite,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Star,
  Sparkles
} from 'lucide-react';

interface AdvancedFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  component: string;
  category: 'ai' | 'iot' | 'analytics' | 'accessibility' | 'community';
  isNew?: boolean;
  isPremium?: boolean;
  status: 'active' | 'beta' | 'coming_soon';
}

const ADVANCED_FEATURES: AdvancedFeature[] = [
  {
    id: 'matilda-ai',
    name: 'Matilda AI Assistant',
    description: 'Your intelligent rural companion with personality and context awareness',
    icon: <Bot className="w-5 h-5" />,
    component: 'MatildaAIAssistant',
    category: 'ai',
    isNew: true,
    status: 'active'
  },
  {
    id: 'voice-interface',
    name: 'Multilingual Voice Interface',
    description: 'Voice commands in 8 languages including Hindi, Bengali, Tamil',
    icon: <Mic className="w-5 h-5" />,
    component: 'MultilingualVoiceInterface',
    category: 'accessibility',
    status: 'active'
  },
  {
    id: 'iot-monitoring',
    name: 'IoT Farm Monitoring',
    description: 'Real-time sensor data, livestock tracking, and equipment monitoring',
    icon: <Satellite className="w-5 h-5" />,
    component: 'IoTFarmMonitoring',
    category: 'iot',
    isNew: true,
    isPremium: true,
    status: 'active'
  },
  {
    id: 'predictive-analytics',
    name: 'Predictive Analytics Engine',
    description: 'AI-powered forecasting for crops, markets, and community trends',
    icon: <Brain className="w-5 h-5" />,
    component: 'PredictiveAnalyticsEngine',
    category: 'analytics',
    isNew: true,
    isPremium: true,
    status: 'active'
  },
  {
    id: 'disaster-alerts',
    name: 'Disaster & Weather Alerts',
    description: 'Real-time emergency alerts with crop-specific advisories',
    icon: <AlertTriangle className="w-5 h-5" />,
    component: 'DisasterAlertSystem',
    category: 'community',
    status: 'active'
  },
  {
    id: 'women-first',
    name: 'Women-First Mode',
    description: 'Safe spaces, privacy features, and women-focused resources',
    icon: <Users className="w-5 h-5" />,
    component: 'WomenFirstMode',
    category: 'community',
    status: 'active'
  },
  {
    id: 'accessibility',
    name: 'Advanced Accessibility',
    description: 'WCAG AAA compliance with comprehensive accessibility features',
    icon: <Accessibility className="w-5 h-5" />,
    component: 'AdvancedAccessibilityFeatures',
    category: 'accessibility',
    status: 'active'
  },
  {
    id: 'offline-manager',
    name: 'Offline-First Manager',
    description: 'Smart caching and sync for poor connectivity areas',
    icon: <WifiOff className="w-5 h-5" />,
    component: 'OfflineFirstManager',
    category: 'accessibility',
    status: 'active'
  }
];

const CATEGORIES = {
  ai: { name: 'AI & Intelligence', icon: <Brain className="w-4 h-4" />, color: 'purple' },
  iot: { name: 'IoT & Monitoring', icon: <Activity className="w-4 h-4" />, color: 'blue' },
  analytics: { name: 'Analytics & Insights', icon: <BarChart3 className="w-4 h-4" />, color: 'green' },
  accessibility: { name: 'Accessibility & Inclusion', icon: <Accessibility className="w-4 h-4" />, color: 'orange' },
  community: { name: 'Community & Safety', icon: <Users className="w-4 h-4" />, color: 'pink' }
};

interface AdvancedFeaturesNavProps {
  onFeatureSelect: (featureId: string, component: string) => void;
  activeFeature?: string;
}

export const AdvancedFeaturesNav: React.FC<AdvancedFeaturesNavProps> = ({
  onFeatureSelect,
  activeFeature
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['ai', 'iot']);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getCategoryColor = (color: string) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      pink: 'bg-pink-100 text-pink-700 border-pink-200'
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'beta':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">Beta</span>;
      case 'coming_soon':
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">Soon</span>;
      default:
        return null;
    }
  };

  const groupedFeatures = Object.entries(CATEGORIES).reduce((acc, [categoryId, category]) => {
    acc[categoryId] = ADVANCED_FEATURES.filter(feature => feature.category === categoryId);
    return acc;
  }, {} as Record<string, AdvancedFeature[]>);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Advanced Features</h2>
            <p className="text-sm text-gray-600">Next-generation rural technology</p>
          </div>
        </div>
        <button
          onClick={() => setShowAllFeatures(!showAllFeatures)}
          className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          {showAllFeatures ? 'Show Less' : 'Show All'}
        </button>
      </div>

      {/* Quick Access - New Features */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>New & Featured</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ADVANCED_FEATURES.filter(f => f.isNew).slice(0, 4).map(feature => (
            <motion.button
              key={feature.id}
              onClick={() => onFeatureSelect(feature.id, feature.component)}
              className={`p-3 rounded-lg border-2 transition-all text-left ${
                activeFeature === feature.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getCategoryColor(CATEGORIES[feature.category].color)}`}>
                  {feature.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 truncate">{feature.name}</h4>
                    {feature.isNew && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">New</span>
                    )}
                    {feature.isPremium && (
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">Pro</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{feature.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Categories */}
      {showAllFeatures && (
        <div className="space-y-4">
          {Object.entries(groupedFeatures).map(([categoryId, features]) => {
            const category = CATEGORIES[categoryId as keyof typeof CATEGORIES];
            const isExpanded = expandedCategories.includes(categoryId);

            return (
              <div key={categoryId} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleCategory(categoryId)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getCategoryColor(category.color)}`}>
                      {category.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">{features.length} features</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200"
                    >
                      <div className="p-4 space-y-2">
                        {features.map(feature => (
                          <button
                            key={feature.id}
                            onClick={() => onFeatureSelect(feature.id, feature.component)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                              activeFeature === feature.id
                                ? 'bg-indigo-50 border border-indigo-200'
                                : 'hover:bg-gray-50 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="text-gray-400">
                                {feature.icon}
                              </div>
                              <div className="text-left">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium text-gray-900">{feature.name}</h4>
                                  {feature.isNew && (
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">New</span>
                                  )}
                                  {feature.isPremium && (
                                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">Pro</span>
                                  )}
                                  {getStatusBadge(feature.status)}
                                </div>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                              </div>
                            </div>
                            {activeFeature === feature.id && (
                              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-indigo-600">
              {ADVANCED_FEATURES.filter(f => f.status === 'active').length}
            </p>
            <p className="text-xs text-gray-600">Active Features</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {ADVANCED_FEATURES.filter(f => f.isNew).length}
            </p>
            <p className="text-xs text-gray-600">New This Month</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {ADVANCED_FEATURES.filter(f => f.isPremium).length}
            </p>
            <p className="text-xs text-gray-600">Premium Features</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
        <div className="flex items-center space-x-3">
          <Zap className="w-5 h-5 text-indigo-600" />
          <div>
            <h4 className="font-medium text-indigo-900">Unlock Full Potential</h4>
            <p className="text-sm text-indigo-700">
              Experience the future of rural technology with our advanced AI-powered features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFeaturesNav;