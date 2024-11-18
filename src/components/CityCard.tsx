import React from 'react';
import { format } from 'date-fns';
import { Sun, Sunrise, Sunset, Moon } from 'lucide-react';
import { SunriseData } from '../types';

interface CityCardProps {
  data: SunriseData;
}

const CityCard: React.FC<CityCardProps> = ({ data }) => {
  const isDaytime = data.progress > 0 && data.progress < 100;

  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-800/50 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl">
      <div className="absolute right-0 top-0 h-32 w-32 opacity-10">
        {isDaytime ? (
          <Sun className="h-full w-full text-yellow-500" />
        ) : (
          <Moon className="h-full w-full text-blue-500" />
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white">{data.city.name}</h3>
          <p className="text-sm text-gray-400">{data.city.country}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Sunrise className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-gray-300">
              Sunrise: {format(data.sunrise, 'HH:mm')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Sunset className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-gray-300">
              Sunset: {format(data.sunset, 'HH:mm')}
            </span>
          </div>
        </div>

        <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-700">
          <div
            className="absolute h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-1000"
            style={{ width: `${data.progress}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-400">
          {isDaytime ? 'Day in progress' : 'Night time'}
        </p>
      </div>
    </div>
  );
};

export default CityCard;