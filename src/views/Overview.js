import { Alert, Col, Container, Row } from 'shards-react';
import dayjs from 'dayjs';
import Calendar from 'dayjs/plugin/calendar';
import PageTitle from '../components/common/PageTitle';
import SmallStats from '../components/common/SmallStats';
import { flatten, getAverage, getFeeDistribution, getStatPercentage, toNumber } from '../world/utils';
import useTokenPrice from '../hooks/useTokenPrice';
import useTokenBalance from '../hooks/useTokenBalance';
import {
  BURN_ADDRESS,
  LOCKED_MARKETING_TOKENS,
  MARKETING_ADDRESS,
  TOTAL_SUPPLY,
  WORLD_ETH_PAIR
} from '../world/constants';
import RecentTrades from '../components/overview/RecentTrades';
import useHolderFees from '../hooks/useHolderFees';
import FeeDistributionLineChart from '../components/overview/FeeDistributionLineChart';
import useStats from '../hooks/useStats';
import WorldData from '../world/WorldData';

dayjs.extend(Calendar);

const Overview = () => {
  const { usd: tokenPrice } = useTokenPrice();
  const marketingBalance = toNumber(useTokenBalance(MARKETING_ADDRESS));
  const uniLpBalance = toNumber(useTokenBalance(WORLD_ETH_PAIR.address));
  const burnedWorld = toNumber(useTokenBalance(BURN_ADDRESS));
  const holderFees = toNumber(useHolderFees());
  let {
    pastStats,
    stats
  } = useStats(async (startDate) => await WorldData.getTokenStats(startDate));

  const dailyFees = getFeeDistribution(flatten(stats.holderFees, holderFees), pastStats.holderFees);
  const pastDailyFees = getFeeDistribution(pastStats.holderFees);

  const dailyBurns = getFeeDistribution(flatten(stats.burned, burnedWorld), pastStats.burned);
  const pastDailyBurns = getFeeDistribution(pastStats.burned);

  const avgFee = getAverage(flatten(holderFees, stats.holderFees, pastStats.holderFees));
  const supply = (TOTAL_SUPPLY - marketingBalance - LOCKED_MARKETING_TOKENS - uniLpBalance);
  const share = (50_000 / supply) * 100;
  const avgDailyYield = share * avgFee;

  const pricePct = getStatPercentage(tokenPrice, stats.price);
  const burnedPct = getStatPercentage(burnedWorld, stats.burned);
  const feesPct = getStatPercentage(holderFees, stats.holderFees);
  const avgDailyYieldPct = getStatPercentage(avgDailyYield, stats.avgDailyYield);

  const currentStats = {};
  currentStats.price = flatten(stats.price, tokenPrice);
  currentStats.burned = flatten(stats.burned, burnedWorld);
  currentStats.holderFees = flatten(stats.holderFees, holderFees);
  currentStats.avgDailyYield = flatten(stats.avgDailyYield, avgDailyYield);

  const smallStats = [
    {
      label: 'Price',
      value: tokenPrice,
      prepend: '$',
      decimals: 4,
      percentage: pricePct,
      increase: pricePct >= 0,
      decrease: pricePct < 0,
      chartLabels: [null, null, null, null, null, null, null],
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          borderColor: 'rgb(2, 192, 118)',
          backgroundColor: 'rgba(1,176,117,0.1)',
          data: currentStats.price
        }
      ]
    },
    {
      label: 'Avg. Daily Yield per 50k WORLD',
      value: avgDailyYield,
      percentage: avgDailyYieldPct,
      increase: avgDailyYieldPct >= 0,
      decrease: avgDailyYieldPct < 0,
      chartLabels: [null, null, null, null, null, null, null],
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          borderColor: 'rgb(2, 192, 118)',
          backgroundColor: 'rgba(1,176,117,0.1)',
          data: currentStats.avgDailyYield
        }
      ]
    },
    {
      label: 'Distributed WORLD',
      value: holderFees,
      percentage: feesPct,
      increase: feesPct >= 0,
      decrease: feesPct < 0,
      chartLabels: [null, null, null, null, null, null, null],
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          borderColor: 'rgb(2, 192, 118)',
          backgroundColor: 'rgba(1,176,117,0.1)',
          data: currentStats.holderFees
        }
      ]
    },
    {
      label: 'Burned WORLD',
      value: burnedWorld,
      percentage: burnedPct,
      increase: burnedPct >= 0,
      decrease: burnedPct < 0,
      chartLabels: [null, null, null, null, null, null, null],
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          borderColor: 'rgb(2, 192, 118)',
          backgroundColor: 'rgba(1,176,117,0.1)',
          data: currentStats.burned
        }
      ]
    },
  ];

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="WORLD Token"
          subtitle="HOLD AND EARN"
        />
      </Row>

      <Row>
        {/*<Col className="mb-4" sm="6" lg="3" md="6">*/}
        {/*  <SmallStats*/}
        {/*    chartData={smallStats[1].datasets}*/}
        {/*    label={smallStats[1].label}*/}
        {/*    value={smallStats[1].value}*/}
        {/*    percentage={smallStats[1].percentage}*/}
        {/*    increase={smallStats[1].increase}*/}
        {/*    decrease={smallStats[1].decrease}*/}
        {/*    append={smallStats[1].append}*/}
        {/*    prepend={smallStats[1].prepend}*/}
        {/*    subAppend={smallStats[1].subAppend}*/}
        {/*    decimals={smallStats[1].decimals}*/}
        {/*  />*/}
        {/*</Col>*/}
        <Col className="mb-4" sm="12" md="12" lg="4">
          <SmallStats
            chartData={smallStats[0].datasets}
            label={smallStats[0].label}
            value={smallStats[0].value}
            percentage={smallStats[0].percentage}
            increase={smallStats[0].increase}
            decrease={smallStats[0].decrease}
            append={smallStats[0].append}
            prepend={smallStats[0].prepend}
            decimals={smallStats[0].decimals}
          />
        </Col>
        <Col className="mb-4" sm="12" md="12" lg="4">
          <SmallStats
            chartData={smallStats[2].datasets}
            label={smallStats[2].label}
            value={smallStats[2].value}
            percentage={smallStats[2].percentage}
            increase={smallStats[2].increase}
            decrease={smallStats[2].decrease}
            append={smallStats[2].append}
            prepend={smallStats[2].prepend}
            decimals={smallStats[2].decimals}
          />
        </Col>
        <Col className="mb-4" sm="12" md="12" lg="4">
          <SmallStats
            chartData={smallStats[3].datasets}
            label={smallStats[3].label}
            value={smallStats[3].value}
            percentage={smallStats[3].percentage}
            increase={smallStats[3].increase}
            decrease={smallStats[3].decrease}
            append={smallStats[3].append}
            prepend={smallStats[3].prepend}
            decimals={smallStats[3].decimals}
          />
        </Col>

      </Row>

      <Row>
        <Col lg="6" md="12" sm="12" className="mb-4">
          <FeeDistributionLineChart
            prependTitle='🌎'
            title='WORLD Daily Distribution'
            subject='Distribution'
            data={dailyFees}
            pastData={pastDailyFees}
            currentValue={dailyFees[dailyFees.length - 1]}
          />
        </Col>
        <Col lg="6" md="12" sm="12" className="mb-4">
          <FeeDistributionLineChart
            prependTitle='🔥'
            subject='Burn'
            title='WORLD Daily Burn'
            data={dailyBurns}
            pastData={pastDailyBurns}
            currentValue={dailyBurns[dailyBurns.length - 1]}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <RecentTrades/>
        </Col>
      </Row>

      <Alert theme="dark" className="gradient-bg text-white text-center rounded-border">
        Please note that most of the values shown are estimates only.
      </Alert>

    </Container>
  );
};

export default Overview;
