import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Caver from 'caver-js';
import { useConnectKaikas } from '../hooks/useConnectKaikas';
import { useFindNetwork } from '../hooks/useFindNetwork';
import { useKlaytnEvent } from '../hooks/useKlaytnEvent';

declare global {
  interface Window {
    klaytn: any;
  }
}

const Home: NextPage = () => {
  const [klaytnObj, setKlayObj] = useState<any>();

  const caver = new Caver(klaytnObj);

  const { handleConnect, address, balance } = useConnectKaikas(caver);

  const { network, handleFindNetwork } = useFindNetwork();

  useKlaytnEvent({ handleFindNetwork, handleConnect });

  useEffect(() => {
    setKlayObj(window.klaytn);
  }, []);

  return (
    <div>
      <button onClick={handleConnect}>CONNET KAIKAS</button>

      <div>info</div>
      <div>network : {network}</div>
      <div>key : {address}</div>
      <div>klay : {balance}개</div>
    </div>
  );
};

export default Home;
