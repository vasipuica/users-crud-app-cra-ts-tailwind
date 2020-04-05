import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddUser from './AddUser';

test('Add New User works correctly', () => {
  const spy = jest.fn();
  const {getByText, getByTestId} = render(<AddUser onUserAdd={spy}/>);
  const titleElement = getByText(/Add New User/i);
  expect(titleElement).toBeInTheDocument();

  expect(getByTestId('add-button')).toBeDisabled();

  fireEvent.change(
    getByTestId('add-user-input'),
    {target: {value: 'joe'}}
  );

  expect(getByTestId('add-button')).toBeEnabled();

  fireEvent.click(getByTestId('add-button'));
  expect(spy).toHaveBeenCalled();
});
