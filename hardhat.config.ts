import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */

const { POLY_MUMBAI_RPC_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: `${POLY_MUMBAI_RPC_URL}`,
        blockNumber: 16139820,
      },
    },
    'truffle-dashboard': {
      url: 'http://localhost:24012/rpc',
    },
    mumbai: {
      url: POLY_MUMBAI_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 80001,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 100000000,
  },
  paths: {
    artifacts: 'build/artifacts',
    cache: 'build/cache',
    sources: 'contracts',
  },
  // etherscan: {
  //     apiKey: POLYGONSCAN_API_KEY,
  // },
};
export default config;
