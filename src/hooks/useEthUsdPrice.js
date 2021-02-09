import {
  useEffect,
  useState
} from 'react';

const url = 'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum';
let cgPrice = 0;
let fetched = false;

const fetchEthUsdPrice = async () => {
  const response = await fetch(url);
  if (response.ok) {
    const json = await response.json();
    cgPrice = json.ethereum.usd;
  }
};
setInterval(fetchEthUsdPrice, 60000);

const useEthUsdPrice = () => {
  const [price, setEthUsdPrice] = useState(cgPrice);

  useEffect(() => {
    if (!fetched) {
      fetchEthUsdPrice();
      fetched = true;
    }

    if (cgPrice !== price) {
      setEthUsdPrice(cgPrice);
    }
  });

  return price;
};

export default useEthUsdPrice;
