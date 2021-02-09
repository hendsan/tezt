import { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import useBlock from './useBlock'
import { BigNumber } from "ethers";
import useWorldFarm from "./useWorldFarm";

const useLpTokenAllowance = () => {
  const [allowance, setAllowance] = useState(BigNumber.from(0));
  const {
    account,
    ethereum,
  } = useWallet();
  const block = useBlock();
  const worldFarm = useWorldFarm();

  const fetchAllowance = useCallback(async () => {
    const allowance = await worldFarm?.lpTokenAllowance();
    setAllowance(allowance);
  }, [worldFarm]);

  useEffect(() => {
    fetchAllowance();
  }, [account, ethereum, block]);

  return {
    allowance: allowance || BigNumber.from(0),
    setAllowance
  };
}

export default useLpTokenAllowance;
