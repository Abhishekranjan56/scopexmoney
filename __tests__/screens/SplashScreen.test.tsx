// src/__tests__/screens/SplashScreen.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SplashScreen from '../../src/screens/SplashScreen'
import RNBootSplash from 'react-native-bootsplash';

jest.useFakeTimers();
jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
}));

describe('SplashScreen', () => {
  it('displays loading indicator initially', () => {
    const { getByTestId } = render(<SplashScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('hides splash screen after loading', async () => {
    const { getByText, queryByTestId } = render(<SplashScreen />);
    jest.runAllTimers();
    await waitFor(() => {
      expect(RNBootSplash.hide).toHaveBeenCalled();
      expect(queryByTestId('loading-indicator')).toBeNull();
      expect(getByText('Welcome to Awesome Project')).toBeTruthy();
    });
  });

  it('displays error message on failure', async () => {
    (RNBootSplash.hide as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Error hiding splash screen');
    });

    const { getByText, getByTestId } = render(<SplashScreen />);
    jest.runAllTimers();
    await waitFor(() => {
      expect(getByTestId('error-text')).toBeTruthy();
      expect(getByText('Failed to hide splash screen. Please try again.')).toBeTruthy();
    });
  });

  it('retries hiding splash screen on retry button press', async () => {
    (RNBootSplash.hide as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Error hiding splash screen');
    });

    const { getByText, getByTestId } = render(<SplashScreen />);
    jest.runAllTimers();
    await waitFor(() => {
      expect(getByTestId('error-text')).toBeTruthy();
    });

    (RNBootSplash.hide as jest.Mock).mockImplementationOnce(() => Promise.resolve());

    fireEvent.press(getByText('Retry'));
    jest.runAllTimers();
    await waitFor(() => {
      expect(getByText('Welcome to Awesome Project')).toBeTruthy();
    });
  });
});
