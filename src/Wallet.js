import { ethers } from 'ethers';
import React, { useState } from 'react';
import Auth from './build/polygon/testnet/auth/Auth.json';

const networks = {
  polygon: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: 'Polygon Testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },
};

const Wallet = () => {
  const [address, setaddress] = useState('');
  const [connect, setconnect] = useState('Connect Wallet');
  const [auth, setauth] = useState('');
  const [login, setlogin] = useState('Login');
  const [provider, setprovider] = useState(null);
  const [account, setaccount] = useState(null);
  const [registered, setregistered] = useState('Register');
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please Install Metamask');
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const Provider = new ethers.providers.Web3Provider(window.ethereum);
    setprovider(Provider);
    const Account = provider.getSigner();
    setaccount(Account);
    const Address = await Account.getAddress();
    const authcontract = new ethers.Contract(Auth.address, Auth.abi, provider);
    setauth(authcontract);
    setaddress(Address);
    setconnect('connected :');

    if (provider.network !== 'matic') {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              ...networks['polygon'],
            },
          ],
        });
      } catch (e) {
        alert('Please switch to polygon network');
      }
    }
  };
  const handlelogin = async () => {
    const get = await auth.isRegistered(address);
    if (!get) {
      alert('Not Registered');
    } else if (get) {
      setlogin(`${address} login`);
      setregistered('Registered');
    }
  };
  const register = async () => {
    const get = await auth.isRegistered(address);
    if (!get) {
      await auth
        .connect(account)
        .register({ value: ethers.utils.parseEther('0.01') });
    } else {
      alert('Already registered');
    }
  };

  return (
    <div>
      <u onClick={connectWallet}>
        {' '}
        {connect} {address}
      </u>
      <div>
        <button onClick={handlelogin}>{login}</button>
      </div>
      <div>
        <button onClick={register}>{registered}</button>
      </div>
    </div>
  );
};

export default Wallet;
