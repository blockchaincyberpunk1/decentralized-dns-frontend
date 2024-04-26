import { atom } from 'recoil';

export const web3State = atom({
  key: 'web3State', // unique ID with respect to other atoms/selectors
  default: null, // default value (aka initial value)
});

export const contractState = atom({
  key: 'contractState',
  default: null,
});
