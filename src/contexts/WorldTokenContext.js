import React,
{
  createContext,
  useEffect,
  useState
} from 'react';

import { useWallet } from 'use-wallet';
import * as ethers from 'ethers';
import WorldToken from '../world/WorldToken';

export const Context = createContext({
  worldToken: undefined,
});

const WorldTokenContext = ({ children }) => {
  const { account, ethereum } = useWallet();
  const [worldToken, setWorldToken] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        setWorldToken(new WorldToken(provider.getSigner()));
      }
    };

    init();
  }, [account, ethereum]);

  return <Context.Provider value={{ worldToken }}>{children}</Context.Provider>;
};

export default WorldTokenContext;
