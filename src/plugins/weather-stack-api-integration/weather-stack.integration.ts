import { Integration } from '@agent-stage/framework';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface WeatherstackResponse {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
  };
}

export class WeatherstackIntegration implements Integration {
  id = 'weatherstack';
  name = 'Weatherstack Weather Integration';
  version = '1.0.0';

  private readonly apiKey = process.env.WEATHERSTACK_API_KEY;
  private readonly baseUrl = 'http://api.weatherstack.com';

  constructor() {
    if (!this.apiKey) {
      throw new Error('WEATHERSTACK_API_KEY environment variable is not set');
    }
    
    this.methods = {
      getWeatherForecast: this.getWeatherForecast.bind(this)
    };
  }

  methods: {
    getWeatherForecast: (location: string) => Promise<object>;
  };

  private async getWeatherForecast(location: string): Promise<object> {
    try {
      if (!location) {
        throw new Error('Location parameter is required');
      }

      const response = await axios.get<WeatherstackResponse>(
        `${this.baseUrl}/current`,
        {
          params: {
            access_key: this.apiKey,
            query: location
          }
        }
      );

      if (!response.data || !response.data.location || !response.data.current) {
        throw new Error(JSON.stringify(response.data));
      }

      return {
        location: {
          name: response.data.location.name,
          country: response.data.location.country,
          region: response.data.location.region,
          localTime: response.data.location.localtime
        },
        weather: {
          temperature: response.data.current.temperature,
          description: response.data.current.weather_descriptions[0],
          windSpeed: response.data.current.wind_speed,
          windDirection: response.data.current.wind_dir,
          humidity: response.data.current.humidity,
          feelsLike: response.data.current.feelslike,
          uvIndex: response.data.current.uv_index,
          visibility: response.data.current.visibility
        }
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Weatherstack API error:', error.response?.data || error.message);
        throw new Error(`Failed to fetch weather data: ${error.response?.data?.error?.info || error.message}`);
      }
      console.error('Failed to fetch weather data:', error);
      throw new Error('Failed to fetch weather data from Weatherstack');
    }
  }
}

export default WeatherstackIntegration; 