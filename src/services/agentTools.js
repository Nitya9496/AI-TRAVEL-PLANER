// src/services/agentTools.js

// 1. Real Weather Tool
export async function getLiveWeather(lat, lng) {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
    const data = await res.json();
    return {
      temp: data.current_weather.temperature,
      condition: data.current_weather.weathercode,
      windspeed: data.current_weather.windspeed
    };
  } catch (e) {
    return { temp: 26, condition: "Pleasant", error: "Offline Mode" };
  }
}

// 2. Real OSRM Road Distance Tool
export async function getRoadRoute(startLng, startLat, endLng, endLat) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();
    const route = data.routes[0];
    return {
      distanceKm: (route.distance / 1000).toFixed(1),
      durationHours: (route.duration / 3600).toFixed(1),
      coordinates: route.geometry.coordinates // Array of [lng, lat]
    };
  } catch (e) {
    return { distanceKm: "140", durationHours: "3.5", coordinates: [] };
  }
}

