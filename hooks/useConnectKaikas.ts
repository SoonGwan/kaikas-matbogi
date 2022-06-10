import { useCallback, useState } from 'react';
import { useHealthCheck } from './useHealthCheck';

export const useConnectKaikas = (caver: any) => {
  const { isUnlocked } = useHealthCheck();
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  const handleConnect = useCallback(async () => {
    if (isUnlocked) {
      const result = await caver.klay.getAccounts();

      const balance = Number(await caver.klay.getBalance(result[0]));
      const convertBalance = caver.utils.convertFromPeb(balance, 'KLAY');

      setBalance(convertBalance);
      setAddress(result[0]);
    }
  }, [caver.klay, caver.utils, isUnlocked]);

  return { handleConnect, address, balance };
};