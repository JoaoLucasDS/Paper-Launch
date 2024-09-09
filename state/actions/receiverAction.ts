import { useSetRecoilState } from 'recoil';
import { receiverAtom, Receiver } from '../atoms/receiverAtom';

export const useReceiverActions = () => {
  const setReceiver = useSetRecoilState(receiverAtom);

  const updateReceiver = (newReceiver: Receiver) => {
    setReceiver(newReceiver);
  };

  const clearReceiver = () => {
    setReceiver(null);
  };

  // Add more actions as needed

  return { updateReceiver, clearReceiver };
};
