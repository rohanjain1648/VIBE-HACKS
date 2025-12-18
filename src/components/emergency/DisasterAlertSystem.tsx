import React, { useState, useEffect } from 'react';
import { AlertTriangle, Cloud, Droplets, Wind, Thermometer, Eye, MapPin, Clock, Phone, ExternalLink } from 'lucide-react';

interface WeatherAlert {
  id: string;
  type: 'flood' | 'drought' | 'cyclone' | 'heatwave' | 'frost' | 'hail' | 'fire';
  severity: 'low' | 'moderate' | 'high' | 'extreme';
  title: string;
  description: string;
  location: string;
  coordinates: [number, number];
  issuedAt: string;
  expiresAt: string;
  source: string;
  actionRequired: string[];
  cropImpact?: {
    affectedCrops: string[];
    recommendations: string[];
  };
}

interface CropAdvisory {
  id: string;
  crop: string;
  stage: string;
  advisory: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  weatherCondition: string;
  actionBy: string;
  resources?: string[];
}

const MOCK_ALERTS: WeatherAlert[] = [
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
    description: 'Below average rainfall for 3 consecutive months. Soil moisture levels declining.',
    location: 'Central West NSW',
    coordinates: [-32.9595, 147.3494],
    issuedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'NSW Department of Primary Industries',
    actionRequired: [
      'Implement water conservation measures',
      'Consider drought-resistant crop varieties',
      'Review livestock feed supplies',
      'Apply for drought assistance if eligible'
    ],
    cropImpact: {
      affectedCrops: ['cotton', 'sorghum', 'sunflower'],
      recommendations: [
        'Reduce planting density',
        'Apply mulch to retain soil moisture',
        'Consider early harvest if stress evident'
      ]
    }
  },
  {
    id: 'alert-3',
    type: 'heatwave',
    severity: 'extreme',
    title: 'Extreme Heat Warning',
    description: 'Temperatures above 40°C expected for 3 consecutive days.',
    location: 'Western NSW',
    coordinates: [-31.9505, 141.4333],
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    source: 'Bureau of Meteorology',
    actionRequired: [
      'Provide extra water for livestock',
      'Avoid working during peak heat hours',
      'Check on elderly neighbors',
      'Ensure air conditioning is working'
    ]
  }
];

const MOCK_ADVISORIES: CropAdvisory[] = [
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
    advisory: 'Increase irrigation frequency due to drought conditions. Monitor soil moisture daily.',
    priority: 'urgent',
    weatherCondition: 'Extended dry period',
    actionBy: 'Immediately',
    resources: ['Irrigation scheduling guide', 'Soil moisture monitoring']
  },
  {
    id: 'advisory-3',
    crop: 'Barley',
    stage: 'Grain Filling',
    advisory: 'Prepare for early harvest due to heat stress. Monitor grain moisture content.',
    priority: 'medium',
    weatherCondition: 'Extreme heat forecast',
    actionBy: 'Within 1 week',
    resources: ['Harvest timing guide', 'Grain storage preparation']
  }
];

