import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import {
  Volume2,
  VolumeX,
  MapPin,
  Clock,
  IndianRupee,
  ExternalLink,
  Layers,
  Navigation,
  Sparkles,
} from 'lucide-react';
import '../leafletFix';

/**
 * Adjusts the map view to dynamically fit the travel route points if available.
 */
function MapAutoCenter({ positions }) {
  const map = useMap();

  useEffect(() => {
    if (positions && positions.length === 1) {
      map.setView(positions[0], 12);
    } else if (positions && positions.length > 1) {
      map.fitBounds(positions, { padding: [45, 45], maxZoom: 13 });
    }
  }, [positions, map]);

  return null;
}

// Available Real Google Maps & Alternative Tile Layers
const MAP_LAYERS = {
  googleRoads: {
    name: 'Google Roads',
    icon: '🗺️',
    url: 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google Maps',
    maxZoom: 20,
  },
  googleSatellite: {
    name: 'Google Satellite',
    icon: '🛰️',
    url: 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google Maps Satellite',
    maxZoom: 20,
  },
  googleHybrid: {
    name: 'Google Hybrid',
    icon: '🌍',
    url: 'https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google Maps Hybrid',
    maxZoom: 20,
  },
  googleTerrain: {
    name: 'Google Terrain',
    icon: '🏔️',
    url: 'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google Maps Terrain',
    maxZoom: 20,
  },
  osm: {
    name: 'OpenStreetMap',
    icon: '🌐',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    subdomains: ['a', 'b', 'c'],
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  },
};

/**
 * TravelMap Component powered by Real Google Maps Tile Engine & Turn-by-Turn Navigation
 *
 * @param {Object} props
 * @param {Array} props.places - Array of activities with lat, lng, place, time, cost, audioStory, desc
 */
