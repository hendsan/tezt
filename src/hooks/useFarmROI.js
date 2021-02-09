import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useBlock from './useBlock';
import useWorldPerBlock from './useWorldPerBlock';
import WorldFarm from '../world/WorldFarm';
import useEthUsdPrice from './useEthUsdPrice';

const useFarmROI = () => {
  const [roi, setROI] = useState({
    roiPerHour: 0,
    roiPerDay: 0,
    roiPerMonth: 0,
    roiPerYear: 0,
    rewardPerThousand: 0,
    totalStakedLP: BigNumber.from(0),
    totalValueLocked: 0,
    worldPerBlock: 0
  });
  const block = useBlock();

  let {worldPerBlock, worldPerBlockUpdated} = useWorldPerBlock(block);
  worldPerBlock = worldPerBlock.toString() / 1e18;

  const ethUsdPrice = useEthUsdPrice();
  const fetchFarmingAPY = useCallback(async () => {
    const roi = await WorldFarm.roi(worldPerBlock, ethUsdPrice);
    setROI({
      ...roi,
      worldPerBlock,
      worldPerBlockUpdated
    });
  }, [block]);

  useEffect(() => {
    fetchFarmingAPY();
  }, [block, setROI]);

  return roi;
};

export default useFarmROI;
