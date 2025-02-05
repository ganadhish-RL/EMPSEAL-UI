import React from "react";
import Normal from "./Normal";
import { Helmet } from "react-helmet";

const Main = () => {
  return (
    <>
      {/* For SEO */}
      <Helmet>
        <title>
          Decentralized On chain Aggregation, Trading & Swapping with EMPSEAL:
          On-Chain Efficiency Meets Transparency
        </title>
        <meta
          name="description"
          content="Empower your cryptocurrency trading with EMPSEAL's decentralized swap platform. Enjoy efficient, on-chain aggregation for the best prices . Trade, swap, and explore a censorship-resistant environment designed for everyone."
        />
        <meta
          name="keywords"
          content="EMPSEAL,Trading,Swapping,Crypto Currency,Decentralized Exchange,Aggregation,Buy Sell Crypto,Onchain Aggregator,Best Prices,Censorship Resistant,Efficient Trading"
        />
      </Helmet>
      <Normal />
    </>
  );
};

export default Main;
