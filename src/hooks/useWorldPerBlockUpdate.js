import { useCallback, useEffect, useState } from 'react'
import WorldFarm from "../world/WorldFarm";
import { ZERO_BN } from "../world/utils";
import useBlock from "./useBlock";

const useWorldPerBlockUpdate = () => {
  const [time, setTime] = useState(ZERO_BN);
  const block = useBlock();

  const fetchUpdateTime = useCallback(async () => {
    const updateTime = await WorldFarm.read.getWorldPerBlockUpdateTime()
    setTime(updateTime);
  }, [block]);

  useEffect(() => {
    fetchUpdateTime();
  }, [block, setTime]);

  return time;
}

export default useWorldPerBlockUpdate;
