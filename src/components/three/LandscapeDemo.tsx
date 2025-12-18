import React, { useState } from 'react';
import { AustralianLandscape } from './AustralianLandscape';

interface LandscapeDemoProps {
  className?: string;
}

export const LandscapeDemo: React.FC<LandscapeDemoProps> = ({ className = '' }) => {
  const [timeOfDay, setTimeOfDay] = useState(12);
  const [weatherType, setWeatherType] = useState<'sunny' | 'rainy' | 'cloudy' | 'windy'>('sunny');
  const [region, setRegion] = useState<'outback' | 'coastal' | 'forest' | 'grassland'>('outback');
  const [showControls, setShowControls] = useState(true);

  const getTimeLabel = (time: number): string => {
    if (time >= 0 && time < 6) return 'Night';
    if (time >= 6 && time < 12) return 'Morning';
    if (time >= 12 && time < 18) return 'Afternoon';
    return 'Evening';
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Australian Landscape</h1>
              <span className="ml-2 text-xs sm:text-sm text-gray-500 hidden sm:inline">Explore the beauty of rural Australia</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <div className="text-xs sm:text-sm text-gray-600">
                <span className="hidden sm:inline">Region: </span><span className="font-medium capitalize">{region}</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                <span className="hidden sm:inline">Time: </span><span className="font-medium">{getTimeLabel(timeOfDay)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Scene Container */}
      <div className={`relative w-full`} style={{ height: 'calc(100vh - 64px)' }}>
        {/* Three.js Scene */}
        <AustralianLandscape
          timeOfDay={timeOfDay}
          weatherType={weatherType}
          region={region}
        />

        {/* Controls Panel */}
        {showControls && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg max-w-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Landscape Controls</h3>
              <button
                onClick={() => setShowControls(false)}
                className="text-white hover:text-gray-300"
              >
                ×
              </button>
            </div>

            {/* Time of Day Control */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Time of Day: {timeOfDay}:00 ({getTimeLabel(timeOfDay)})
              </label>
              <input
                type="range"
                min="0"
                max="24"
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>6</span>
                <span>12</span>
                <span>18</span>
                <span>24</span>
              </div>
            </div>

            {/* Weather Control */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Weather</label>
              <select
                value={weatherType}
                onChange={(e) => setWeatherType(e.target.value as any)}
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
              >
                <option value="sunny">☀️ Sunny</option>
                <option value="cloudy">☁️ Cloudy</option>
                <option value="rainy">🌧️ Rainy</option>
                <option value="windy">💨 Windy</option>
              </select>
            </div>

            {/* Region Control */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as any)}
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
              >
                <option value="outback">🏜️ Outback</option>
                <option value="coastal">🏖️ Coastal</option>
                <option value="forest">🌲 Forest</option>
                <option value="grassland">🌾 Grassland</option>
              </select>
            </div>

            {/* Quick Presets */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Quick Presets</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setTimeOfDay(6);
                    setWeatherType('sunny');
                    setRegion('outback');
                  }}
                  className="p-2 bg-orange-600 hover:bg-orange-700 rounded text-xs"
                >
                  Outback Dawn
                </button>
                <button
                  onClick={() => {
                    setTimeOfDay(18);
                    setWeatherType('cloudy');
                    setRegion('coastal');
                  }}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-xs"
                >
                  Coastal Dusk
                </button>
                <button
                  onClick={() => {
                    setTimeOfDay(12);
                    setWeatherType('rainy');
                    setRegion('forest');
                  }}
                  className="p-2 bg-green-600 hover:bg-green-700 rounded text-xs"
                >
                  Forest Rain
                </button>
                <button
                  onClick={() => {
                    setTimeOfDay(14);
                    setWeatherType('windy');
                    setRegion('grassland');
                  }}
                  className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded text-xs"
                >
                  Windy Plains
                </button>
              </div>
            </div>

            {/* Keyboard Controls Info */}
            <div className="text-xs text-gray-400">
              <div className="mb-2 font-medium">Keyboard Controls:</div>
              <div>WASD / Arrow Keys: Move</div>
              <div>Q/E: Up/Down</div>
              <div>1-5: Camera presets</div>
            </div>
          </div>
        )}

        {/* Show Controls Button (when hidden) */}
        {!showControls && (
          <button
            onClick={() => setShowControls(true)}
            className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded-lg hover:bg-opacity-90"
          >
            ⚙️ Controls
          </button>
        )}

        {/* Loading Indicator */}
        <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-70 px-3 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Australian Landscape Loaded</span>
          </div>
        </div>

        {/* Region Info */}
        <div className="absolute bottom-4 right-4 text-white bg-black bg-opacity-70 px-3 py-2 rounded-lg">
          <div className="text-sm">
            <div className="font-medium capitalize">{region} Region</div>
            <div className="text-xs text-gray-300">
              {region === 'outback' && 'Red earth, sparse vegetation, mesa formations'}
              {region === 'coastal' && 'Sandy beaches, gentle slopes, coastal flora'}
              {region === 'forest' && 'Dense eucalyptus, varied terrain, rich greens'}
              {region === 'grassland' && 'Rolling hills, abundant grass, scattered trees'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};