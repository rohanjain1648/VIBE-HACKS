import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Download, Upload, RefreshCw, Database, Clock, CheckCircle, AlertCircle, Smartphone } from 'lucide-react';

interface OfflineData {
  services: any[];
  gigs: any[];
  messages: any[];
  userProfile: any;
  lastSync: string;
}

interface SyncStatus {
  isOnline: boolean;
  lastSync: Date | null;
  pendingUploads: number;
  pendingDownloads: number;
  syncInProgress: boolean;
  dataSize: number;
}

interface CachedItem {
  id: string;
  type: 'service' | 'gig' | 'message' | 'profile' | 'alert';
  title: string;
  size: string;
  lastAccessed: string;
  priority: 'high' | 'medium' | 'low';
}

const MOCK_CACHED_DATA: CachedItem[] = [
  {
    id: 'cache-1',
    type: 'service',
    title: 'Emergency Services Directory',
    size: '2.3 MB',
    lastAccessed: '2 hours ago',
    priority: 'high'
  },
  {
    id: 'cache-2',
    type: 'gig',
    title: 'Local Job Listings',
    size: '1.8 MB',
    lastAccessed: '1 day ago',
    priority: 'medium'
  },
  {
    id: 'cache-3',
    type: 'message',
    title: 'Community Messages',
    size: '5.2 MB',
    lastAccessed: '3 hours ago',
    priority: 'medium'
  },
  {
    id: 'cache-4',
    type: 'alert',
    title: 'Weather Alerts',
    size: '0.8 MB',
    lastAccessed: '30 minutes ago',
    priority: 'high'
  },
  {
    id: 'cache-5',
    type: 'profile',
    title: 'User Profile & Settings',
    size: '0.3 MB',
    lastAccessed: '1 hour ago',
    priority: 'high'
  }
];

