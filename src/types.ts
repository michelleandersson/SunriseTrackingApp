export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface SunriseData {
  city: City;
  sunrise: Date;
  sunset: Date;
  dawn: Date;
  dusk: Date;
  progress: number;
}