import * as React from 'react';

type AddUserProps = {
  onUserAdd: (name: string) => void;
}

const AddUser = (props: AddUserProps): JSX.Element => {
  const [user, setUser] = React.useState<string>('');
  const handleAddUser = () => {
    if (!!props.onUserAdd) {
      props.onUserAdd(user);
    }
    setUser('');
  };
  const handleNameInputChange = (name: string) => {
    // todo:
    // this can be expanded further to check if the user name already exists,
    // but in order for that to work properly, we would need to add a debounce
    // and do the check if the user has stopped typing for a given amount of time
    setUser(name);
  };
  const btnDisabled = user.trim().length < 1;
  return (
    <form action="" onSubmit={ev => {
      ev.preventDefault();
      if (!btnDisabled) {
        handleAddUser();
      }
    }}>
      <div className="pb-4">
        <label htmlFor="name" className="text-xl font-semibold text-gray-700 block">Add New User</label>
        <input type="text"
               name="name"
               id="name"
               data-testid="add-user-input"
               required
               value={user}
               onChange={ev => handleNameInputChange(ev.target.value)}
               className="shadow appearance-none border rounded w-full mt-2 p-2 text-gray-900 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
               placeholder="John Doe"/>
      </div>
      <div className="pb-4">
        <button
          data-testid="add-button"
          onClick={handleAddUser}
          disabled={btnDisabled}
          className={`${btnDisabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow`}
          type="button">Add
        </button>
      </div>

    </form>
  );
};

export default AddUser;
