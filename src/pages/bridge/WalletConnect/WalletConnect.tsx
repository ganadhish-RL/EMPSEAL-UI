"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";
import ChainImg from "../../../assets/images/select_chain.svg";
import { useAccount } from "wagmi";

export default function WalletConnect({
  icon,
  onChainChange,
}: {
  icon?: React.ReactNode;
  onChainChange?: (iconUrl: string | undefined, chainName: string | undefined) => void;
}) {
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

        // Notify parent about chain changes
        useEffect(() => {
          if (onChainChange) {
            onChainChange(chain?.iconUrl, chain?.name);
          }
        }, [chain, onChainChange]);

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
              className="px-4 xl:px-4 py-2 text-white rounded-full shadow-sm cursor-pointer bg-secondary font-semibold flex items-center gap-2 roboto xl:justify-start justify-center"
              onClick={openAccountModal}
              type="button"
            >
              {icon && <span>{icon}</span>}
              Disconnect
            </button>
            <button
              className="px-4 py-2 text-white bg-primary rounded-full font-semibold flex items-center gap-2 roboto xl:justify-start justify-center"
              onClick={openChainModal}
              type="button"
            >
             
             <img src={ChainImg} alt="chain" />
             Select Chain
            </button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
