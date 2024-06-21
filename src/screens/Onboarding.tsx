import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

const { width, height } = Dimensions.get('window');

const Onboarding = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const handleContinue = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigation.navigate('Main', {
        screen: 'Todo',
      });
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Swiper style={styles.wrapper} showsButtons={true} dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
      <View style={styles.slide}>
        <Text style={styles.text}>Screen 1</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>Screen 2</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>Screen 3</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Continue" onPress={handleContinue} />
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    width: width,
    height: height,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Onboarding;
