import { ethers } from 'hardhat';
import { storeContract } from './storeContract';

async function main() {
  const Auth = await ethers.getContractFactory('Auth');
  const auth = await Auth.deploy();
  await auth.deployed();

  await storeContract(
    auth.address,
    JSON.parse(String(auth.interface.format('json'))),
    'auth',

    'Auth'
  );

  console.log(`Auth deployed to ${auth.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
