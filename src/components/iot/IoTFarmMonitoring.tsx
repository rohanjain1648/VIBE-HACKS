import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Thermometer,
  Droplets,
  Zap,
  Wifi,
  WifiOff,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  MapPin,
  Settings,
  RefreshCw,
  Battery,
  Signal,
  Gauge
} from 'lucide-react';

interface SensorData {
  id: string;
  name: string;
  type: 'temperature' | 'moisture' | 'ph' | 'light' | 'humidity' | 'pressure';
  value: number;
  unit: string;
  status: 'online' | 'offline' | 'warning' | 'error';
  lastUpdate: Date;
  location: {
    field: string;
    coordinates: { lat: number; lng: number };
  };
  batteryLevel: number;
  signalStrength: number;
  trend: 'up' | 'down' | 'stable';
  thresholds: {
    min: number;
    max: number;
    optimal: { min: number; max: number };
  };
}

// Removed unused IoTDevice interface

interface LivestockData {
  id: string;
  animalId: string;
  type: 'cattle' | 'sheep' | 'goat';
  location: { lat: number; lng: number };
  health: {
    temperature: number;
    heartRate: number;
    activity: number;
    status: 'healthy' | 'attention' | 'sick';
  };
  lastUpdate: Date;
}

interface EquipmentData {
  id: string;
  name: string;
  type: 'tractor' | 'harvester' | 'irrigation_pump' | 'generator';
  status: 'running' | 'idle' | 'maintenance' | 'error';
  location: { lat: number; lng: number };
  metrics: {
    engineHours: number;
    fuelLevel: number;
    temperature: number;
    vibration: number;
  };
  nextMaintenance: Date;
  lastUpdate: Date;
}

const MOCK_SENSORS: SensorData[] = [
  {
    id: 'soil-temp-1',
    name: 'Soil Temperature - Field A',
    type: 'temperature',
    value: 22.5,
    unit: '°C',
    status: 'online',
    lastUpdate: new Date(),
    location: { field: 'Field A - Wheat', coordinates: { lat: -32.9595, lng: 147.3494 } },
    batteryLevel: 85,
    signalStrength: 92,
    trend: 'stable',
    thresholds: { min: 15, max: 35, optimal: { min: 18, max: 25 } }
  },
  {
    id: 'soil-moisture-1',
    name: 'Soil Moisture - Field A',
    type: 'moisture',
    value: 68,
    unit: '%',
    status: 'online',
    lastUpdate: new Date(Date.now() - 300000),
    location: { field: 'Field A - Wheat', coordinates: { lat: -32.9595, lng: 147.3494 } },
    batteryLevel: 78,
    signalStrength: 88,
    trend: 'down',
    thresholds: { min: 30, max: 90, optimal: { min: 60, max: 80 } }
  },
  {
    id: 'ph-sensor-1',
    name: 'Soil pH - Field B',
    type: 'ph',
    value: 6.8,
    unit: 'pH',
    status: 'warning',
    lastUpdate: new Date(Date.now() - 600000),
    location: { field: 'Field B - Barley', coordinates: { lat: -32.9605, lng: 147.3504 } },
    batteryLevel: 45,
    signalStrength: 76,
    trend: 'up',
    thresholds: { min: 5.5, max: 8.0, optimal: { min: 6.0, max: 7.5 } }
  }
];

const MOCK_LIVESTOCK: LivestockData[] = [
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
    lastUpdate: new Date()
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
    lastUpdate: new Date(Date.now() - 180000)
  }
];

const MOCK_EQUIPMENT: EquipmentData[] = [
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
    nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    lastUpdate: new Date()
  }
];

