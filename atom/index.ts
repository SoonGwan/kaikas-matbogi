import { atom } from 'recoil';

const _addressAtom = atom({
  key: 'addressState',
  default: '',
});

export { _addressAtom };
