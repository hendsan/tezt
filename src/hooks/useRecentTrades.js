import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { uniClient, WORLD_ETH_PAIR } from '../world/constants';
import { gql } from '@apollo/client';
import useBlock from './useBlock';

dayjs.extend(RelativeTime);

let fetching = false;
let trades = [];
const fetchTrades = async (cb) => {
  const { data: { swaps } } = await uniClient.query({
    query: gql`
    query {
      swaps(first: 10, where: { pair: "0x6afb3d434ac3d0c92e5397895f17f1f9af22a6c2" } orderBy: timestamp, orderDirection: desc) {
        transaction {
          id
          timestamp
        }
        id
        pair {
          token0 {
            id
            symbol
          }
          token1 {
            id
            symbol
          }
        }
        amount0In
        amount0Out
        amount1In
        amount1Out
        amountUSD
        to
      }
    }
  `
  });

  trades = swaps.map((data) => {
    const token1Weth = data.pair.token1.symbol === 'WETH';
    const buy = token1Weth ? +data.amount1In : +data.amount0In;
    const time = dayjs(+data.transaction.timestamp * 1000)
      .fromNow();

    let amount;
    if (buy) {
      amount = token1Weth ? +data.amount0Out : +data.amount1Out;
    } else {
      amount = token1Weth ? +data.amount0In : +data.amount1In;
    }

    let totalEth;
    if (buy) {
      totalEth = token1Weth ? +data.amount1In : +data.amount0In;
    } else {
      totalEth = token1Weth ? +data.amount1Out : +data.amount0Out;
    }

    return {
      tx: data.transaction.id,
      priceEth: totalEth / amount,
      buy,
      amount,
      time,
      totalEth
    };
  });

  if (cb) {
    cb();
  }
};

const useRecentTrades = () => {
  const [recentTrades, setRecentTrades] = useState([]);
  const block = useBlock();

  useEffect(() => {
    if (fetching) {
      return;
    }

    fetchTrades(() => {
      setRecentTrades(trades);
    });
    fetching = false;
  }, [block]);

  return recentTrades;
};

export default useRecentTrades;
