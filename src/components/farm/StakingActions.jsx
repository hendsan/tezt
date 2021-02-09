import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormInput,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading
} from 'shards-react';
import usePendingRewards from '../../hooks/usePendingRewards';
import Value from '../common/Value';
import { utils } from 'ethers';
import useWorldFarm from '../../hooks/useWorldFarm';
import { useWallet } from 'use-wallet';
import React, { useState } from 'react';

const StakingInfo = ({
  stakedBalance,
  tokenPrice
}) => {
  const { account } = useWallet();
  const [claiming, setClaiming]= useState(false);
  const [unstaking, setUnstaking]= useState(false);
  const [amount, setAmount] = useState();
  const pendingRewards = usePendingRewards() || '0';
  const worldFarm = useWorldFarm();

  return (
    <Card small className="blog-comments">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Staking Actions</h6>
      </CardHeader>

      <CardBody className="d-flex flex-column">
        <Button
          theme="accent"
          outline={!claiming}
          className={!account ? 'not-allowed' : null}
          disabled={claiming || !account}
          onClick={async () => {
            try {
              setClaiming(true);
              await worldFarm?.claimRewards();
            } catch (e) {
              console.log('Claiming error: ', e);
            }
            setClaiming(false);
          }}
        >
          {claiming ? 'Claiming Rewards...' : 'Claim Rewards'}
        </Button>
        <ListGroup flush className="list-group-small">
          <ListGroupItemHeading/>
          <ListGroupItem className="d-flex px-3">
            <span className="text-semibold text-fiord-blue"><b>Pending rewards</b></span>
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              <b><Value value={(pendingRewards)}/> WORLD</b>
            </span>
          </ListGroupItem>
          <ListGroupItem className="d-flex px-3">
            <span className="text-semibold text-fiord-blue">Current earnings (USD)</span>
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              $<Value value={(utils.formatEther(pendingRewards) * tokenPrice.usd)} decimals={4}/>
            </span>
          </ListGroupItem>
        </ListGroup>

      </CardBody>

      <CardFooter className="border-top">
        <label htmlFor="unstakeAmount">Enter LP amount to unstake</label>
        <InputGroup>
          <FormInput
            id="unstakeAmount"
            placeholder="0"
            onChange={(e) => {
              const num = e.target.value;
              setAmount(num ? num : '');
            }}
            value={amount}
          />
          <InputGroupAddon type="append">
            <Button
              theme="dark"
              onClick={() => {
                if (!stakedBalance.isZero()) {
                  setAmount(utils.formatEther(stakedBalance));
                }
              }}>
              Max
            </Button>
          </InputGroupAddon>
          <InputGroupAddon type="append">
            <Button
              theme='accent'
              outline={!unstaking}
              disabled={unstaking || !account}
              className={!account ? 'not-allowed' : null}
              onClick={async () => {
                try {
                  setUnstaking(true);
                  await worldFarm?.unstake(amount);
                  setAmount('0');
                } catch (e) {
                }
                setUnstaking(false);
              }}
            >
              {unstaking ? 'Unstaking...' : 'Unstake'}
            </Button>
          </InputGroupAddon>
        </InputGroup>

        <ListGroup flush className="list-group-small">
          <ListGroupItemHeading/>
          <ListGroupItem className="d-flex px-3">
            <span className="text-semibold text-fiord-blue"><b>Staked balance</b></span>
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              <b><Value value={(stakedBalance)}/></b>
            </span>
          </ListGroupItem>
        </ListGroup>
      </CardFooter>
    </Card>
  );
};

export default StakingInfo;
