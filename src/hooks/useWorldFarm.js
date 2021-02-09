import React, { useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import * as ethers from 'ethers';
import WorldFarm from '../world/WorldFarm';

const useWorldFarm = () => {
  const { account, ethereum } = useWallet();
  const [worldFarm, setWorldFarm] = useState(null);

  const init = async () =>{
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      setWorldFarm(new WorldFarm(provider.getSigner()));
      return;
    }
    setWorldFarm(null);
  };

  useEffect(() => {
    init();
  }, [account, ethereum]);

  return worldFarm;
};

export default useWorldFarm;
