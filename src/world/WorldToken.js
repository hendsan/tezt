import {
  utils,
  Contract
} from 'ethers';
import WorldTokenAbi from './abi/WorldToken.json';
import {
  CHAIN_ID,
  CONTRACT_ADDRESSES,
  DEFAULT_PROVIDER
} from './constants';

export default class WorldToken {
  static read = new Contract(
    CONTRACT_ADDRESSES.worldToken[CHAIN_ID],
    WorldTokenAbi,
    DEFAULT_PROVIDER
  );

  static address = CONTRACT_ADDRESSES.worldToken[CHAIN_ID]

  constructor(signer) {
    this.signer = signer;
  }

  async wallet() {
    return this.signer.getAddress();
  }

  async balance() {
    return WorldToken.balanceOf(await this.wallet());
  }

  static async balanceOf(address) {
    return WorldToken.read.balanceOf(address);
  }

  async allowance() {
    return WorldToken.read.allowance(await this.wallet(), WorldToken.read.address);
  }
}
