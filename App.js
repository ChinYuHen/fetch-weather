import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const showAlert = (title, message, buttons = [{ text: 'OK' }]) => {
  if (Platform.OS === 'web') {
    const result = window.confirm(`${title}\n\n${message}`);
    const okButton = buttons.find(b => b.text === 'OK' || b.style !== 'cancel');
    const cancelButton = buttons.find(b => b.style === 'cancel');
    if (result && okButton?.onPress) okButton.onPress();
    if (!result && cancelButton?.onPress) cancelButton.onPress();
  } else {
    Alert.alert(title, message, buttons);
  }
};

import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { WeatherAPI } from './services/WeatherAPI';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');

  const loadWeather = async () => {
    if (!city.trim()) {
      showAlert('Empty City', 'Please enter a city name');
      return;
    }

    // TODO #2: Flip into the loading state and clear any previous error so the
    // spinner takes over the screen during the request.
    // Verify: A spinner replaces the form for the duration of the fetch.

    try {
      const data = await WeatherAPI.fetchWeather(city);
      setWeather(data);
    } catch (err) {
      // TODO #3: Decide what to show the user. If the error message names "City
      // not found", say so with the city echoed back; if it sounds like a
      // network problem, say that; otherwise fall back to a generic message.
      // Set that string into `error` so the ErrorMessage screen renders.
      // Verify: Submitting "asdf" shows a "City not found" message; turning
      // off Wi-Fi mid-request shows a network error.
    } finally {
      // TODO #2: Always exit the loading state — success or failure.
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadWeather} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Weather Finder</Text>
            <Text style={styles.subtitle}>Get real-time weather data</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter city name (e.g., London)"
            placeholderTextColor="#999"
            value={city}
            onChangeText={setCity}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={loadWeather}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={loadWeather}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Weather</Text>
          </TouchableOpacity>

          {weather && (
            <View style={styles.weatherContainer}>
              <WeatherCard weather={weather} cityName={city} />
            </View>
          )}

          {!weather && !loading && !error && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                Enter a city name above to see the weather
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    minHeight: 48,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minHeight: 48,
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  weatherContainer: {
    marginTop: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
});
