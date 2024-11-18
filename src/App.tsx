import React from 'react';
import { Sun } from 'lucide-react';
import { cities } from './data/cities';
import { useSunriseTimes } from './hooks/useSunriseTimes';
import WorldMap from './components/WorldMap';
import CityList from './components/CityList';

function App() {
  const sunriseData = useSunriseTimes(cities);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3">
            <Sun className="h-10 w-10 text-yellow-500" />
            <h1 className="text-4xl font-bold text-white">Global 'Sunrise' Tracker</h1>
          </div>
          <p className="mt-2 text-gray-400">Real-time visualization of day and night across the globe</p>
        </header>

        <div className="mb-8 rounded-xl bg-slate-800/50 p-4 shadow-2xl backdrop-blur-sm">
          <WorldMap sunriseData={sunriseData} />
        </div>

        <CityList sunriseData={sunriseData} />

        <footer className="mt-8 text-center text-sm text-gray-400">
          <p>Data updates every minute • Times shown in local timezone</p>
          <p>NOTE: Code written by AI. Modifications made by Michelle. Website was made as an inside joke.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;