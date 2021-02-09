import { useCallback, useEffect, useState } from 'react';
import WorldFarm from '../world/WorldFarm';
import { ZERO_BN } from '../world/utils';

const useWorldPerBlock = (block) => {
  const [worldPerBlock, setWorldPerBlock] = useState({
    worldPerBlock: ZERO_BN,
    worldPerBlockUpdated: false
  });

  const fetchWorldPerBlock = useCallback(async () => {
    const [worldPerBlock, update] = await WorldFarm.read.getWorldPerBlock();
    setWorldPerBlock({
      worldPerBlock,
      worldPerBlockUpdated: update
    });
  }, [block]);

  useEffect(() => {
    fetchWorldPerBlock();
  }, [block, setWorldPerBlock]);

  return worldPerBlock;
}

export default useWorldPerBlock;
