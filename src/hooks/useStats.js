import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { groupDataByKey } from '../world/utils';
import UTC from 'dayjs/plugin/utc.js';
dayjs.extend(UTC);

let pastStats = {};
let stats = {};
const fetchStats = async (fetcher, cb) => {
  const date = dayjs()
    .utc()
    .millisecond(0)
    .second(0)
    .minute(0)
    .hour(0);
  const sunday = date.day() === 0;
  const pastWeekMonday = date.day(sunday ? -13 : -6);
  const monday = date.day(sunday ? -6 : 1);

  const data = await fetcher(pastWeekMonday.toDate());
  groupDataByKey(data, stats, pastStats, monday);

  if (cb) {
    cb();
  }
};

const useStats = (fetcher) => {
  const [dataset, setDataset] = useState({
    pastStats,
    stats
  });

  useEffect(() => {
    fetchStats(fetcher, () => {
      setDataset({
        pastStats,
        stats
      });
    });
  }, []);

  return dataset;
};

export default useStats;
