import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

/**
 * ErrorMessage Component
 * Status: ✅ 100% Complete - Students use as is
 *
 * Displays error messages with a retry button.
 * Provides user-friendly feedback when API calls fail.
 *
 * Props:
 * @param {string} message - Error message to display
 * @param {Function} onRetry - Callback function to retry the operation
 *
 * Usage:
 * {error && (
 *   <ErrorMessage
 *     message={error}
 *     onRetry={() => loadWeather()}
 *   />
 * )}
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <View style={styles.container}>
      {/* Error Icon */}
      <Text style={styles.icon}>⚠️</Text>

      {/* Error Message */}
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>{message}</Text>

      {/* Retry Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={onRetry}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
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
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    minHeight: 48, // Professional touch target
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
