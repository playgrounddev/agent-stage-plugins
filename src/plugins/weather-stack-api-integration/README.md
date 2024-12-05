# Weatherstack Weather Integration Plugin

This plugin integrates the Weatherstack API with Agent Stage, allowing you to fetch current weather data for any location in your workflows.

## Features

- Get current weather data for any location
- Detailed weather information including temperature, wind, humidity, and more
- Location-specific data including country, region, and local time

## Prerequisites

- A Weatherstack API key (get one at [weatherstack.com](https://weatherstack.com))
- Agent Stage Framework

## Installation

1. Install the plugin using Agent Stage CLI:
```bash
agent-stage plugin add weather-stack-api-integration
```

2. Create a `.env` file in your project root and add your Weatherstack API key:
```
WEATHERSTACK_API_KEY=your_api_key_here
```

## Usage in Workflows

Here's an example of how to use the Weatherstack integration in your workflow:

```typescript
import { WorkflowStep, WorkflowStepInputType } from '@agent-stage/framework';

export const weatherStep: WorkflowStep = {
  id: 'weather-forecast',
  type: 'integration',
  integration: {
    id: 'weatherstack',
    method: 'getWeatherForecast'
  },
  inputs: {
    required: [{
      type: WorkflowStepInputType.INPUT,
      description: 'The location for which to fetch the weather forecast',
    }]
  },
  outputs: {
    location: 'object',
    weather: 'object'
  }
};
```

## Response Format

The integration returns weather data in the following format:

```typescript
{
  location: {
    name: string;
    country: string;
    region: string;
    localTime: string;
  },
  weather: {
    temperature: number;
    description: string;
    windSpeed: number;
    windDirection: string;
    humidity: number;
    feelsLike: number;
    uvIndex: number;
    visibility: number;
  }
}
```

## Error Handling

The integration includes built-in error handling for:
- Missing API key
- Invalid location parameters
- API request failures
- Invalid response data

## License

MIT