export const OfflineFirstManager: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: navigator.onLine,
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    pendingUploads: 3,
    pendingDownloads: 0,
    syncInProgress: false,
    dataSize: 10.4 // MB
  });

  const [cachedData, setCachedData] = useState<CachedItem[]>(MOCK_CACHED_DATA);
  const [offlineMode, setOfflineMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [lowDataMode, setLowDataMode] = useState(false);

  useEffect(() => {
    // Listen for online/offline events
    const handleOnline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: true }));
      if (autoSync) {
        startSync();
      }
    };

    const handleOffline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [autoSync]);

  const startSync = async () => {
    if (!syncStatus.isOnline || syncStatus.syncInProgress) return;

    setSyncStatus(prev => ({ ...prev, syncInProgress: true }));

    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 3000));

    setSyncStatus(prev => ({
      ...prev,
      syncInProgress: false,
      lastSync: new Date(),
      pendingUploads: 0,
      pendingDownloads: 0
    }));
  };

  const clearCache = (itemId?: string) => {
    if (itemId) {
      setCachedData(prev => prev.filter(item => item.id !== itemId));
    } else {
      setCachedData([]);
      setSyncStatus(prev => ({ ...prev, dataSize: 0 }));
    }
  };

  const downloadForOffline = async (type: string) => {
    setSyncStatus(prev => ({ ...prev, pendingDownloads: prev.pendingDownloads + 1 }));

    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 2000));

    setSyncStatus(prev => ({
      ...prev,
      pendingDownloads: prev.pendingDownloads - 1,
      dataSize: prev.dataSize + 2.5
    }));

    // Add to cached data
    const newItem: CachedItem = {
      id: `cache-${Date.now()}`,
      type: type as any,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Data`,
      size: '2.5 MB',
      lastAccessed: 'Just now',
      priority: 'medium'
    };

    setCachedData(prev => [...prev, newItem]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'service': return <Database className="text-blue-600" size={16} />;
      case 'gig': return <Smartphone className="text-green-600" size={16} />;
      case 'message': return <RefreshCw className="text-purple-600" size={16} />;
      case 'alert': return <AlertCircle className="text-red-600" size={16} />;
      case 'profile': return <CheckCircle className="text-blue-600" size={16} />;
      default: return <Database className="text-gray-600" size={16} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className={`rounded-lg p-6 mb-6 ${syncStatus.isOnline
        ? 'bg-gradient-to-r from-green-500 to-blue-500'
        : 'bg-gradient-to-r from-orange-500 to-red-500'
        } text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center">
              {syncStatus.isOnline ? <Wifi className="mr-2" size={28} /> : <WifiOff className="mr-2" size={28} />}
              Offline-First Manager
            </h1>
            <p className={syncStatus.isOnline ? 'text-green-100' : 'text-orange-100'}>
              {syncStatus.isOnline ? 'Connected - Data syncing available' : 'Offline - Using cached data'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{syncStatus.dataSize.toFixed(1)} MB</div>
            <div className="text-sm opacity-90">Cached Data</div>
          </div>
        </div>
      </div>

      {/* Connection Status & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <RefreshCw className="text-blue-600 mr-2" size={24} />
            Sync Status
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Connection Status</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${syncStatus.isOnline
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
                }`}>
                {syncStatus.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Last Sync</span>
              <span className="text-gray-600 flex items-center">
                <Clock size={14} className="mr-1" />
                {syncStatus.lastSync ? syncStatus.lastSync.toLocaleTimeString() : 'Never'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Pending Uploads</span>
              <span className={`px-2 py-1 rounded-full text-sm ${syncStatus.pendingUploads > 0 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                }`}>
                {syncStatus.pendingUploads}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Pending Downloads</span>
              <span className={`px-2 py-1 rounded-full text-sm ${syncStatus.pendingDownloads > 0 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                {syncStatus.pendingDownloads}
              </span>
            </div>

            <button
              onClick={startSync}
              disabled={!syncStatus.isOnline || syncStatus.syncInProgress}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${syncStatus.isOnline && !syncStatus.syncInProgress
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              {syncStatus.syncInProgress ? (
                <span className="flex items-center justify-center">
                  <Sync className="animate-spin mr-2" size={16} />
                  Syncing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Sync className="mr-2" size={16} />
                  Sync Now
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Offline Settings</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-700 font-medium">Auto Sync</span>
                <p className="text-sm text-gray-500">Automatically sync when online</p>
              </div>
              <button
                onClick={() => setAutoSync(!autoSync)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoSync ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoSync ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-700 font-medium">Low Data Mode</span>
                <p className="text-sm text-gray-500">Reduce data usage</p>
              </div>
              <button
                onClick={() => setLowDataMode(!lowDataMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${lowDataMode ? 'bg-orange-600' : 'bg-gray-200'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${lowDataMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-700 font-medium">Offline Mode</span>
                <p className="text-sm text-gray-500">Force offline operation</p>
              </div>
              <button
                onClick={() => setOfflineMode(!offlineMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${offlineMode ? 'bg-red-600' : 'bg-gray-200'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${offlineMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Download for Offline */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Download className="text-green-600 mr-2" size={24} />
          Download for Offline Use
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['services', 'gigs', 'messages', 'alerts'].map((type) => (
            <button
              key={type}
              onClick={() => downloadForOffline(type)}
              disabled={!syncStatus.isOnline}
              className={`p-4 rounded-lg border-2 border-dashed transition-colors ${syncStatus.isOnline
                ? 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                : 'border-gray-200 cursor-not-allowed'
                }`}
            >
              <div className="text-center">
                {getTypeIcon(type)}
                <p className="mt-2 text-sm font-medium text-gray-700 capitalize">{type}</p>
                <p className="text-xs text-gray-500">Download</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cached Data */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Database className="text-purple-600 mr-2" size={24} />
            Cached Data ({cachedData.length} items)
          </h2>
          <button
            onClick={() => clearCache()}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Clear All Cache
          </button>
        </div>

        <div className="space-y-3">
          {cachedData.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                {getTypeIcon(item.type)}
                <div>
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{item.size}</span>
                    <span>•</span>
                    <span>Last accessed {item.lastAccessed}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </span>
                <button
                  onClick={() => clearCache(item.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {cachedData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Database size={48} className="mx-auto mb-4 opacity-50" />
            <p>No cached data available</p>
            <p className="text-sm">Download content for offline use</p>
          </div>
        )}
      </div>

      {/* Offline Tips */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Offline Usage Tips</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Download essential services before traveling to remote areas</li>
          <li>• Enable auto-sync to keep data updated when connected</li>
          <li>• Use low data mode to conserve mobile data</li>
          <li>• Emergency services information is always cached locally</li>
          <li>• Voice commands work offline for basic navigation</li>
        </ul>
      </div>
    </div>
  );
};

export default OfflineFirstManager;