import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http, createConfig } from "wagmi";
import { pulsechain, arbitrum, avalanche } from "wagmi/chains";

// export const config = createConfig({
//   chains: [mode, hardhat],
//   transports: {
//     [mode.id]: http(),
//     [hardhat.id]: http(),
//   },
// });


export const config = getDefaultConfig({
  appName: "Emplseal",
  projectId: "YOUR_PROJECT_ID",
  chains: [pulsechain, arbitrum, avalanche],
  ssr: true, // If your dApp uses server side rendering (SSR)
});