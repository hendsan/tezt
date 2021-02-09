import { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import useBlock from './useBlock'
import { BigNumber } from "ethers";
import useWorldFarm from "./useWorldFarm";
import { ZERO_BN } from "../world/utils";

const useLpTokenBalance = () => {
  const [balance, setBalance] = useState(ZERO_BN);
  const block = useBlock();
  const worldFarm = useWorldFarm();

  const fetchBalance = useCallback(async () => {
    const balance = await worldFarm?.lpTokenBalance();
    setBalance(balance);
  }, [block]);

  useEffect(() => {
    fetchBalance();
  }, [block, setBalance]);

  return balance;
}

export default useLpTokenBalance;
