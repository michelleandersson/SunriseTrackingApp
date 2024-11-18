import { useState, useEffect } from 'react';
import SunCalc from 'suncalc';
import { formatInTimeZone } from 'date-fns-tz';
import { City, SunriseData } from '../types';

export function useSunriseTimes(cities: City[]) {
  const [sunriseData, setSunriseData] = useState<SunriseData[]>([]);

  useEffect(() => {
    const updateTimes = () => {
      const newData = cities.map(city => {
        const now = new Date();
        const localTime = formatInTimeZone(now, city.timezone, 'yyyy-MM-dd HH:mm:ss');
        const times = SunCalc.getTimes(new Date(localTime), city.latitude, city.longitude);
        
        const sunrise = new Date(times.sunrise);
        const sunset = new Date(times.sunset);
        const currentTime = new Date(localTime);
        
        let progress = 0;
        if (currentTime > sunrise && currentTime < sunset) {
          const dayLength = sunset.getTime() - sunrise.getTime();
          const timeElapsed = currentTime.getTime() - sunrise.getTime();
          progress = (timeElapsed / dayLength) * 100;
        }

        return {
          city,
          sunrise: times.sunrise,
          sunset: times.sunset,
          dawn: times.dawn,
          dusk: times.dusk,
          progress: Math.min(Math.max(progress, 0), 100)
        };
      });

      setSunriseData(newData);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [cities]);

  return sunriseData;
}