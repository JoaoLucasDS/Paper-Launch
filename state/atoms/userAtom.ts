import { atom } from 'recoil';
export interface User {
  id: string;
  name: string;
  email: string;
  publicKey: string;
  privateKey: string;
  // add more user fields as needed
}

export const userAtom = atom<User | null>({
  key: 'userAtom',
  default: null, // Default state can be null or an initial user object
});
