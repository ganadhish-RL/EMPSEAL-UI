import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/emp-logo.png";
import Line from "../../assets/images/Frame 25.png";
import Fra from "../../assets/images/Frame 86.png";
import { Link } from "react-router-dom";
// import LineChart from "./LinesGraphs";
import ConnectWallet from "./ConnectWallet";
import WalletConnect from "./WalletConnect/WalletConnect";
import { useBalance } from 'wagmi'
import { formatEther } from "viem";




const Wallet = () => {
  const [isConnectWalletVisible, setConnectWalletVisible] = useState(false);
  const [balance, setBalance] = useState(0)
  const result = useBalance({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  })
  useEffect(() => {
    if (result.data) {
      setBalance(formatEther(result.data.value))
    }
  }, [result])


  return (
    <>
      <div className="w-full border border-white rounded-xl py-2  2xl:px-7 lg:px-5 px-4 bg-black flex">
        <div className="rounded-[32.83px] mt-4 px-4 py-4">
          <div className="flex gap-2 items-center">
            <img src={Logo} alt="Logo" />
            <Link
              to="https://snowtrace.io/address/0xC4729E56b831d74bBc18797e0e17A295fA77488c"
              target="_blank"
            >
              {/* <div className="roboto">
                <span className="text-white roboto text-xs font-normal underline">
                  0xC472
                </span>
                <span className="text-white roboto text-xs font-normal underline">
                  ...
                </span>
                <span className="text-white roboto text-xs font-normal underline">
                  488c
                </span>
              </div> */}

            </Link>
          </div>
          {/* <div>
            <LineChart />
          </div> */}
          <img src={Line} alt="Line" />
          <div className="text-white text-[11px] font-normal roboto">
            Pulsechain
          </div>
          <div className="flex gap-3 items-center">
            <img src={Fra} alt="Fra" />
            <div className="text-white text-[14.29px] font-bold roboto">
              {parseFloat(balance).toFixed(6)}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 flex-col">
          <WalletConnect />
        </div>
      </div>
      <div aria-label="Modal">
        {isConnectWalletVisible && (
          <ConnectWallet onClose={() => setConnectWalletVisible(false)} />
        )}
      </div>
    </>
  );
};

export default Wallet;
