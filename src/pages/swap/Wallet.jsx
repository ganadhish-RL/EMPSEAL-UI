import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/emp-logo.png";
import WalletImg from "../../assets/images/wallet-2.svg";
import Line from "../../assets/images/Frame 25.png";
import Home from '../../assets/images/house.svg';
import Links from '../../assets/images/link.svg';
import Fra from "../../assets/images/Frame 86.png";
import { Link } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import WalletConnect from "./WalletConnect/WalletConnect";
import { useBalance } from "wagmi";
import { formatEther } from "viem";

const Wallet = () => {
  const [isConnectWalletVisible, setConnectWalletVisible] = useState(false);
  const [balance, setBalance] = useState(0);

  const result = useBalance({
    address: "0x4557B18E779944BFE9d78A672452331C186a9f48",
  });

  useEffect(() => {
    if (result.data) {
      setBalance(formatEther(result.data.value));
    }
  }, [result]);

  return (
    <div className="w-full border border-white rounded-xl py-4  2xl:px-4 lg:px-5 px-4 bg-black md:flex gap-4">
      {/* Wallet Info Section */}
      <div className="flex flex-col bg-[#161616] p-5 rounded-lg w-full md:max-w-[216px]">
        <div className="flex items-center gap-2 mb-4">
          <img src={Logo} alt="Logo" className="h-8" />
          <Link
            to="https://snowtrace.io/address/0xC4729E56b831d74bBc18797e0e17A295fA77488c"
            target="_blank"
            className="text-white font-mono text-sm truncate"
          >
            0xC472...488c
          </Link>
        </div>
        <img src={Line} alt="Line" className="mb-4" />
        <div className="text-white text-sm font-medium mb-2">Pulsechain</div>
        <div className="flex items-center gap-2">
          <img src={Fra} alt="Fra" className="h-6" />
          <div className="text-white text-lg font-bold">
            ${parseFloat(balance).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 flex-col wallet_bg relative z-10 mt-3">
      <WalletConnect icon={<img src={WalletImg} alt="Wallet Icon" className="" />} />

          <Link to='/'>
          <button className="flex items-center md:justify-start justify-center gap-2 bg-[#FF9900] text-black text-sm py-2 px-6 rounded-md font-semibold w-full roboto">
        <img className="pe-2" src={Home} />
          Home Page
        </button>
          </Link>

        </div>

      {/* Modal */}
      <div aria-label="Modal">
        {isConnectWalletVisible && (
          <ConnectWallet onClose={() => setConnectWalletVisible(false)} />
        )}
      </div>
    </div>
  );
};

export default Wallet;
