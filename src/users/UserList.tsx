import * as React from 'react';

import { UserEntry } from './types';

type UserListProps = {
  users: UserEntry[];
  onUserRemove: (uid: string) => void;
};

const UserList = (props: UserListProps): JSX.Element => {
  const {onUserRemove, users} = props;
  const [lastUserPicked, setLastUserPicked] = React.useState<string>();
  const pickedUser = lastUserPicked ? users.find(x => x.id === lastUserPicked) : false;

  const hasUsers = users.length > 0;
  const onPickUser = () => {
    let choices = [...users];
    if (lastUserPicked) {
      choices = [
        ...choices.filter(({id}) => id !== lastUserPicked)
      ];
    }
    const randomIndex = Math.floor(Math.random() * Math.floor(choices.length));
    setLastUserPicked(choices[randomIndex].id);
  };
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-700 pb-4">Existing Users</h2>
      {!hasUsers && (
        <p className="font-semibold text-lg text-blue-500">No users found, please use the form on the right hand side to add one.</p>
      )}
      {pickedUser && (
        <p className="text-teal-800 mb-4 p-4 bg-gray-100 border-2 border-green-700 rounded-lg text-lg shadow w-2/3">
          User picked: <span className="font-bold">{pickedUser.name}</span>
        </p>
      )}
      {hasUsers && users.map((user) => (
        <div
          className="mt-2 w-2/3 py-2 px-4 text-green-900 bg-transparent bg-blue-100 flex justify-between items-center rounded shadow font-semibold"
          key={user.id}>
          <span className="inline-block tracking-wide">{user.name}</span>
          <button onClick={() => onUserRemove(user.id)}
                  className="text-red-700 hover:bg-red-700 hover:text-white rounded-md font-semibold px-3 py-1 hover:shadow">x
          </button>
        </div>
      ))}
      {(hasUsers && users.length > 0) && (
        <div className="mt-4">
          <button onClick={onPickUser}
                  className="text-white hover:bg-green-600 bg-green-800 hover:text-white rounded-md font-semibold px-4 py-2 shadow-lg">Pick
            Random User
          </button>
        </div>
      )}
    </>
  );
};

export default UserList;
