import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import Caver from 'caver-js';

declare global {
  interface Window {
    klaytn: any;
  }
}

const Home: NextPage = () => {
  const [isConnect, setIsConnect] = useState(false);
  const [user, setUser] = useState<string>('');
  const [network, setNetwork] = useState<string>('');
  const [klaytnObj, setKlayObj] = useState<any>();
  const [userBalance, setUserBalance] = useState('');

  const caver = new Caver(klaytnObj);

  useEffect(() => {
    setKlayObj(window.klaytn);
  }, []);

  useEffect(() => {
    // console.log(typeof window.klaytn !== 'undefined');
    // console.log(window.klaytn);
    // console.log(window.klaytn.networkVersion);

    console.log(caver);
    if (typeof window.klaytn !== 'undefined') {
      if (window.klaytn.networkVersion === 1001) {
        setNetwork('Baobab Test Network');
      } else if (window.klaytn.networkVersion === 8217) {
        setNetwork('Cypress Main Network');
      }
    }
  }, [caver]);

  const handleConnect = useCallback(async () => {
    // const accounts = await window.klaytn.enable();
    const caverAccounts = await caver.klay.getAccounts();

    setUser(caverAccounts[0]);

    const balance = Number(await caver.klay.getBalance(caverAccounts[0]));
    const convertBalance = caver.utils.convertFromPeb(balance, 'KLAY');
    setUserBalance(convertBalance);

    console.log(await caver.klay.getBalance(caverAccounts[0]));

    // const balance = await caver.klay.getBalance(user);
    // console.log(balance);
    console.log(await window.klaytn._kaikas.isUnlocked());
  }, [caver.klay]);

  const handleDisconnect = useCallback(async () => {
    const res = await caver.wallet.remove(user);

    console.log(res);
  }, [caver.wallet, user]);

  return (
    <div>
      <button onClick={handleConnect}>CONNET KAIKAS</button>
      <button onClick={handleDisconnect}>DISCONNECT</button>

      <div>info</div>
      <div>network : {network}</div>
      <div>key : {user}</div>
      <div>klay : {userBalance}개</div>
    </div>
  );
};

export default Home;
