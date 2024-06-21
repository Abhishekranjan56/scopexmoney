import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoCard from '../../src/components/TodoCard';

describe('TodoCard', () => {
  it('renders correctly and handles delete and edit actions', () => {
    const todo = 'Test Todo';
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    const { getByText, getByTestId } = render(
      <TodoCard todo={todo} onDelete={onDelete} onEdit={onEdit} />
    );

    expect(getByText('Test Todo')).toBeTruthy();

    fireEvent.press(getByTestId('edit-button'));
    expect(onEdit).toHaveBeenCalled();

    fireEvent.press(getByTestId('delete-button'));
    expect(onDelete).toHaveBeenCalled();
  });
});
