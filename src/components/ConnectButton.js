import React from 'react';

const ConnectButton = ({ connectWallet, walletAddress }) => (
  <button onClick={connectWallet} style={{ margin: '20px', padding: '10px', color: 'white', backgroundColor: '#333' }}>
    {walletAddress ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : 'Connect Wallet'}
  </button>
);

export default ConnectButton;