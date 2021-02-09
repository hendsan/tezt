import {
  useEffect,
  useState,
  useCallback
} from 'react';
import { useWallet } from 'use-wallet';
import { utils } from 'ethers';
import useBlock from './useBlock';
import WorldToken from '../world/WorldToken';
import {
  LP_TOKEN_CONTRACT,
  WETH_CONTRACT
} from '../world/constants';
import useEthUsdPrice from './useEthUsdPrice';

const useTokenPrice = () => {
  const [price, setTokenPrice] = useState({
    eth: 0,
    usd: 0
  });
  const ethUsdPrice = useEthUsdPrice();
  const block = useBlock();

  const fetchTokenPrice = useCallback(async () => {
    const lpWethAmount = await WETH_CONTRACT.balanceOf(LP_TOKEN_CONTRACT.address);
    const lpTokenAmount = await WorldToken.balanceOf(LP_TOKEN_CONTRACT.address);

    // WITH UNISWAP FEES
    // const oneWorldToken = utils.parseEther('1');
    // const deductedInputAmount = oneWorldToken.mul(997);
    // const a = deductedInputAmount.mul(lpWethAmount);
    // const b = lpTokenAmount.mul(1000).add(deductedInputAmount);
    // const tokenPriceInWeth = a.div(b).toString() / 1e18;

    const tokenPriceInWeth = lpWethAmount.toString() / lpTokenAmount.toString();

    setTokenPrice({
      eth: tokenPriceInWeth,
      usd: tokenPriceInWeth * ethUsdPrice,
    });
  }, [block, ethUsdPrice]);

  useEffect(() => {
    fetchTokenPrice();
  }, [block, ethUsdPrice, setTokenPrice]);

  return price;
};

export default useTokenPrice;
