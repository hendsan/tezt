import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { displayAmount } from '../../world/utils';

const Value = ({
  value,
  decimals
}) => {
  const [start, updateStart] = useState(0);
  const [end, updateEnd] = useState(0);
  const formattedVal = displayAmount(value, decimals);

  useEffect(() => {
    if (typeof formattedVal === 'number') {
      updateStart(end);
      updateEnd(formattedVal);
    }
  }, [formattedVal]);

  return typeof formattedVal == 'string' ? (
    formattedVal
  ) : (
    <CountUp
      start={start}
      end={end}
      decimals={
        decimals !== undefined ? decimals : end < 0 ? 4 : end > 1e5 ? 0 : 2
      }
      duration={1}
      separator=","
    />
  );
};

export default Value;
