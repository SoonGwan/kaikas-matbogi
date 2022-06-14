// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Caver from 'caver-js';
import abi from './cpb.json';

type Data = {
  data: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const caver = new Caver('https://api.baobab.klaytn.net:8651/');

  const contract = new caver.klay.Contract(
    abi as any,
    process.env.NEXT_PUBLIC_ADDRESS
  );

  const totalSupply = await contract.methods.totalSupply().call();

  let info = [] as any;
  let promises = [];

  for (let i = 1; i <= totalSupply; i++) {
    const uri = await contract.methods.tokenURI(i).call();
    promises.push(
      axios.get(uri).then((response) => {
        info.push(response.data);
      })
    );
  }

  Promise.all(promises).then(() => res.status(200).json({ data: info }));
};

export default handler;
