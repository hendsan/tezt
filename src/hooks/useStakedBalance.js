import { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import useBlock from './useBlock'
import useWorldFarm from "./useWorldFarm";
import { ZERO_BN } from "../world/utils";

const useStakedBalance = () => {
  const [balance, setBalance] = useState(ZERO_BN);
  const {account, ethereum} = useWallet();
  const worldFarm = useWorldFarm();
  const block = useBlock();

  const fetchBalance = async () => {
    if (!account || !worldFarm) {
      setBalance(ZERO_BN);
      return;
    }
    const balance = await worldFarm?.stakedBalance();
    setBalance(balance);
  };

  useEffect(() => {
    fetchBalance();
  }, [account, worldFarm, ethereum, block]);

  return balance;
}

export default useStakedBalance;