export const DisasterAlertSystem: React.FC = () => {
  const [alerts, setAlerts] = useState<WeatherAlert[]>(MOCK_ALERTS);
  const [advisories, setAdvisories] = useState<CropAdvisory[]>(MOCK_ADVISORIES);
  const [selectedAlert, setSelectedAlert] = useState<WeatherAlert | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [location, setLocation] = useState('Dubbo, NSW');

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        setNotificationsEnabled(permission === 'granted');
      });
    }
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'extreme': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'flood': return <Droplets className="text-blue-600" size={24} />;
      case 'drought': return <Thermometer className="text-orange-600" size={24} />;
      case 'cyclone': return <Wind className="text-purple-600" size={24} />;
      case 'heatwave': return <Thermometer className="text-red-600" size={24} />;
      case 'frost': return <Cloud className="text-blue-400" size={24} />;
      case 'hail': return <Cloud className="text-gray-600" size={24} />;
      case 'fire': return <AlertTriangle className="text-red-600" size={24} />;
      default: return <AlertTriangle className="text-yellow-600" size={24} />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const sendTestNotification = () => {
    if (notificationsEnabled) {
      new Notification('🚨 Weather Alert', {
        body: 'Flash flood warning issued for your area. Take immediate action.',
        icon: '/favicon.ico',
        tag: 'weather-alert'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">🚨 Disaster & Weather Alert System</h1>
            <p className="text-red-100">Real-time alerts and crop-specific advisories for rural Australia</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin size={16} />
              <span className="text-sm">{location}</span>
            </div>
            <button
              onClick={sendTestNotification}
              className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
            >
              Test Alert
            </button>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="text-red-500 mr-2" size={24} />
            Active Weather Alerts
          </h2>
          
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border-l-4 p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  alert.severity === 'extreme' ? 'border-red-500 bg-red-50' :
                  alert.severity === 'high' ? 'border-orange-500 bg-orange-50' :
                  alert.severity === 'moderate' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{alert.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <MapPin size={12} className="mr-1" />
                          {alert.location}
                        </span>
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {formatTimeAgo(alert.issuedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crop-Specific Advisories */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Eye className="text-green-500 mr-2" size={24} />
            Crop Advisories
          </h2>
          
          <div className="space-y-4">
            {advisories.map((advisory) => (
              <div key={advisory.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{advisory.crop}</h3>
                    <p className="text-sm text-gray-600">{advisory.stage} stage</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(advisory.priority)}`}>
                    {advisory.priority.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-gray-700 text-sm mb-3">{advisory.advisory}</p>
                
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Cloud size={12} className="mr-2" />
                    <span>{advisory.weatherCondition}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={12} className="mr-2" />
                    <span>Action required by: {advisory.actionBy}</span>
                  </div>
                </div>

                {advisory.resources && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-700 mb-1">Resources:</p>
                    <div className="flex flex-wrap gap-1">
                      {advisory.resources.map((resource, index) => (
                        <span key={index} className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 cursor-pointer">
                          <ExternalLink size={10} className="mr-1" />
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Phone className="text-blue-500 mr-2" size={24} />
          Emergency Contacts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 mb-2">Emergency Services</h3>
            <p className="text-2xl font-bold text-red-600 mb-1">000</p>
            <p className="text-sm text-red-700">Police, Fire, Ambulance</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">SES (Flood/Storm)</h3>
            <p className="text-2xl font-bold text-blue-600 mb-1">132 500</p>
            <p className="text-sm text-blue-700">State Emergency Service</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Rural Fire Service</h3>
            <p className="text-2xl font-bold text-green-600 mb-1">1800 679 737</p>
            <p className="text-sm text-green-700">Bushfire information</p>
          </div>
        </div>
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getAlertIcon(selectedAlert.type)}
                  <div>
                    <h2 className="text-xl font-semibold">{selectedAlert.title}</h2>
                    <p className="text-gray-600">{selectedAlert.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className={`p-4 rounded-lg mb-4 ${getSeverityColor(selectedAlert.severity)}`}>
                <p className="font-medium">Severity: {selectedAlert.severity.toUpperCase()}</p>
                <p className="text-sm mt-1">{selectedAlert.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Immediate Actions Required:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {selectedAlert.actionRequired.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>

                {selectedAlert.cropImpact && (
                  <div>
                    <h3 className="font-semibold mb-2">Crop Impact & Recommendations:</h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800 mb-2">
                        <strong>Affected crops:</strong> {selectedAlert.cropImpact.affectedCrops.join(', ')}
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                        {selectedAlert.cropImpact.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 pt-4 border-t">
                  <p>Issued: {new Date(selectedAlert.issuedAt).toLocaleString()}</p>
                  <p>Expires: {new Date(selectedAlert.expiresAt).toLocaleString()}</p>
                  <p>Source: {selectedAlert.source}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisasterAlertSystem;