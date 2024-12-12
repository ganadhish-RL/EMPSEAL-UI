import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/emp-logo.png";
import WalletImg from "../../assets/images/wallet-2.svg";
import Line from "../../assets/images/Frame 25.png";
import Home from "../../assets/images/house.svg";
import Links from "../../assets/images/link.svg";
import Fra from "../../assets/images/Frame 86.png";
import { Link } from "react-router-dom";
import WalletConnect from "./WalletConnect/WalletConnect";
import { useBalance, useAccount } from "wagmi";
import { formatEther } from "viem";

// Utility function to truncate address
const truncateAddress = (address) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

const Wallet = () => {
  const [balance, setBalance] = useState(null); // Ensure balance is initialized properly
  const { address } = useAccount();

  const result = useBalance({
    address,
  });

  useEffect(() => {
    if (result.data) {
      setBalance(formatEther(result.data.value));
    }
  }, [result]);

  const formattedBalance = balance ? `${parseFloat(balance).toFixed(2)}` : "$0.00";

  return (
    <div className="w-full border border-white rounded-xl py-4 2xl:px-4 lg:px-5 px-4 bg-black md:flex gap-4">
      {/* Wallet Info Section */}
      <div className="flex flex-col bg-[#161616] p-5 rounded-lg w-full md:max-w-[216px]">
        <div className="flex items-center gap-2 mb-4">
          <img src={Logo} alt="Logo" className="h-8" />
          <Link
            to="#"
            target="_blank"
            className="text-white font-mono text-sm truncate"
          >
            {address ? truncateAddress(address) : "Not connected"}
          </Link>
        </div>
        <img src={Line} alt="Line divider" className="mb-4" />
        <div className="text-white text-sm font-medium mb-2">Pulsechain</div>
        <div className="flex items-center gap-2">
          <img src={Fra} alt="Pulsechain icon" className="h-6" />
          <div className="text-white text-lg font-bold">{formattedBalance}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 flex-col wallet_bg relative z-10 mt-3">
        <WalletConnect icon={<img src={WalletImg} alt="Wallet Icon" />} />
        <Link to="/">
          <button className="flex items-center md:justify-start justify-center gap-2 bg-[#FF9900] text-black text-sm py-2 px-6 rounded-md font-semibold w-full roboto">
            <img className="pe-2" src={Home} alt="Home Icon" />
            Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Wallet;
