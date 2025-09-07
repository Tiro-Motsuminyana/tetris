import React from 'react';

const ConnectButton = ({ connectWallet, walletAddress }) => (
  <button
    className={`w-full py-3 px-4 ${walletAddress ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white font-medium rounded transition-colors`}
    onClick={connectWallet}
  >
    {walletAddress ? `Connected: ${walletAddress.substring(0, 6)}...` : 'Connect Wallet'}
  </button>
);

export default ConnectButton;