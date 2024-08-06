import { useSetRecoilState } from 'recoil';
import { userAtom, User } from '../atoms/userAtom';

export const useUserActions = () => {
  const setUser = useSetRecoilState(userAtom);

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  const clearUser = () => {
    setUser(null);
  };

  // Add more actions as needed

  return { updateUser, clearUser };
};
