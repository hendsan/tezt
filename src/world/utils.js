import {
  BigNumber, ethers,
  utils
} from 'ethers';
import dayjs from 'dayjs';

export const ZERO_BN = BigNumber.from(0);

export const displayAmount = (amount, decimals) => {
  if (typeof amount === 'object') {
    try {
      amount = utils.formatEther(amount);
    } catch (e) {
    }
  }

  if (!isNaN(amount) && amount !== Infinity) {
    return +toFixedString(amount, decimals || 2);
  }

  return '0';
};

function toFixedString(num, fixed) {
  const re = new RegExp(`^-?\\d+(?:\.\\d{0,${fixed || -1}})?`);
  return num.toString()
    .match(re)[0];
}

export const formatTime = (time) => {
  if (!time) {
    return '';
  }
  return `${time.format('MMM D, YYYY')
    .toString()} @ ${time.format('hh:mm A')
    .toString()} (UTC${time.format('Z')
    .toString()})`;
};

// export const formatNumber = (num, useApprox) => {
//   if (!num || num === Infinity) {
//     return '0';
//   }
//   if (useApprox) {
//     return approx(num, {min10k: true});
//   }
//   return +parseFloat(num).toFixed(4);
// };

export const shortenAddress = (account, length = 5) => {
  if (!account) {
    return '';
  }
  return `${account.substr(0, length)}...${account.substr(account.length - (length - 1), account.length - 1)}`;
};

export const getStatPercentage = (currentValue, chartData) => {
  if (!chartData || !currentValue) {
    return 0.00;
  }

  const lastValue = chartData[chartData.length - 1];
  return ((currentValue / lastValue) - 1) * 100;
};

export const getAverage = (arr) => {
  if (!arr) {
    return 0;
  }
  return arr.filter((n) => n)
    .reduce((p, c) => p + c, 0) / arr.length;
};

export const toNumber = (bn) => +ethers.utils.formatEther(bn);

export const getFeeDistribution = (fees, pastFees) => {
  if (!fees) {
    return [];
  }

  const pastFee = pastFees?.length ? pastFees[pastFees.length - 1] : 0;
  const distributed = [];
  let a = pastFee;
  let b = 0;

  fees.forEach((fee) => {
    b = a - fee;
    a = fee;
    distributed.push(Math.abs(b));
  });

  return distributed;
};

export const groupDataByKey = (data, stats, pastStats, monday) => {
  data.forEach((d) => {
    const date = dayjs.unix(d.timestamp.seconds)
      .utc();
    const obj = date.isBefore(monday) ? pastStats : stats;

    Object.keys(d)
      .forEach((k) => {
        if (!obj[k]) {
          obj[k] = Array.from(new Array(7), () => 0);
        }

        let idx = date.day() - 1;
        if (idx < 0) {
          idx = 6; // sunday
        }

        obj[k][idx] = d[k];
      });
  });

  Object.keys(stats)
    .forEach((k) => {
      const arr = stats[k];
      let idx;
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] > 0) {
          idx = i;
          break;
        }
      }

      stats[k] = stats[k].slice(0, idx + 1);
    });

};

export const flatten = (...elements) => {
  const arr = [];
  elements.forEach((el) => {
    if (Array.isArray(el)) {
      el.forEach((e) => arr.push(e));
      return;
    }
    if (!isNaN(el)) {
      arr.push(el);
    }
  });
  return arr;
};
