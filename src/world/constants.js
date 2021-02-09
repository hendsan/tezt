import * as ethers from 'ethers';
import {
  Pair,
  Token,
  WETH
} from '@uniswap/sdk';
import { Contract } from 'ethers';
import ERC20Abi from './abi/ERC20.json';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const CHAIN_ID_MAINNET = 1;
const RPC_URL_MAINNET = 'https://mainnet.eth.aragon.network';
const ROPSTEN_CHAIN_ID = 3;
const ROPSTEN_RPC_URL = 'https://ropsten.eth.aragon.network';
const RINKEBY_CHAIN_ID = 4;
const RINKEBY_RPC_URL = 'https://rinkeby.eth.aragon.network';
const GOERLI_CHAIN_ID = 5;
const GOERLI_RPC_URL = 'https://goerli.eth.aragon.network';
const LOCAL_CHAIN_ID = 1337;

export const CONTRACT_ADDRESSES = {
  worldToken: {
    [CHAIN_ID_MAINNET]: '0xBF494F02EE3FdE1F20BEE6242bCe2d1ED0c15e47',
    [ROPSTEN_CHAIN_ID]: '0x8dA0a9A5B7AFB261c4A69eb445A09d3f691D7C51',
    [RINKEBY_CHAIN_ID]: '0x4cfEe942b2D9628B97751411171fBb8672Eed0F3',
    [LOCAL_CHAIN_ID]: '0x31FFbe9bf84b4d9d02cd40eCcAB4Af1E2877Bbc6'
  },
  worldFarm: {
    [CHAIN_ID_MAINNET]: '0x13701EdCBD3A0BD958F7548E92c41272E2AF7517',
    [ROPSTEN_CHAIN_ID]: '0x9498C55F9fA525EE3Df2063c36A9dee013226F90',
    [RINKEBY_CHAIN_ID]: '0xF23f74E618c5195F30cb988a1E44aE520c8DBFf8',
  }
};

// change to mainnet before deploying!
const DEFAULT_CHAIN_ID = ROPSTEN_CHAIN_ID;
export const CHAIN_ID = DEFAULT_CHAIN_ID;
export const RPC_URL = ROPSTEN_RPC_URL;

const INFURA_PROJECT_ID =  DEFAULT_CHAIN_ID === ROPSTEN_CHAIN_ID ? '389c41b956084603a530ecf6e6e9809c' : '7d202bf325f64be09f716d636db35131';
const ALCHEMY_API_KEY = 'EO7ieJ1gfiSe0jdyQHEWlpDIbvieBDsm';
const ETHERSCAN_API_KEY = 'U26Y5YH9JNH4DVFHD3THA5KH4RRNHY33SF';

export const DEFAULT_PROVIDER = DEFAULT_CHAIN_ID !== LOCAL_CHAIN_ID
  ? ethers.getDefaultProvider(DEFAULT_CHAIN_ID, {
    infura: INFURA_PROJECT_ID,
    alchemy: ALCHEMY_API_KEY,
    etherscan: ETHERSCAN_API_KEY
  })
  : new ethers.providers.JsonRpcProvider();

DEFAULT_PROVIDER.pollingInterval = 15000;

export const WORLD_ETH_PAIR = {
  address: Pair.getAddress(
    new Token(DEFAULT_CHAIN_ID, CONTRACT_ADDRESSES.worldToken[DEFAULT_CHAIN_ID], 18, 'any'),
    WETH[DEFAULT_CHAIN_ID]
  ),
  pid: 0
};

export const WETH_CONTRACT = new ethers.Contract(
  WETH[DEFAULT_CHAIN_ID].address,
  ERC20Abi,
  DEFAULT_PROVIDER
);

export const LP_TOKEN_CONTRACT = new Contract(
  WORLD_ETH_PAIR.address,
  ERC20Abi,
  DEFAULT_PROVIDER
);

export const BLOCKS_PER_DAY = 6525;

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyB_uD4puJZ5EBce1EK2SK3m0MdXwi3cSmM',
  authDomain: 'world-token.firebaseapp.com',
  databaseURL: 'https://world-token.firebaseio.com',
  projectId: 'world-token',
  storageBucket: 'world-token.appspot.com',
  messagingSenderId: 'world-token',
  appId: 'world-token'
};

export const uniClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});

export const BURN_ADDRESS = '0x000000000000000000000000000000000000dEaD';
export const MARKETING_ADDRESS = '0xafB9ea8bc5d6AaE77d2A23c55352ed5AA0e29c18';
export const LOCKED_MARKETING_TOKENS = 20_000_000;
export const TOTAL_SUPPLY = 100_000_000;
