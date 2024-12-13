"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import ChainImg from "../../../assets/images/select_chain.svg";
import { useAccount } from "wagmi";

export default function WalletConnect({ icon }: { icon?: React.ReactNode }) {
  const { address, isConnected } = useAccount();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
          console.log('chain address', chain)
        if (!ready) {
          return (
            <div
              aria-hidden="true"
              style={{
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          );
        }

        if (!connected) {
          return (
            <button
              className="px-6 py-2 text-white rounded-md shadow-sm cursor-pointer bg-accent font-semibold flex items-center gap-2 roboto"
              onClick={openConnectModal}
              type="button"
            >
              {icon && <span>{icon}</span>}
              Connect Wallet
            </button>
          );
        }

        if (chain.unsupported) {
          return (
            <button
              className="bg-[#FF494A] px-4 py-2 rounded text-white flex items-center gap-2 roboto"
              onClick={openChainModal}
              type="button"
            >

              Wrong Network
            </button>
          );
        }

        return (
          <div className="flex flex-col justify-center items-center gap-4">
            <button
              className="px-4 xl:px-2 py-2 text-white rounded-full shadow-sm cursor-pointer bg-secondary font-semibold flex items-center gap-2 roboto"
              onClick={openAccountModal}
              type="button"
            >
              {icon && <span>{icon}</span>}
              Connected
            </button>
            <button
              className="px-4 py-2 text-white bg-primary rounded-full font-semibold flex items-center gap-2 roboto"
              onClick={openChainModal}
              type="button"
            >
             <img src={ChainImg} />
              Select Chain
            </button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