export default function TravelMap({ places = [] }) {
  const [activeLayer, setActiveLayer] = useState('googleRoads');
  const [playingStory, setPlayingStory] = useState(null);

  // Filter for valid geographic coordinates
  const validPlaces = places.filter(
    (p) =>
      p &&
      typeof p.lat === 'number' &&
      typeof p.lng === 'number' &&
      !isNaN(p.lat) &&
      !isNaN(p.lng)
  );

  const routeCoordinates = validPlaces.map((p) => [p.lat, p.lng]);
  const defaultCenter = [14.5, 75.7]; // Center of Karnataka
  const defaultZoom = 7;

  // Speak audio story
  const handlePlayAudio = (text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (playingStory === text) {
      window.speechSynthesis.cancel();
      setPlayingStory(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onend = () => setPlayingStory(null);
    utterance.onerror = () => setPlayingStory(null);

    setPlayingStory(text);
    window.speechSynthesis.speak(utterance);
  };

  // Generate Turn-by-Turn Google Maps Multi-Stop Navigation URL
  const getGoogleMapsDirectionsUrl = () => {
    if (validPlaces.length === 0) return 'https://www.google.com/maps';
    if (validPlaces.length === 1) {
      return `https://www.google.com/maps/search/?api=1&query=${validPlaces[0].lat},${validPlaces[0].lng}`;
    }

    const origin = `${validPlaces[0].lat},${validPlaces[0].lng}`;
    const destination = `${validPlaces[validPlaces.length - 1].lat},${validPlaces[validPlaces.length - 1].lng}`;
    const waypoints = validPlaces
      .slice(1, -1)
      .map((p) => `${p.lat},${p.lng}`)
      .join('|');

    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${
      waypoints ? `&waypoints=${waypoints}` : ''
    }&travelmode=driving`;
  };

  const selectedTileConfig = MAP_LAYERS[activeLayer];

  return (
    <div className="space-y-3">
      {/* Real Google Maps Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2">
          {/* Google Maps Logo Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-black">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>Google Maps Engine</span>
          </div>

          {/* Layer Selector Switcher */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
            {Object.keys(MAP_LAYERS).map((key) => {
              const layer = MAP_LAYERS[key];
              const isSelected = activeLayer === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveLayer(key)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title={`Switch to ${layer.name}`}
                >
                  <span>{layer.icon}</span>
                  <span className="hidden md:inline">{layer.name.replace('Google ', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Turn-by-Turn Directions in Official Google Maps App */}
        {validPlaces.length > 0 && (
          <a
            href={getGoogleMapsDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps App (Directions)</span>
            <ExternalLink className="w-3 h-3 text-blue-200" />
          </a>
        )}
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[480px] md:h-[580px] rounded-3xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100">
        <MapContainer
          key={activeLayer}
          center={defaultCenter}
          zoom={defaultZoom}
          scrollWheelZoom={true}
          className="w-full h-full z-0 font-sans"
        >
          {/* Real Google Maps Tile Layer */}
          <TileLayer
            attribution={selectedTileConfig.attribution}
            url={selectedTileConfig.url}
            subdomains={selectedTileConfig.subdomains}
            maxZoom={selectedTileConfig.maxZoom}
          />

          {/* Visual Route Polyline with Karnataka Crimson & Royal Blue */}
          {routeCoordinates.length > 1 && (
            <>
              {/* Outer polyline glow */}
              <Polyline
                positions={routeCoordinates}
                pathOptions={{
                  color: '#b91c1c', // Crimson Red
                  weight: 6,
                  opacity: 0.45,
                }}
              />
              {/* Inner polyline */}
              <Polyline
                positions={routeCoordinates}
                pathOptions={{
                  color: '#1d4ed8', // Royal Blue
                  weight: 3.5,
                  opacity: 0.95,
                  dashArray: '6, 6',
                }}
              />
            </>
          )}

          {/* Destination Markers */}
          {validPlaces.map((item, index) => (
            <Marker
              key={`${item.place || 'marker'}-${index}`}
              position={[item.lat, item.lng]}
            >
              <Popup className="custom-travel-popup">
                <div className="p-1 min-w-[240px] max-w-[300px] space-y-2 font-sans text-xs">
                  {/* Header */}
                  <div className="border-b border-amber-200 pb-1.5 flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm leading-tight">
                        {item.place || 'Karnataka Destination'}
                      </h4>
                      <span className="text-[10px] text-amber-700 font-semibold">
                        Stop #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-1.5 text-gray-600 bg-amber-50/60 p-1.5 rounded-lg border border-amber-100">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span className="font-medium text-gray-800">{item.time || 'Day'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-3.5 h-3.5 text-gray-500" />
                      <span className="font-semibold text-gray-800">
                        {item.cost ? `₹${item.cost}` : 'Free'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {item.desc && (
                    <p className="text-gray-600 line-clamp-3 leading-relaxed text-[11px]">
                      {item.desc}
                    </p>
                  )}

                  {/* Audio Lore Player */}
                  {item.audioStory && (
                    <div className="pt-1 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => handlePlayAudio(item.audioStory)}
                        className={`w-full py-1 px-2 rounded-md text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          playingStory === item.audioStory
                            ? 'bg-red-600 text-white animate-pulse'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                        }`}
                      >
                        {playingStory === item.audioStory ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Stop Lore</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Listen Historical Lore</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Turn-by-Turn Google Maps Destination Navigation */}
                  <div className="pt-1.5 border-t border-gray-100 flex items-center gap-1.5">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 px-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-[11px] font-black flex items-center justify-center gap-1 transition-colors border border-blue-200"
                    >
                      <Navigation className="w-3 h-3 text-blue-600" />
                      <span>Directions in Google Maps</span>
                      <ExternalLink className="w-2.5 h-2.5 text-blue-400" />
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Dynamic Bounds Fitting */}
          <MapAutoCenter positions={routeCoordinates} />
        </MapContainer>
      </div>
    </div>
  );
}
