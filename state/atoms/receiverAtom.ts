import { atom } from 'recoil';
export interface Receiver {
  publicKey: string;
}

export const receiverAtom = atom<Receiver | null>({
  key: 'receiverAtom',
  default: null, // Default state can be null or an initial user object
});
