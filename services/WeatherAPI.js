/**
 * WeatherAPI service: talks to Open-Meteo (no API key needed) and reduces its
 * responses down to the small object the WeatherCard component expects.
 *
 * Target shape (returned by `fetchWeather`):
 *   { temperature: 22, condition: 'Clear', description: 'clear sky',
 *     humidity: 65, windSpeed: 5.2 }
 *
 * Two requests make one lookup: a city name becomes coordinates, then the
 * coordinates become the current weather. Sample responses for both are at the
 * bottom of this file. Read the Open-Meteo docs for the parameter names and the
 * weather-code table.
 */

export class WeatherAPI {
  static GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
  static FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

  /**
   * TODO #1a: Turn `city` into coordinates, ask the forecast service for the
   * current temperature, humidity, wind and weather code at those coordinates
   * (wind in metres per second, because the card prints m/s), and return the
   * transformed result. A city the geocoding service does not know must throw
   * an error whose message includes "City not found" so App.js can show the
   * right message. A failed request must throw too, never return half a result.
   * Verify: A real city returns the simple object documented above; a typo
   * such as "asdf" throws an error whose message includes "City not found".
   */
  static async fetchWeather(city) {
    // Your code here
    throw new Error('TODO #1: Implement fetchWeather()');
  }

  /**
   * TODO #1b: Reduce the forecast service's `current` block (see the sample at
   * the bottom) to the simple shape App.js renders. The temperature is a whole
   * number. `condition` must be one of the words in the icon table below
   * (Clear, Clouds, Rain, Snow and so on), chosen from the numeric weather
   * code, and `description` is a short phrase for the same code.
   * Verify: Calling this with the documented sample returns temperature 20,
   * condition 'Clouds', humidity 43, windSpeed 4.3 and a non-empty description.
   */
  static transformResponse(data) {
    // Your code here
    return {
      temperature: 0,
      condition: 'Unknown',
      description: 'no data',
      humidity: 0,
      windSpeed: 0,
    };
  }

  /**
   * Pre-wired helper — pick the right emoji for a condition string.
   */
  static getWeatherIcon(condition) {
    const icons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Smoke: '🌫️',
      Haze: '🌫️',
      Dust: '🌫️',
      Fog: '🌫️',
      Sand: '🌫️',
      Ash: '🌫️',
      Squall: '💨',
      Tornado: '🌪️',
    };

    return icons[condition] || '🌡️';
  }
}

/**
 * Sample responses (for reference while writing the two functions).
 *
 * Geocoding, for a city that exists (an unknown city comes back as an object
 * with no `results` key at all, still with HTTP status 200):
 *
 * { "results": [ { "name": "London", "latitude": 51.50853,
 *                  "longitude": -0.12574, "country": "United Kingdom" } ] }
 *
 * Forecast, asking for the current temperature, humidity, weather code and wind:
 *
 * {
 *   "current_units": { "temperature_2m": "°C", "wind_speed_10m": "m/s" },
 *   "current": {
 *     "time": "2026-10-01T13:00",
 *     "temperature_2m": 19.9,
 *     "relative_humidity_2m": 43,
 *     "weather_code": 2,
 *     "wind_speed_10m": 4.3
 *   }
 * }
 */
