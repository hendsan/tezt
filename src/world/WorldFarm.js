import { Contract, ethers, utils } from 'ethers';
import WorldFarmingAbi from './abi/WorldFarming.json';
import ERC20Abi from './abi/ERC20.json';
import {
  BLOCKS_PER_DAY,
  CHAIN_ID,
  CONTRACT_ADDRESSES,
  DEFAULT_PROVIDER,
  LP_TOKEN_CONTRACT,
  WETH_CONTRACT,
  WORLD_ETH_PAIR
} from './constants';
import WorldToken from './WorldToken';
import { ZERO_BN } from './utils';

export default class WorldFarm {
  static address = CONTRACT_ADDRESSES.worldFarm[CHAIN_ID];

  static read = new Contract(WorldFarm.address, WorldFarmingAbi, DEFAULT_PROVIDER);

  constructor(signer) {
    this.contract = new Contract(WorldFarm.address, WorldFarmingAbi, signer);
    this.signer = signer;
  }

  async wallet() {
    return this.signer.getAddress();
  }

  async lpTokenBalance() {
    return LP_TOKEN_CONTRACT.balanceOf(await this.wallet());
  }

  async lpTokenAllowance() {
    return LP_TOKEN_CONTRACT.allowance(await this.wallet(), this.contract.address);
  }

  async lpTokenMaxApprove() {
    const lpToken = new Contract(
      WORLD_ETH_PAIR.address,
      ERC20Abi,
      this.signer
    );
    const amount = ethers.constants.MaxUint256;
    const tx = await lpToken.approve(this.contract.address, amount);
    await tx.wait();

    return amount;
  }

  async stakedBalance() {
    const { amount } = await this.contract.userInfo(WORLD_ETH_PAIR.pid, await this.wallet());
    return amount;
  }

  static async roi(worldPerBlock, ethUsdPrice) {
    let lpContractToken = await WorldToken.balanceOf(LP_TOKEN_CONTRACT.address);
    lpContractToken = +lpContractToken.toString() / 1e18;

    let lpContractWeth = await WETH_CONTRACT.balanceOf(LP_TOKEN_CONTRACT.address);
    lpContractWeth = +lpContractWeth.toString() / 1e18;

    let balance = await LP_TOKEN_CONTRACT.balanceOf(WorldFarm.address);
    balance = +balance.toString() / 1e18;

    let totalSupply = await LP_TOKEN_CONTRACT.totalSupply();
    totalSupply = +totalSupply.toString() / 1e18;

    const portionLp = balance / totalSupply;

    const tokenAmount = (lpContractToken * portionLp);
    const wethAmount = (lpContractWeth * portionLp);

    const tokenPriceInWeth = wethAmount / tokenAmount;
    const tokenPriceUSD = tokenPriceInWeth * ethUsdPrice;

    // const averageBlockTime = 13.2;
    // const blocksPerHour = 3600 / averageBlockTime;

    const reserveETH = lpContractWeth + (lpContractToken * tokenPriceInWeth);
    const reserveUSD = reserveETH * ethUsdPrice;
    const balanceUSD = portionLp * reserveUSD;

    const roiPerBlock = (worldPerBlock * tokenPriceUSD) / balanceUSD;

    // const blocksPerHour = BLOCKS_PER_DAY / 24;
    // const roiPerHour = roiPerBlock * blocksPerHour;
    // const roiPerDay = roiPerHour * 24;
    const roiPerDay = roiPerBlock * BLOCKS_PER_DAY;
    const roiPerMonth = roiPerDay * 30;
    const roiPerYear = roiPerMonth * 12;

    return {
      // roiPerBlock,
      // roiPerHour,
      roiPerDay,
      roiPerMonth,
      roiPerYear,
      rewardPerThousand: roiPerDay * (1000 / tokenPriceUSD),
      totalStakedLP: utils.parseEther(balance.toString()),
      totalValueLocked: balanceUSD
    };
  }

  static async poolWeight() {
    const { allocPoint } = await WorldFarm.read.poolInfo(WORLD_ETH_PAIR.pid);
    const totalAllocPoint = await WorldFarm.read.totalAllocPoint();
    return allocPoint.div(totalAllocPoint);
  }

  static async totalLpWethValue() {
    // Get balance of the token address
    let tokenAmountWholeLP = await WorldToken.balanceOf(LP_TOKEN_CONTRACT.address);
    tokenAmountWholeLP = +tokenAmountWholeLP.toString();

    // Get the share of lpContract that WorldFarm owns
    let balance = await LP_TOKEN_CONTRACT.balanceOf(WorldFarm.address);
    balance = +balance.toString();

    // Convert that into the portion of total lpContract = p1
    let totalSupply = await LP_TOKEN_CONTRACT.totalSupply();
    totalSupply = +totalSupply.toString();

    // Get total weth value for the lpContract = w1
    let lpContractWeth = await WETH_CONTRACT.balanceOf(LP_TOKEN_CONTRACT.address);
    lpContractWeth = +lpContractWeth.toString();

    // Return p1 * w1 * 2
    const portionLp = balance / totalSupply;
    const totalLpWethValue = portionLp * lpContractWeth * 2;

    // Calculate
    const tokenAmount = (tokenAmountWholeLP * portionLp) / 1e18;
    const wethAmount = (lpContractWeth * portionLp) / 1e18;

    let poolWeight = await WorldFarm.poolWeight();
    poolWeight = +poolWeight.toString();

    return {
      tokenAmount,
      wethAmount,
      poolWeight,
      totalWethValue: totalLpWethValue / 1e18,
      tokenPriceInWeth: wethAmount * tokenAmount,
      totalStakedLp: balance / 1e18
    };
  }

  async pendingRewards() {
    return this.contract.pendingRewards(WORLD_ETH_PAIR.pid, await this.wallet());
  }

  async stake(amount) {
    const tx = await this.contract.deposit(WORLD_ETH_PAIR.pid, utils.parseEther(amount));
    await tx.wait();
  }

  async unstake(amount) {
    const tx = await this.contract.withdraw(WORLD_ETH_PAIR.pid, utils.parseEther(amount));
    await tx.wait();
  }

  async claimRewards() {
    const tx = await this.contract.deposit(WORLD_ETH_PAIR.pid, ZERO_BN);
    await tx.wait();
  }
}
