import { useEffect, useCallback, useState } from 'react';

export const useHealthCheck = () => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  const handleIsUnlockedWallet = useCallback(async () => {
    return setIsUnlocked(await window.klaytn._kaikas.isUnlocked());
  }, []);

  useEffect(() => {
    handleIsUnlockedWallet();
  }, [handleIsUnlockedWallet]);

  return { isUnlocked };
};
