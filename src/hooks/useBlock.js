import {
  useEffect,
  useState
} from 'react';
import { DEFAULT_PROVIDER } from '../world/constants';

let currentBlockNumber;
let fetched = false;
const fetchBlockNumber = async () => {
  const latestBlockNumber = await DEFAULT_PROVIDER.getBlockNumber();
  if (currentBlockNumber !== latestBlockNumber) {
    currentBlockNumber = latestBlockNumber;
  }
  console.log('Block number:', latestBlockNumber);
};
setInterval(fetchBlockNumber, 15000);

const useBlock = () => {
  const [block, setBlock] = useState(currentBlockNumber);

  useEffect(() => {
    if (!fetched) {
      fetchBlockNumber();
      fetched = true;
    }

    const interval = setInterval(async () => {
      if (block !== currentBlockNumber) {
        setBlock(currentBlockNumber);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return block;
};

export default useBlock;
