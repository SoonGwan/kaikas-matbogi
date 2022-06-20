import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import Caver from 'caver-js';
import { useConnectKaikas } from '../hooks/useConnectKaikas';
import { useFindNetwork } from '../hooks/useFindNetwork';
import { useKlaytnEvent } from '../hooks/useKlaytnEvent';
import { checkCookies, getCookie } from 'cookies-next';
import useFetchData from '../hooks/useFetchData';
import axios from 'axios';
import abi from './cpb.json';

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

  const { handleConnect, address, balance, handleDisconnect, nftData } =
    useConnectKaikas(caver, _user);

  const { network, handleFindNetwork } = useFindNetwork();

  useKlaytnEvent({ handleFindNetwork, handleConnect });

  const { data } = useFetchData();

  useEffect(() => {
    setKlayObj(window.klaytn);
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          handleConnect();
        }}
      >
        CONNET KAIKAS
      </button>
      <button onClick={handleDisconnect}>DISCONNECT</button>

      <div>info</div>
      <div>network : {network}</div>
      <div>key : {address}</div>
      <div>klay : {balance}개</div>
      {/*  */}

      <span> META DATA </span>
      {data && data.map((data: any) => data.name)}
      {/*  */}
      <div>
        <span>MY NFT DATA</span>

        {nftData &&
          nftData.map((data: any) => {
            const { description, name, image } = data;
            return (
              <div key={name} className='itemWrapper'>
                <img src={image} alt='image' className='item' />
                <div>{description}</div>
                <div>{name}</div>
              </div>
            );
          })}
      </div>

      <style jsx>{`
        .itemWrapper {
          border: 1px solid black;
          width: 300px;
        }

        .item {
          width: 300px;
        }
      `}</style>
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
