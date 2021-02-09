import { useCallback, useEffect, useState } from 'react';

import useBlock from './useBlock';
import { BigNumber } from 'ethers';
import WorldToken from '../world/WorldToken';

const useTokenBalance = (address) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const block = useBlock();

  const fetchBalance = useCallback(async () => {
    if (address) {
      const balance = await WorldToken.balanceOf(address);
      setBalance(balance);
    }
  }, [block, address]);

  useEffect(() => {
    fetchBalance();
  }, [block, address]);

  return balance;
};

export default useTokenBalance;
