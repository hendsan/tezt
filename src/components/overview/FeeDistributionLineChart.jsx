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

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// const fillWithZeros = (data) => {
//   const zeros = Array.from(new Array(7), () => 0);
//
//   for (let i = 0; i < data.length; i++) {
//     zeros[i] = data[i];
//   }
//
//   return zeros;
// }

const FeeDistributionLineChart = ({
  prependTitle,
  subject,
  title,
  data,
  pastData,
  currentValue,
  chartOptions
}) => {
  const canvasRef = createRef();
  // const [typeOpen, setTypeOpen] = useState(false);
  // const [type, setType] = useState('WORLD');
  const [chart, setChart] = useState(null);
  const pastAverage = getAverage(pastData);
  const average = getAverage(data);

  useEffect(() => {
    // const ctx = canvasRef.current.getContext('2d');
    // const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    // gradient.addColorStop(.5, 'rgba(33,212,253,0.2)');
    // gradient.addColorStop(1, 'rgba(183, 33, 255, 0.1)');
    // gradient.addColorStop(0.6, '#00BCD4');
    // gradient.addColorStop(1, '#1DE9B6');

    // gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
    // gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    // gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    const chartData = {
      labels: days,
      datasets: [
        {
          label: 'Past Week',
          fill: 'start',
          data: pastData,
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
          data: data,
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
              const label = displayAmount(+item.value)
                .toLocaleString();
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
  }, [data?.length, currentValue]);

  return (
    <Card small className="h-100">
      <CardHeader className="border-bottom">
        {/*<Dropdown*/}
        {/*  open={typeOpen}*/}
        {/*  toggle={() => setTypeOpen(!typeOpen)}*/}
        {/*  size="xs"*/}
        {/*  className="mr-2 d-inline-block"*/}
        {/*>*/}
        {/*  <DropdownToggle caret theme="secondary">{type}</DropdownToggle>*/}
        {/*  <DropdownMenu>*/}
        {/*    <DropdownItem onClick={() => setType('WORLD')}>WORLD</DropdownItem>*/}
        {/*    <DropdownItem onClick={() => setType('WORLD (USD)')}>WORLD (USD)</DropdownItem>*/}
        {/*  </DropdownMenu>*/}
        {/*</Dropdown>*/}
        <h6 className="m-0 d-inline-block">
          {prependTitle}&nbsp;&nbsp;{title}
        </h6>
      </CardHeader>
      <CardBody className="pt-0">
        <Row className="border-bottom py-2 bg-dark">
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
                Current {subject}: <Value value={currentValue}/>
              </Badge>
            </div>
          </div>
        </Row>
        <canvas
          height="120"
          ref={canvasRef}
          style={{ maxWidth: '100% !important' }}
        />
      </CardBody>
    </Card>
  );
};

export default FeeDistributionLineChart;
