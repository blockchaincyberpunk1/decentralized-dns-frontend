import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Web3Modal from 'web3modal';
import Web3 from 'web3';
import DomainRegister from './components/DomainRegister';
import DomainResolve from './components/DomainResolve';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  // Memoizing the web3Modal instance
  const web3Modal = useMemo(() => new Web3Modal({
    network: "sepolia", // Change to Sepolia
    cacheProvider: true, // Optional
    providerOptions: {} // Required - Add any additional provider options here
  }), []);

  const connectWallet = useCallback(async () => {
    try {
      const provider = await web3Modal.connect();
      const web3Instance = new Web3(provider);

      const accounts = await web3Instance.eth.getAccounts();
      setWeb3(web3Instance);
      setAccount(accounts[0]);
    } catch (err) {
      console.warn("Failed to connect to MetaMask:", err);
      // Handle connection failure
    }
  }, [web3Modal]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [connectWallet, web3Modal.cachedProvider]);

  return (
    <div>
      <h1>Decentralized DNS Service</h1>
      <button onClick={connectWallet}>
        {account ? 'Connected' : 'Connect Wallet'}
      </button>
      {account && (
        <>
          <DomainRegister web3={web3} account={account} />
          <DomainResolve web3={web3} />
        </>
      )}
    </div>
  );
};

export default App;
