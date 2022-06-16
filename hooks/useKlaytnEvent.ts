import { useEffect } from 'react';

type Props = {
  handleFindNetwork: () => void;
  handleConnect: () => void;
  fetchMyNft: () => void;
};

export const useKlaytnEvent = ({
  handleFindNetwork,
  handleConnect,
  fetchMyNft,
}: Props) => {
  useEffect(() => {
    window.klaytn.on('accountsChanged', () => {
      handleFindNetwork();
      handleConnect();
      // fetchMyNft();
    });
  }, [fetchMyNft, handleConnect, handleFindNetwork]);

  useEffect(() => {
    window.klaytn.on('networkChanged', () => {
      handleFindNetwork();
      handleConnect();
      // fetchMyNft();
    });
  }, [fetchMyNft, handleConnect, handleFindNetwork]);
};
