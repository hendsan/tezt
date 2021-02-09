import { useState } from 'react';
import { Alert, Badge, Button, CardBody, Col, Container, Row } from 'shards-react';

import Countdown from 'react-countdown';
import dayjs from 'dayjs';
import Calendar from 'dayjs/plugin/calendar';
import PageTitle from '../components/common/PageTitle';
import SmallStats from '../components/common/SmallStats';
import Stake from '../components/farm/Stake';
import StakingInfo from '../components/farm/StakingInfo';
import { flatten, getStatPercentage, toNumber } from '../world/utils';
import StakingActions from '../components/farm/StakingActions';
import FarmLineChart from '../components/farm/FarmLineChart';
import useFarmROI from '../hooks/useFarmROI';
import useStakedBalance from '../hooks/useStakedBalance';
import useTokenPrice from '../hooks/useTokenPrice';
import useWorldPerBlockUpdate from '../hooks/useWorldPerBlockUpdate';
import useTokenBalance from '../hooks/useTokenBalance';
import { CHAIN_ID, CONTRACT_ADDRESSES } from '../world/constants';
import useStats from '../hooks/useStats';
import WorldData from '../world/WorldData';
import { useWallet } from 'use-wallet';
import useConnectWallet from '../hooks/useConnectWallet';

dayjs.extend(Calendar);

const Farm = () => {
  const { account } = useWallet();
  const { open } = useConnectWallet();
  const [calendarRewardUpdate, setCalendarRewardUpdate] = useState(false);
  const {
    roiPerYear,
    rewardPerThousand,
    worldPerBlock,
    worldPerBlockUpdated,
    totalStakedLP,
    totalValueLocked
  } = useFarmROI();
  const stakedBalance = useStakedBalance();
  const tokenPrice = useTokenPrice();
  const rewardUpdateTime = useWorldPerBlockUpdate();
  const rewardUpdateDay = dayjs(new Date(rewardUpdateTime * 1000));
  const {
    pastStats,
    stats
  } = useStats(async (startDate) => await WorldData.getFarmStats(startDate));
  const poolReward = toNumber(useTokenBalance(CONTRACT_ADDRESSES.worldFarm[CHAIN_ID]));

  const totalValueLockedPct = getStatPercentage(totalValueLocked, stats.tvl);
  const rewardPerThousandPct = getStatPercentage(rewardPerThousand, stats.rewardPerThousand);
  const blockRewardPct = getStatPercentage(worldPerBlock, stats.blockReward);

  const currentStats = {};
  currentStats.apy = flatten(stats.apy, roiPerYear * 100);
  currentStats.poolRewards = flatten(stats.poolRewards, poolReward);
  currentStats.tvl = flatten(stats.tvl, totalValueLocked);
  currentStats.rewardPerThousand = flatten(stats.rewardPerThousand, rewardPerThousand);
  currentStats.blockReward = flatten(stats.blockReward, worldPerBlock);

  console.log(pastStats.apy);

  const smallStats = [
    {
      label: 'Total Value Locked',
      value: totalValueLocked,
      prepend: '$',
      percentage: totalValueLockedPct,
      increase: totalValueLockedPct >= 0,
      decrease: totalValueLockedPct < 0,
      chartLabels: [null, null, null, null, null, null, null],
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          borderColor: 'rgb(2, 192, 118)',
          backgroundColor: 'rgba(1,176,117,0.1)',
          data: currentStats.tvl
        }
      ]
    },
    {
      label: 'Daily Yield Per $1000',
      value: rewardPerThousand,
      percentage: rewardPerThousandPct,
      decimals: 2,
      increase: rewardPerThousandPct >= 0,
      decrease: rewardPerThousandPct < 0,
      chartLabels: [null, null, null, null, null, null, null],
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          borderColor: 'rgb(2, 192, 118)',
          backgroundColor: 'rgba(1,176,117,0.1)',
          data: currentStats.rewardPerThousand
        }
      ]
    },
    {
      label: (
        <>
          WORLD per block&nbsp;
          {!rewardUpdateTime.isZero()
          && !worldPerBlockUpdated
          && dayjs()
            .isBefore(rewardUpdateDay) ? (
            <span style={{ fontSize: '.6rem' }}>
                <Badge
                  href="javascript:void(0)"
                  theme="secondary"
                  className="gradient-bg font-size-90pct"
                  onClick={() => {
                    setCalendarRewardUpdate(!calendarRewardUpdate);
                  }}
                >
                  {calendarRewardUpdate ? (
                    <>Updates {rewardUpdateDay.calendar()}</>
                  ) : (
                    <>Updates in <Countdown date={rewardUpdateDay}/></>
                  )}
                </Badge>
              </span>
          ) : null}
        </>
      ),
      value: worldPerBlock,
      percentage: blockRewardPct,
      increase: blockRewardPct >= 0,
      decrease: blockRewardPct < 0,
      chartLabels: [null, null, null, null, null, null, null],
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          borderColor: 'rgb(2, 192, 118)',
          backgroundColor: 'rgba(1,176,117,0.1)',
          data: currentStats.blockReward
        }
      ]
    }
  ];

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Farm WORLD Tokens"
          subtitle="Earn by staking WORLD-ETH UNI LP"
          // className="text-sm-left mb-3"
        />
      </Row>

      <Row>
        <Col lg="8" md="12" sm="12" className="mb-4">
          <FarmLineChart
            pastStats={pastStats}
            stats={currentStats}
          />
        </Col>
        <Col lg="4" md="12" sm="12" className="mb-4 d-flex flex-column justify-content-center">
          <div>
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
          </div>
          <div className="my-4">
            <SmallStats
              chartData={smallStats[1].datasets}
              label={smallStats[1].label}
              value={smallStats[1].value}
              percentage={smallStats[1].percentage}
              increase={smallStats[1].increase}
              decrease={smallStats[1].decrease}
              append={smallStats[1].append}
              prepend={smallStats[1].prepend}
              decimals={smallStats[1].decimals}
            />
          </div>
          <div>
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
          </div>
        </Col>
      </Row>


      {!account ? (
        <Row>
          <Col>
            <Button
              block
              theme="accent"
              outline
              size="lg"
              className="mb-4"
              onClick={() => {
                open();
              }}
            >
              Connect wallet to stake
            </Button>
          </Col>
        </Row>
      ) : null}

      <Row>
        <Col lg="4" md="12" sm="12" className="mb-4">
          <Stake
            totalStakedLP={totalStakedLP}
            tokenPrice={tokenPrice}
            worldPerBlock={worldPerBlock}
            totalValueLocked={totalValueLocked}
          />
        </Col>

        <Col lg="4" md="12" sm="12" className="mb-4">
          <StakingActions
            stakedBalance={stakedBalance}
            tokenPrice={tokenPrice}
          />
        </Col>

        <Col lg="4" md="12" sm="12" className="mb-4">
          <StakingInfo
            stakedBalance={stakedBalance}
            totalStakedLP={totalStakedLP}
            worldPerBlock={worldPerBlock}
            tokenPrice={tokenPrice}
            totalValueLocked={totalValueLocked}
          />
        </Col>
      </Row>

      <Alert theme="dark" className="gradient-bg text-white text-center rounded-border">
        Please note that most of the values shown are estimates only.
      </Alert>

    </Container>
  );
};

export default Farm;
