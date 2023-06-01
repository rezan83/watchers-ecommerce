import { SimpleGrid } from '@chakra-ui/react';
import ProfileCard from 'components/ProfileCard';
import { useEffect } from 'react';
import useAuthStore from 'store/authStore';
import useUsersStore from 'store/usersStore';

const Users = () => {
  const authUser = useAuthStore(state => state.authUser);
  const fetchStoreUsers = useUsersStore(state => state.fetchStoreUsers);
  const users = useUsersStore(state => state.users);

  useEffect(() => {
    fetchStoreUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SimpleGrid p="1rem" columns={[1, 2, 2, 3]} spacing={5}>
      {users.map(user => {
        if (authUser?.email !== user.email) {
          return <ProfileCard key={user._id} user={user} />;
        }
      })}
    </SimpleGrid>
  );
};

export default Users;
