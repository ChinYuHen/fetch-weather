import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WeatherAPI } from '../services/WeatherAPI';

/**
 * WeatherCard Component
 * Status: ✅ 100% Complete - Students use as is
 *
 * Displays weather information in a professional card layout.
 *
 * Props:
 * @param {Object} weather - Weather data object
 * @param {number} weather.temperature - Temperature in Celsius
 * @param {string} weather.condition - Weather condition (e.g., 'Clear')
 * @param {string} weather.description - Detailed description
 * @param {number} weather.humidity - Humidity percentage
 * @param {number} weather.windSpeed - Wind speed in m/s
 * @param {string} cityName - Name of the city
 */
export default function WeatherCard({ weather, cityName }) {
  const icon = WeatherAPI.getWeatherIcon(weather.condition);

  return (
    <View style={styles.card}>
      {/* City Name */}
      <Text style={styles.cityName}>{cityName}</Text>

      {/* Weather Icon */}
      <Text style={styles.icon}>{icon}</Text>

      {/* Temperature */}
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>{weather.temperature}°</Text>
        <Text style={styles.unit}>C</Text>
      </View>

      {/* Condition */}
      <Text style={styles.condition}>{weather.condition}</Text>
      <Text style={styles.description}>{weather.description}</Text>

      {/* Details */}
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{weather.humidity}%</Text>
        </View>

        <View style={styles.detailDivider} />

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind Speed</Text>
          <Text style={styles.detailValue}>{weather.windSpeed} m/s</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cityName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  icon: {
    fontSize: 80,
    marginBottom: 16,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  temperature: {
    fontSize: 64,
    fontWeight: '300',
    color: '#333',
  },
  unit: {
    fontSize: 32,
    fontWeight: '300',
    color: '#666',
    marginTop: 8,
  },
  condition: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textTransform: 'capitalize',
  },
  details: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  detailDivider: {
    width: 1,
    backgroundColor: '#eee',
  },
});
