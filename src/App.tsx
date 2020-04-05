import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './styles/tailwind.css';
import { UserEntry } from './users/types';
import AddUser from './users/AddUser';
import UserList from './users/UserList';

function App() {
  const [users, setUsers] = React.useState<UserEntry[]>([]);
  const handleUserAdd = (name: string) => setUsers([
    ...users,
    {id: uuidv4() , name}
  ]);

  const handleUserRemove = (uid: string) => setUsers(users.filter(({ id }) => id !== uid));

  return (
    <div className="container mx-auto min-h-32 bg-gray-100">
      <div className="bg-white w-full max-w-screen-lg mt-4 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-900 border-b-2 pb-2 text-center">Manage Users</h1>
        <div className="flex mt-8">
          <div className="w-2/3">
            <UserList users={users} onUserRemove={handleUserRemove}/>
          </div>
          <div className="w-1/3 pl-2">
            <AddUser onUserAdd={handleUserAdd}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
