import { useEffect } from 'react';

type Props = {
  handleFindNetwork: () => void;
  handleConnect: () => void;
};

export const useKlaytnEvent = ({ handleFindNetwork, handleConnect }: Props) => {
  useEffect(() => {
    window.klaytn.on('accountsChanged', () => {
      handleFindNetwork();
      handleConnect();
    });
  }, [handleConnect, handleFindNetwork]);

  useEffect(() => {
    window.klaytn.on('networkChanged', () => {
      handleFindNetwork();
      handleConnect();
    });
  }, [handleConnect, handleFindNetwork]);
};
