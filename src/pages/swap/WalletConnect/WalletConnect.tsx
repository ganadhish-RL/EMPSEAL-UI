"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";

export default function WalletConnect({ icon }: { icon?: React.ReactNode }) {
  const { address, isConnected, chainId } = useAccount();

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

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="px-6 py-2 text-white rounded-md shadow-sm cursor-pointer bg-accent font-semibold roboto flex items-center gap-2"
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
                    className="bg-[#FF494A] px-4 py-2 rounded text-white flex items-center gap-2"
                    onClick={openChainModal}
                    type="button"
                  >
                    {icon && <span>{icon}</span>}
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex flex-row justify-center items-center gap-4">
                  <button
                    className="px-4 xl:px-6 py-2 text-white rounded-full shadow-sm cursor-pointer bg-secondary font-semibold flex items-center gap-2"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {icon && <span>{icon}</span>}
                    {account.ensName ? account.ensName : account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
