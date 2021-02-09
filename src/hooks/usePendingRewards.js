import { useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import useBlock from './useBlock'
import useWorldFarm from "./useWorldFarm";
import { BigNumber } from "ethers";

const usePendingRewards = () => {
  const [rewards, setRewards] = useState(BigNumber.from(0));
  const {account, ethereum} = useWallet();
  const worldFarm = useWorldFarm();
  const block = useBlock();

  const fetchRewards = async () => {
    if (!account) {
      setRewards(BigNumber.from(0));
      return;
    }
    const rewards = await worldFarm?.pendingRewards();
    setRewards(rewards);
  };

  useEffect(() => {
    fetchRewards();
  }, [account, ethereum, block, worldFarm]);

  return rewards;
}

export default usePendingRewards;
