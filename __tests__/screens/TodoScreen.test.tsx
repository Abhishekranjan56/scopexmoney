import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TodoScreen from '../../src/screens/TodoScreen';

describe('TodoScreen', () => {
  it('renders correctly and handles adding, updating, and deleting todos', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<TodoScreen />);

    fireEvent.press(getByTestId('add-button'));
    fireEvent.changeText(getByPlaceholderText('Enter new todo'), 'New Todo');
    fireEvent.press(getByText('Save'));

    await waitFor(() => {
      expect(getByText('New Todo')).toBeTruthy();
    });

    fireEvent.press(getByTestId('edit-button'));
    fireEvent.changeText(getByPlaceholderText('Enter new todo'), 'Updated Todo');
    fireEvent.press(getByText('Update'));

    await waitFor(() => {
      expect(getByText('Updated Todo')).toBeTruthy();
    });

    fireEvent.press(getByTestId('delete-button'));

    await waitFor(() => {
      expect(() => getByText('Updated Todo')).toThrow('Unable to find an element with text: Updated Todo');
    });
  });
});
