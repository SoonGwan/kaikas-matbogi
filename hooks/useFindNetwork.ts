import { useEffect, useState, useCallback } from 'react';

export const useFindNetwork = () => {
  const [network, setNetwork] = useState('');

  const handleFindNetwork = useCallback(() => {
    if (typeof window.klaytn !== 'undefined') {
      if (window.klaytn.networkVersion === 1001) {
        setNetwork('Baobab Test Network');
      } else if (window.klaytn.networkVersion === 8217) {
        setNetwork('Cypress Main Network');
      }
    }
  }, []);

  useEffect(() => {
    handleFindNetwork();
  }, [handleFindNetwork]);

  return { network, handleFindNetwork };
};
