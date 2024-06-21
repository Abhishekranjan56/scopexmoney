// SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      RNBootSplash.hide();
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

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
    backgroundColor: '#fff', // Adjust the background color as needed
  },
  logo: {
    width: 100,
    height: 100, // Adjust the size as needed
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Adjust the text color as needed
  },
});

export default SplashScreen;
