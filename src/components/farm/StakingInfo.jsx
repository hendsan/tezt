import {
  Badge,
  Card,
  CardBody, CardFooter,
  CardHeader, Col,
  ListGroup,
  ListGroupItem, Row
} from 'shards-react';
import { displayAmount } from '../../world/utils';
import { BLOCKS_PER_DAY, CHAIN_ID, CONTRACT_ADDRESSES } from '../../world/constants';
import Value from '../common/Value';
import useEthUsdPrice from '../../hooks/useEthUsdPrice';
import BadgeAnchorTag from '../common/BadgeAnchorTag';

const StakingInfo = ({
  stakedBalance,
  totalStakedLP,
  worldPerBlock,
  tokenPrice,
  totalValueLocked
}) => {
  let worldPerDay = 0;
  let stakedValue = 0;

  if (!totalStakedLP.isZero() && !stakedBalance.isZero()) {
    const share = stakedBalance.toString() / totalStakedLP.toString();
    worldPerDay = share * worldPerBlock * BLOCKS_PER_DAY;
    stakedValue = totalValueLocked * share;
  }

  return (
    <Card small className="blog-comments">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Staking Information</h6>
      </CardHeader>

      <CardBody className="d-flex flex-column">
        <ListGroup flush className="list-group-small">
          <ListGroupItem className="d-flex px-3">
            <span className="text-semibold text-fiord-blue"><b>Staked value</b></span>
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              <b>$<Value value={(stakedValue)} decimals={4} /></b>
            </span>
          </ListGroupItem>
          <ListGroupItem className="d-flex px-3">
            <span className="text-semibold text-fiord-blue">WORLD per day</span>
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              <Value value={(worldPerDay)} />
            </span>
          </ListGroupItem>
          <ListGroupItem className="d-flex px-3">
            <span className="text-semibold text-fiord-blue">WORLD per week</span>
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              <Value value={(worldPerDay * 7)} />
            </span>
          </ListGroupItem>
          <ListGroupItem className="d-flex px-3">
            <span className="text-semibold text-fiord-blue">WORLD per month</span>
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              <Value value={(worldPerDay * 31)} />
            </span>
          </ListGroupItem>
          <ListGroupItem className="d-flex px-3">
            <span className="text-semibold text-fiord-blue">Earnings per day (USD)</span>
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              $<Value value={(worldPerDay * tokenPrice.usd)} decimals={4} />
            </span>
          </ListGroupItem>
          <ListGroupItem className="d-flex px-3">
            <span className="text-semibold text-fiord-blue">Earnings per week (USD)</span>
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              $<Value value={((worldPerDay * 7) * tokenPrice.usd)} decimals={4} />
            </span>
          </ListGroupItem>
          <ListGroupItem className="d-flex px-3">
            <span className="text-semibold text-fiord-blue">Earnings per month (USD)</span>
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              $<Value value={((worldPerDay * 31) * tokenPrice.usd)} decimals={4} />
            </span>
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default StakingInfo;
