import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserList from './UserList';

test('Renders correctly when it does not have any users', () => {
  const noop = () => {};
  const { getByText } = render(<UserList users={[]} onUserRemove={noop}/>);
  const titleElement = getByText(/Existing Users/i);
  expect(titleElement).toBeInTheDocument();
  expect(getByText(/No users found/i)).toBeInTheDocument();
});

test('Renders correctly when it has users', () => {
  const onUserRemove = jest.fn();
  const users = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Doe' },
    { id: '3', name: 'Foo Bar Doe' },
  ];
  const { getByText, getAllByTestId, getByTestId } = render(<UserList users={users} onUserRemove={onUserRemove}/>);
  const titleElement = getByText(/Existing Users/i);
  expect(titleElement).toBeInTheDocument();

  const userEntries = getAllByTestId('user-entry');
  expect(userEntries).toHaveLength(3);

  fireEvent.click(getAllByTestId('btn-remove-user-entry')[0],{ });
  expect(onUserRemove).toHaveBeenCalled();

  fireEvent.click(getByTestId('btn-pick-random-user'),{ });
  expect(getByText(/User picked/i)).toBeInTheDocument();
});
