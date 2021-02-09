import React from 'react';
import { Card, CardBody, CardHeader, Badge, Fade } from 'shards-react';
import useRecentTrades from '../../hooks/useRecentTrades';
import { shortenAddress } from '../../world/utils';

const RecentTrades = () => {
  const trades = useRecentTrades();

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Recent Trades</h6>
      </CardHeader>
      <CardBody className="p-0 pb-3" style={{overflowX: 'auto'}}>
        <table className="table mb-0">
          <thead className="bg-dark">
          <tr>
            <th scope="col" className="border-0">
              Type
            </th>
            <th scope="col" className="border-0">
              Time
            </th>
            <th scope="col" className="border-0">
              Price (ETH)
            </th>
            <th scope="col" className="border-0">
              Amount (WORLD)
            </th>
            <th scope="col" className="border-0">
              Total (ETH)
            </th>
            <th scope="col" className="border-0">
              Tx
            </th>
          </tr>
          </thead>
          <tbody>
          {trades.map((trade, i) => (
            <tr key={i} className="normal-font-weight">
              <td>{trade.buy ? <Badge theme='success'>Buy</Badge> :
                <Badge theme='secondary'>Sell</Badge>}</td>
              <td>{trade.time}</td>
              <td>{trade.priceEth.toFixed(5)}</td>
              <td>{trade.amount.toFixed(2)}</td>
              <td>{trade.totalEth.toFixed(5)}</td>
              <td>
                <a href={`https://etherscan.com/tx/${trade.tx}`} target="_blank" rel="noopener noreferrer">
                  {shortenAddress(trade.tx)}
                </a></td>
            </tr>
          ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default RecentTrades;
