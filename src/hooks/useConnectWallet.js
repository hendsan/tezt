import { useContext } from 'react';
import { Context } from '../contexts/ConnectWalletContext';

const useConnectWallet = () => {
  return useContext(Context);
};

export default useConnectWallet;
