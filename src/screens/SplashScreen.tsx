import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Button } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        RNBootSplash.hide();
        setLoading(false);
      } catch (err) {
        setError('Failed to hide splash screen. Please try again.');
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const retry = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        RNBootSplash.hide();
        setLoading(false);
      } catch (err) {
        setError('Failed to hide splash screen. Please try again.');
        setLoading(false);
      }
    }, 2000);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={retry} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../android/app/src/main/res/mipmap-hdpi/ic_launcher.png')} style={styles.logo} />
      <Text style={styles.text}>Welcome to Awesome Project</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SplashScreen;