export const IoTFarmMonitoring: React.FC = () => {
  const [sensors, setSensors] = useState<SensorData[]>(MOCK_SENSORS);
  const [livestock] = useState<LivestockData[]>(MOCK_LIVESTOCK);
  const [equipment] = useState<EquipmentData[]>(MOCK_EQUIPMENT);
  const [activeTab, setActiveTab] = useState<'sensors' | 'livestock' | 'equipment' | 'alerts'>('sensors');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<SensorData | null>(null);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        value: sensor.value + (Math.random() - 0.5) * 2,
        lastUpdate: new Date(),
        batteryLevel: Math.max(0, sensor.batteryLevel - Math.random() * 0.1),
        signalStrength: Math.max(70, Math.min(100, sensor.signalStrength + (Math.random() - 0.5) * 10))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getSensorIcon = (type: SensorData['type']) => {
    switch (type) {
      case 'temperature': return <Thermometer className="w-5 h-5" />;
      case 'moisture': return <Droplets className="w-5 h-5" />;
      case 'ph': return <Activity className="w-5 h-5" />;
      case 'light': return <Zap className="w-5 h-5" />;
      case 'humidity': return <Droplets className="w-5 h-5" />;
      case 'pressure': return <Gauge className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'attention': return 'text-yellow-600 bg-yellow-100';
      case 'sick': return 'text-red-600 bg-red-100';
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'idle': return 'text-gray-600 bg-gray-100';
      case 'maintenance': return 'text-orange-600 bg-orange-100';
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

  const isValueInOptimalRange = (sensor: SensorData) => {
    return sensor.value >= sensor.thresholds.optimal.min && sensor.value <= sensor.thresholds.optimal.max;
  };

  const getAlerts = () => {
    const alerts: Array<{
      id: string;
      type: 'warning' | 'critical' | 'info';
      message: string;
      timestamp: Date;
      source: string;
    }> = [];

    sensors.forEach(sensor => {
      if (sensor.batteryLevel < 20) {
        alerts.push({
          id: `battery-${sensor.id}`,
          type: 'warning',
          message: `${sensor.name} battery at ${sensor.batteryLevel.toFixed(0)}%`,
          timestamp: new Date(),
          source: sensor.name
        });
      }

      if (!isValueInOptimalRange(sensor)) {
        alerts.push({
          id: `range-${sensor.id}`,
          type: 'warning',
          message: `${sensor.name}: ${sensor.value.toFixed(1)}${sensor.unit} (optimal: ${sensor.thresholds.optimal.min}-${sensor.thresholds.optimal.max}${sensor.unit})`,
          timestamp: new Date(),
          source: sensor.name
        });
      }
    });

    livestock.forEach(animal => {
      if (animal.health.status === 'attention' || animal.health.status === 'sick') {
        alerts.push({
          id: `health-${animal.id}`,
          type: animal.health.status === 'sick' ? 'critical' : 'warning',
          message: `${animal.type.toUpperCase()} ${animal.animalId} requires ${animal.health.status === 'sick' ? 'immediate' : ''} attention`,
          timestamp: animal.lastUpdate,
          source: `Livestock Monitor`
        });
      }
    });

    return alerts;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">IoT Farm Monitoring</h1>
            <p className="text-gray-600">Real-time monitoring of your farm's sensors, livestock, and equipment</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Data</span>
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
                <p className="text-sm text-gray-600">Active Sensors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sensors.filter(s => s.status === 'online').length}/{sensors.length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
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
                <p className="text-sm text-gray-600">Livestock Monitored</p>
                <p className="text-2xl font-bold text-gray-900">{livestock.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm text-gray-600">Equipment Online</p>
                <p className="text-2xl font-bold text-gray-900">
                  {equipment.filter(e => e.status === 'running' || e.status === 'idle').length}/{equipment.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Settings className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{getAlerts().length}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'sensors', label: 'Sensors', icon: Activity },
            { id: 'livestock', label: 'Livestock', icon: MapPin },
            { id: 'equipment', label: 'Equipment', icon: Settings },
            { id: 'alerts', label: 'Alerts', icon: AlertTriangle }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
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
          {activeTab === 'sensors' && (
            <motion.div
              key="sensors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {sensors.map(sensor => (
                <div
                  key={sensor.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedSensor(sensor)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getStatusColor(sensor.status)}`}>
                        {getSensorIcon(sensor.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{sensor.name}</h3>
                        <p className="text-sm text-gray-600">{sensor.location.field}</p>
                      </div>
                    </div>
                    {getTrendIcon(sensor.trend)}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-gray-900">
                        {sensor.value.toFixed(1)}
                      </span>
                      <span className="text-lg text-gray-600">{sensor.unit}</span>
                    </div>
                    <div className={`text-sm mt-1 ${isValueInOptimalRange(sensor) ? 'text-green-600' : 'text-red-600'
                      }`}>
                      Optimal: {sensor.thresholds.optimal.min}-{sensor.thresholds.optimal.max}{sensor.unit}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Battery className="w-4 h-4" />
                      <span>{sensor.batteryLevel.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Signal className="w-4 h-4" />
                      <span>{sensor.signalStrength}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {sensor.status === 'online' ? (
                        <Wifi className="w-4 h-4 text-green-500" />
                      ) : (
                        <WifiOff className="w-4 h-4 text-red-500" />
                      )}
                      <span className="capitalize">{sensor.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'livestock' && (
            <motion.div
              key="livestock"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {livestock.map(animal => (
                <div key={animal.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 capitalize">
                        {animal.type} {animal.animalId}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Last seen: {animal.lastUpdate.toLocaleTimeString()}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(animal.health.status)}`}>
                      {animal.health.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Thermometer className="w-5 h-5 text-red-500" />
                      </div>
                      <p className="text-lg font-semibold">{animal.health.temperature}°C</p>
                      <p className="text-xs text-gray-600">Temperature</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Activity className="w-5 h-5 text-blue-500" />
                      </div>
                      <p className="text-lg font-semibold">{animal.health.heartRate}</p>
                      <p className="text-xs text-gray-600">Heart Rate</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      </div>
                      <p className="text-lg font-semibold">{animal.health.activity}%</p>
                      <p className="text-xs text-gray-600">Activity</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {animal.location.lat.toFixed(4)}, {animal.location.lng.toFixed(4)}
                      </span>
                    </div>
                    <button className="text-blue-500 hover:text-blue-700 transition-colors">
                      View on Map
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'equipment' && (
            <motion.div
              key="equipment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {equipment.map(item => (
                <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{item.type.replace('_', ' ')}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Engine Hours</p>
                      <p className="text-lg font-semibold">{item.metrics.engineHours}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Fuel Level</p>
                      <p className="text-lg font-semibold">{item.metrics.fuelLevel}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Temperature</p>
                      <p className="text-lg font-semibold">{item.metrics.temperature}°C</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Vibration</p>
                      <p className="text-lg font-semibold">{item.metrics.vibration}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                      <p>Next Maintenance:</p>
                      <p className="font-medium">{item.nextMaintenance.toLocaleDateString()}</p>
                    </div>
                    <button className="text-blue-500 hover:text-blue-700 transition-colors">
                      Schedule Service
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'alerts' && (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {getAlerts().map(alert => (
                <div
                  key={alert.id}
                  className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${alert.type === 'critical' ? 'border-red-500' :
                    alert.type === 'warning' ? 'border-yellow-500' : 'border-blue-500'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${alert.type === 'critical' ? 'bg-red-100 text-red-600' :
                        alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{alert.source}</h3>
                        <p className="text-gray-600">{alert.message}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {alert.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}

              {getAlerts().length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">All Systems Normal</h3>
                  <p className="text-gray-600">No alerts at this time. Your farm is running smoothly!</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sensor Detail Modal */}
      {selectedSensor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedSensor.name}</h3>
              <button
                onClick={() => setSelectedSensor(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Current Value</p>
                <p className="text-2xl font-bold">{selectedSensor.value.toFixed(2)} {selectedSensor.unit}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{selectedSensor.location.field}</p>
                <p className="text-sm text-gray-500">
                  {selectedSensor.location.coordinates.lat.toFixed(4)}, {selectedSensor.location.coordinates.lng.toFixed(4)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Battery</p>
                  <p className="font-medium">{selectedSensor.batteryLevel.toFixed(0)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Signal</p>
                  <p className="font-medium">{selectedSensor.signalStrength}%</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Last Update</p>
                <p className="font-medium">{selectedSensor.lastUpdate.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default IoTFarmMonitoring;