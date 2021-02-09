import { createRef, useEffect, useState } from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row
} from 'shards-react';
import Chart from '../../world/chart';
import { displayAmount, getAverage } from '../../world/utils';
import Value from '../common/Value';
import approx from 'approximate-number';

// const pastWeeksDates = Array.from(new Array(7), (_, i) => i)
//   .reverse()
//   .map(num => {
//     const date = dayjs()
//       .subtract(num, 'day');
//     return date.format('ddd');
//   });
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const FarmLineChart = ({
  stats,
  pastStats,
  chartOptions
}) => {
  const canvasRef = createRef();
  const [typeOpen, setTypeOpen] = useState(false);
  const [type, setType] = useState('APY');
  const [chart, setChart] = useState(null);

  const data = {
    'APY': {
      current: stats.apy,
      past: pastStats.apy,
      subject: 'APY'
    },
    'Pool Rewards': {
      current: stats.poolRewards,
      past: pastStats.poolRewards,
      subject: 'Pool Rewards'
    },
    'Total Value Locked': {
      current: stats.tvl,
      past: pastStats.tvl,
      subject: 'TVL'
    },
    'Daily Yield Per $1000': {
      current: stats.rewardPerThousand,
      past: pastStats.rewardPerThousand,
      subject: 'Yield'
    },
    'WORLD Per Block': {
      current: stats.blockReward,
      past: pastStats.blockReward,
      subject: 'Reward'
    }
  }[type];
  const currentValue = data.current[data.current.length - 1] || 0;

  const pastAverage = getAverage(data.past);
  const average = getAverage(data.current);

  useEffect(() => {
    // const ctx = canvasRef.current.getContext('2d');
    // const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    // gradient.addColorStop(.5, 'rgba(33,212,253,0.1)');
    // gradient.addColorStop(1, 'rgba(183, 33, 255, 0.1)');

    const chartData = {
      labels: days,
      datasets: [
        {
          label: 'Past Week',
          fill: 'start',
          data: data.past,
          backgroundColor: 'rgba(0,102,124,0.1)',
          borderColor: 'rgb(248, 73, 96)',
          // pointBackgroundColor: '#ffffff',
          // pointHoverBackgroundColor: 'rgba(255,65,105,1)',
          borderDash: [3, 3],
          borderWidth: 1,
          pointRadius: 0,
          pointHoverRadius: 2,
          // pointBorderColor: 'rgba(255,65,105,1)'
        },
        {
          label: 'Current Week',
          fill: 'start',
          data: data.current,
          borderColor: 'rgb(2, 192, 118)',
          backgroundColor: 'rgba(1,176,117,0.1)',
          // pointBackgroundColor: '#ffffff',
          // pointHoverBackgroundColor: 'rgb(0,123,255)',
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3
        },
      ]
    };

    const options = {
      ...{
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'top'
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3
          },
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  // const date = dayjs().subtract(tick, 'day');
                  // console.log(tick);
                  // console.log(date.toString());
                  // return date.format('DD-MM');
                  // Jump every 7 values on the X axis labels to avoid clutter.
                  // return index % 2 !== 0 ? '' : tick;
                  return tick;
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  return approx(tick, { min10k: true });
                }
              }
            }
          ]
        },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        tooltips: {
          custom: false,
          mode: 'nearest',
          intersect: false,
          callbacks: {
            label(item, data) {
              const decimals = type === 'APY' ? 2 : 3;
              let label = displayAmount(+item.value, decimals)
                .toLocaleString();

              if (type === 'APY') {
                label += '%';
              }

              if (type === 'Total Value Locked') {
                label = '$' + label;
              }

              const prepend = data.datasets[item.datasetIndex].label;

              return prepend + ': ' + label;
            }
          }
        }
      },
      ...chartOptions
    };

    if (chart) {
      chart.destroy();
    }

    const Overview = new Chart(canvasRef.current, {
      type: 'LineWithLine',
      data: chartData,
      options
    });

    // They can still be triggered on hover.
    const buoMeta = Overview.getDatasetMeta(0);
    if (buoMeta && buoMeta.data[0]) {
      buoMeta.data[0]._model.radius = 0;
      buoMeta.data[chartData.datasets[0].data.length - 1]._model.radius = 0;
    }

    // Render the chart.
    Overview.render();

    setChart(Overview);
  }, [data?.current?.length, type, currentValue]);

  return (
    <Card small className="h-100">
      <CardHeader className="border-bottom">
        <Dropdown
          open={typeOpen}
          toggle={() => setTypeOpen(!typeOpen)}
          size="xs"
          className="mr-2 d-inline-block"
        >
          <DropdownToggle caret theme="accent" outline>{type}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setType('APY')}>APY</DropdownItem>
            <DropdownItem onClick={() => setType('Pool Rewards')}>Pool Rewards</DropdownItem>
            <DropdownItem onClick={() => setType('Total Value Locked')}>Total Value Locked</DropdownItem>
            <DropdownItem onClick={() => setType('Daily Yield Per $1000')}>Daily Yield Per $1000</DropdownItem>
            <DropdownItem onClick={() => setType('WORLD Per Block')}>WORLD Per Block</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <h6 className="m-0 d-inline-block">
          Daily Overview
        </h6>
      </CardHeader>
      <CardBody className="pt-0">
        <Row className="border-bottom py-2 bg-dark">
          {/* <Col sm="6" className="d-flex mb-2 mb-sm-0"> */}
          {/*  <RangeDatePicker /> */}
          {/* </Col> */}
          <div className="d-flex justify-content-between w-100 px-3">
            <div>
              <Badge
                size="sm"
                theme="dark"
                outline
              >
                Past Average: <Value value={pastAverage}/>
              </Badge>
              <Badge
                size="sm"
                theme="dark"
                outline
              >
                Current Average: <Value value={average}/>
              </Badge>
            </div>
            <div className='d-flex align-items-center'>
              <Badge
                size="sm"
                theme="secondary"
                className="gradient-bg"
              >
                Current {data.subject}: {data.subject === 'TVL' ? '$' : ''}<Value value={currentValue}/>{data.subject === 'APY' ? '%' : ''}
              </Badge>
            </div>
          </div>
        </Row>
        <div style={{height: '340px'}}>
          <canvas
            height="150"
            ref={canvasRef}
            style={{ maxWidth: '100% !important' }}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default FarmLineChart;
