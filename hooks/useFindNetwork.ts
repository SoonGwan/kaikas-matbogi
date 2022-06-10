import { useEffect, useState } from 'react';

export const useFindNetwork = () => {
  const [network, setNetwork] = useState('');

  useEffect(() => {
    if (typeof window.klaytn !== 'undefined') {
      if (window.klaytn.networkVersion === 1001) {
        setNetwork('Baobab Test Network');
      } else if (window.klaytn.networkVersion === 8217) {
        setNetwork('Cypress Main Network');
      }
    }
  }, []);

  return { network };
};
