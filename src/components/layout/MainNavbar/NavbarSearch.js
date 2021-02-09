import { useWallet } from 'use-wallet';
import { Badge, Fade, Navbar } from 'shards-react';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { displayAmount } from '../../../world/utils';
import useTokenPrice from '../../../hooks/useTokenPrice';
import Value from '../../common/Value';
import React, { useState } from 'react';

export default () => {
  const { account } = useWallet();
  const balance = useTokenBalance(account);

  return (
    <div className="d-none d-md-flex align-items-center mr-4">
      <Fade in={account}>
          <Badge theme="success" className="mr-2">
            <Value value={(balance)}/> WORLD
          </Badge>
        </Fade>
        <Fade in={account} className="d-none d-lg-block">
          <Badge  theme="secondary">{account}</Badge>
        </Fade>
    </div>
  );
}
