import ProfileCard from 'components/ProfileCard';
import { useEffect } from 'react';
import useUsersStore from 'store/usersStore';

const Users = () => {
  const fetchStoreUsers = useUsersStore(state => state.fetchStoreUsers);
  const users = useUsersStore(state => state.users);

  useEffect(() => {
    fetchStoreUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
        {users.map(user => (
          <ProfileCard key={user._id} user={user} />
        ))}
    </div>
  );
};

export default Users;
