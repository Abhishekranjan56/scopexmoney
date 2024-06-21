import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Onboarding from '../../src/screens/Onboarding';

jest.useFakeTimers();

describe('Onboarding', () => {
  it('renders correctly and handles the continue button', async () => {
    const { getByText, getByRole } = render(<Onboarding />);

    expect(getByText('Screen 1')).toBeTruthy();
    expect(getByText('Screen 2')).toBeTruthy();
    expect(getByText('Screen 3')).toBeTruthy();

    fireEvent.press(getByText('Continue'));
    jest.runAllTimers();

    expect(getByRole('progressbar')).toBeTruthy(); 
  });

  it('displays error message when an error occurs', async () => {
    const mockSetTimeout = jest.spyOn(global, 'setTimeout').mockImplementationOnce((cb) => {
      cb();
      return 0 as unknown as NodeJS.Timeout; 
    });

    const { getByText } = render(<Onboarding />);

    fireEvent.press(getByText('Continue'));

    await waitFor(() => {
      expect(getByText('An error occurred. Please try again.')).toBeTruthy();
    });

    mockSetTimeout.mockRestore();
  });
});
