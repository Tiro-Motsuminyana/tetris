import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0].address);
        }
      }
    };
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return [walletAddress, connectWallet];
};