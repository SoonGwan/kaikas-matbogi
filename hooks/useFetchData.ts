import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';

const useFetchData = () => {
  const [data, setData] = useState<any>();

  const fetchContractData = useCallback(async () => {
    const {
      data: { data },
    } = await axios.get('api');

    setData(data);
  }, []);

  useEffect(() => {
    fetchContractData();
  }, [fetchContractData]);

  return { data };
};

export default useFetchData;
// const CPBContract = new caver.klay.Contract(abi as any, CONTRACT_ADDRESS);
// console.log(CPBContract);

// const { signature } = CPBContract._jsonInterface[44] as any;

// console.log(signature);

// const handleContract = useCallback(async () => {
//   const res = await CPBContract.methods.tokenURI(1).call();
//   const name = await CPBContract.methods.name().call();
//   const symbol = await CPBContract.methods.symbol().call();
//   const totalSupply = await CPBContract.methods.totalSupply().call();
// const balance = await CPBContract.methods
//   .balanceOf(CONTRACT_ADDRESS)
//   .call();
//   const ownerof = await CPBContract.methods.ownerOf(2).call();
// const test = await axios.get(res);
//   const data = await axios.post('api', { body: res });
//   console.log('data:', data);
// console.log('test', test);
// console.log(res);
// console.log(name);
// console.log(symbol);
// console.log(totalSupply);
// console.log('ownerof', ownerof);
// console.log('balance', balance);
// }, [CPBContract.methods]);
