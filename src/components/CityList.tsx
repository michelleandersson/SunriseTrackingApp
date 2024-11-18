import React from 'react';
import { SunriseData } from '../types';
import CityCard from './CityCard';

interface CityListProps {
  sunriseData: SunriseData[];
}

const CityList: React.FC<CityListProps> = ({ sunriseData }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sunriseData.map((data) => (
        <CityCard key={data.city.name} data={data} />
      ))}
    </div>
  );
};

export default CityList;