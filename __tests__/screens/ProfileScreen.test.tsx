import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProfileScreen from '../../src/screens/ProfileScreen';

jest.useFakeTimers();

describe('ProfileScreen', () => {
  it('displays loading indicator initially', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays profile data after loading', async () => {
    const { getByText, getByTestId } = render(<ProfileScreen />);
    jest.runAllTimers();
    await waitFor(() => {
      expect(getByTestId('profile-name')).toBeTruthy();
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('john.doe@example.com')).toBeTruthy();
    });
  });

  it('displays error message on load failure', async () => {
    jest.spyOn(global, 'setTimeout').mockImplementationOnce((cb) => {
      cb();
      return 0 as unknown as NodeJS.Timeout; // Return a value that matches the expected type
    });

    const { getByText, getByTestId } = render(<ProfileScreen />);
    jest.runAllTimers();
    await waitFor(() => {
      expect(getByTestId('error-text')).toBeTruthy();
      expect(getByText('Failed to load profile data. Please try again.')).toBeTruthy();
    });
  });

  it('retries loading profile data on retry button press', async () => {
    jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      cb();
      return 0 as unknown as NodeJS.Timeout;
    });

    const { getByText, getByTestId } = render(<ProfileScreen />);
    fireEvent.press(getByText('Retry'));
    jest.runAllTimers();
    await waitFor(() => {
      expect(getByTestId('profile-name')).toBeTruthy();
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('john.doe@example.com')).toBeTruthy();
    });
  });
});
