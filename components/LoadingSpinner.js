import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

/**
 * LoadingSpinner Component
 * Status: ✅ 100% Complete - Students use as is
 *
 * Displays a loading indicator with message while fetching data.
 * This component is shown when the app is waiting for API response.
 *
 * Usage:
 * {loading && <LoadingSpinner />}
 */
export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Fetching weather data...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 40,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
