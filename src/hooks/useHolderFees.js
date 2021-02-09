import { useCallback, useEffect, useState } from 'react';

import useBlock from './useBlock';
import { BigNumber } from 'ethers';
import WorldToken from '../world/WorldToken';

const useHolderFees = () => {
  const [fees, setFees] = useState(BigNumber.from(0));
  const block = useBlock();

  const fetchBalance = useCallback(async () => {
    const holderFees = await WorldToken.read.totalHolderFees();
    setFees(holderFees);
  }, [block]);

  useEffect(() => {
    fetchBalance();
  }, [block]);

  return fees;
}

export default useHolderFees;
