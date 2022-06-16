// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import abi from './cpb.json';
import Caver from 'caver-js';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req.body;

  console.log('req.body', body);
  const caver = new Caver('https://api.baobab.klaytn.net:8651/');

  const contract = new caver.klay.Contract(
    abi as any,
    process.env.NEXT_PUBLIC_ADDRESS
  );

  const balance = await contract.methods.balanceOf(body.address).call();
  console.log(balance);

  let promises = [];
  let info = [] as any;

  for (let i = 0; i < balance; i += 1) {
    const id = await contract.methods
      .tokenOfOwnerByIndex(body.address, i)
      .call();
    const uri = await contract.methods.tokenURI(id).call();
    console.log(uri);

    promises.push(
      axios.get(uri).then((response) => {
        info.push(response.data);
      })
    );
  }

  Promise.all(promises).then(() => res.status(200).json({ data: info }));
};

export default handler;
