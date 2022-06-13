import { useRecoilState } from 'recoil';
import { AbstractCaver } from 'caver-js';
import { useCallback, useState } from 'react';
import { useHealthCheck } from './useHealthCheck';
import { removeCookies, setCookies } from 'cookies-next';
import { _addressAtom } from '../atom';

export const useConnectKaikas = (caver: AbstractCaver, _user: string) => {
  const { isUnlocked } = useHealthCheck();
  const [address, setAddress] = useState(_user);
  const [balance, setBalance] = useState('');
  const [_address, _setAddress] = useRecoilState(_addressAtom);

  const handleConnect = useCallback(async () => {
    window.klaytn.enable().then(async () => {
      if (isUnlocked) {
        const result = await caver.klay.getAccounts();
        setCookies('_key', result[0]);
        setAddress(result[0]);
        _setAddress(result[0]);

        const balance = Number(await caver.klay.getBalance(result[0]));
        const convertBalance = caver.utils.convertFromPeb(balance, 'KLAY');
        setBalance(convertBalance);
      }
    });
  }, [_setAddress, caver.klay, caver.utils, isUnlocked]);

  const handleDisconnect = useCallback(() => {
    removeCookies('_key');
    setAddress('');
  }, []);

  return { handleConnect, address, balance, handleDisconnect };
};
