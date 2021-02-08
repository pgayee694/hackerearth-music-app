import { WeatherType } from './weather-type';

export interface WeatherResponse {
  coord: {
    lat: number;
    long: number;
  };
  weather: [
    {
      main: WeatherType;
    },
  ];
  main: {
    temp: number;
  };
  wind: {
    speed: number;
  };
}
