import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  phantomWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { http, createConfig } from 'wagmi';
import { pulsechain, bsc,arbitrum, avalanche, polygon, sei, mainnet, base, polygonZkEvm, moonriver, fantom, aurora, optimism, cronos, gnosis, linea, scroll, blast, fuse, moonbeam, celo, boba, mantle,manta, zetachain,telos, kava, zksync, arbitrumNova, tron,metis, bahamut, mode, rootstock, merlin, zkLinkNova, taiko, fraxtal, gravity,morph,sonic } from 'wagmi/chains';

// Wallet configuration
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Suggested',
      wallets: [
        metaMaskWallet,
        phantomWallet,
        rainbowWallet,
        coinbaseWallet,
        walletConnectWallet,
      ],
    },
  ],
  { appName: 'RainbowKit App', projectId: 'YOUR_PROJECT_ID' },
);

export const config = getDefaultConfig({
  appName: 'Emplseal',
  projectId: 'YOUR_PROJECT_ID',
  chains: [pulsechain,mainnet, bsc, arbitrum, avalanche, polygon, optimism, cronos, base, sei, polygonZkEvm, moonriver, fantom, aurora, gnosis, linea, scroll, blast, fuse, moonbeam, celo, boba, mantle,manta, zetachain,telos, kava, zksync, arbitrumNova, tron,metis, bahamut, mode, rootstock, merlin, zkLinkNova, taiko, fraxtal, gravity,morph,sonic],
  ssr: true, 
  connectors,
});
