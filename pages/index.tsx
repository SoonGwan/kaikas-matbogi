import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Caver from 'caver-js';
import { useConnectKaikas } from '../hooks/useConnectKaikas';
import { useFindNetwork } from '../hooks/useFindNetwork';
import { useKlaytnEvent } from '../hooks/useKlaytnEvent';
import { checkCookies, getCookie } from 'cookies-next';
import useFetchData from '../hooks/useFetchData';

declare global {
  interface Window {
    klaytn: any;
  }
}

type Props = {
  _user: string;
};

const Home: NextPage<Props> = ({ _user }) => {
  const [klaytnObj, setKlayObj] = useState<any>();

  const caver = new Caver(klaytnObj);

  const { handleConnect, address, balance, handleDisconnect } =
    useConnectKaikas(caver, _user);

  const { network, handleFindNetwork } = useFindNetwork();

  useKlaytnEvent({ handleFindNetwork, handleConnect });

  const { data } = useFetchData();

  useEffect(() => {
    setKlayObj(window.klaytn);
  }, []);

  return (
    <div>
      <button onClick={handleConnect}>CONNET KAIKAS</button>
      <button onClick={handleDisconnect}>DISCONNECT</button>

      <div>info</div>
      <div>network : {network}</div>
      <div>key : {address}</div>
      <div>klay : {balance}개</div>

      {data && data.map((data: any) => data.name)}
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({ req, res }: any) => {
  if (checkCookies('_key', { req, res })) {
    const cookie = getCookie('_key', { req, res });
    console.log(cookie);

    return { props: { _user: cookie } };
  }

  return { props: { _user: null } };
};
