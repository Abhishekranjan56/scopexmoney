// src/screens/Onboarding.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
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
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const handleContinue = () => {
    navigation.navigate('TodoScreen');
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
        <Button title="Continue" onPress={handleContinue} />
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
});

export default Onboarding;
