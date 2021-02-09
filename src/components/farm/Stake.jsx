import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col, Fade,
  FormInput,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Row
} from 'shards-react';
import { utils } from 'ethers';
import { useWallet } from 'use-wallet';
import useWorldFarm from '../../hooks/useWorldFarm';
import { toNumber } from '../../world/utils';
import useLpTokenBalance from '../../hooks/useLpTokenBalance';
import useLpTokenAllowance from '../../hooks/useLpTokenAllowance';
import { BLOCKS_PER_DAY, CHAIN_ID, CONTRACT_ADDRESSES } from '../../world/constants';
import Value from '../common/Value';
import BadgeAnchorTag from '../common/BadgeAnchorTag';

const Stake = ({
  tokenPrice,
  worldPerBlock,
  totalStakedLP,
  totalValueLocked
}) => {
  const { account } = useWallet();
  const [staking, setStaking] = useState(false);
  const [approving, setApproving] = useState(false);
  const [amount, setAmount] = useState('0');
  const {
    setAllowance,
    allowance
  } = useLpTokenAllowance();
  const worldFarm = useWorldFarm();
  const balance = useLpTokenBalance();
  const stakingAllowed = !allowance.isZero();

  const totalStaked = toNumber(totalStakedLP) + amount;

  let worldPerDay = 0;
  let stakeValue = 0;
  const showEstimates = !totalStakedLP.isZero() && totalStaked;
  if (showEstimates) {
    const share = amount / totalStaked;
    worldPerDay = share * worldPerBlock * BLOCKS_PER_DAY;
    stakeValue = totalValueLocked * share;
  }

  return (
    <Card small className="blog-comments">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Stake WORLD-ETH LP Tokens</h6>
      </CardHeader>

      <CardBody className="d-flex flex-column">
        <label htmlFor="lpAmount">Enter LP amount to stake</label>
        <InputGroup>
          <FormInput
            id="lpAmount"
            placeholder="0"
            onChange={(e) => {
              const num = e.target.value;
              setAmount(num);
            }}
            value={amount}
          />
          <InputGroupAddon type="append">
            <Button
              theme="dark"
              onClick={() => {
                if (!balance.isZero()) {
                  setAmount(utils.formatEther(balance));
                }
              }}
            >
              Max
            </Button>
          </InputGroupAddon>
          <InputGroupAddon type="append">
            <Button
              theme='accent'
              outline={!staking && !approving}
              disabled={staking || approving || !account}
              className={!account ? 'not-allowed' : null}
              onClick={async () => {
                if (stakingAllowed) {
                  try {
                    setStaking(true);
                    await worldFarm?.stake(amount);
                    setAmount('0');
                  } catch (e) {
                    console.log('Stake error: ', e);
                    // setAllowance(BigNumber.from(0));
                  }
                  setStaking(false);
                  return;
                }

                try {
                  setApproving(true);
                  const amount = await worldFarm?.lpTokenMaxApprove();
                  setAllowance(amount);
                } catch (e) {
                  console.log('Approve error: ', e);
                }
                setApproving(false);
              }}
            >
              {staking ? 'Staking...' : null}
              {approving ? 'Approving...' : null}
              {!staking && !approving ? stakingAllowed ? 'Stake' : 'Approve' : null}
            </Button>
          </InputGroupAddon>
        </InputGroup>

        <ListGroup flush className="list-group-small">
          <ListGroupItemHeading/>
          <ListGroupItem className="d-flex px-3">
            <span className="text-semibold text-fiord-blue"><b>Available balance</b></span>
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              <b><Value value={balance}/></b>
            </span>
          </ListGroupItem>
          {showEstimates ? (
            <>
              <ListGroupItem className="d-flex px-3">
                <span className="text-semibold text-fiord-blue">Stake value</span>
                <span className="ml-auto text-right text-semibold text-reagent-gray">
                  ~$<Value value={stakeValue} decimals={4}/>
                </span>
              </ListGroupItem>
              <ListGroupItem className="d-flex px-3">
                <span className="text-semibold text-fiord-blue">WORLD per day</span>
                <span className="ml-auto text-right text-semibold text-reagent-gray">
                  ~<Value value={worldPerDay}/>
                </span>
              </ListGroupItem>
              <ListGroupItem className="d-flex px-3">
                <span className="text-semibold text-fiord-blue">Earnings per day (USD)</span>
                <span className="ml-auto text-right text-semibold text-reagent-gray">
                  ~$<Value value={worldPerDay * tokenPrice.usd} decimals={4}/>
                </span>
              </ListGroupItem>
            </>
          ) : null}
        </ListGroup>
      </CardBody>

      <CardFooter className="border-top">
        <Row>
          <Col className="view-report " sm="12" md="12">
            <Badge
              href={`https://etherscan.com/address/${CONTRACT_ADDRESSES.worldFarm[CHAIN_ID]}`}
              tag={BadgeAnchorTag}
            >
              Contract: {CONTRACT_ADDRESSES.worldFarm[CHAIN_ID]}
            </Badge>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
};

export default Stake;
