import React, { useEffect } from "react";
import Refresh from "../../assets/images/refresh.svg";
import Highlight from "../../assets/images/highlight.png";
import { useStore } from '../../redux/store/routeStore';
import axios from 'axios';
import { Chart } from "chart.js";

// import Busd from "./BusdGraph";
const Graph = ({ padding }) => {

  const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";
  const path = useStore((state) => state.path)

  useEffect(() => {
    console.log(path)
    getGraph()
  }, [path])

  const getGraph = async () => {



    if (path[0] === EMPTY_ADDRESS) {
      const pairInfo = await axios.get('https://api.dexscreener.com/latest/dex/tokens/' + path[1]);
      console.log(pairInfo)
      let pairAddress = pairInfo.data.pairs[0].pairAddress;
      for (let i = 0; i < pairInfo.data.pairs.length; i++) {
        if (pairInfo.data.pairs[i].quoteToken.symbol === "PLSX") {
          pairAddress = pairInfo.data.pairs[i].pairAddress;
          break;
        }
      }
      const response = await axios.get(`https://api.dexscreener.com/latest/pair/${pairAddress}`);
      console.log(response.data)
    } else {
      const pairInfo = await axios.get('https://api.dexscreener.com/latest/dex/tokens/' + path[0]);
      console.log(pairInfo)
      let pairAddress = pairInfo.data.pairs[0].pairAddress;
      for (let i = 0; i < pairInfo.data.pairs.length; i++) {
        if (pairInfo.data.pairs[i].quoteToken.symbol === "PLSX") {
          pairAddress = pairInfo.data.pairs[i].pairAddress;
          break;
        }
      }
      const response = await axios.get(`https://api.dexscreener.com/latest/pair/${pairAddress}`);
      console.log(response.data)
    }

    console.log(response.data)
  }


  return (
    <>
      <div
        className={`w-full border-[2px] border-[#FF9900] rounded-xl py-4 bg-black ${padding}`}
      >
        <div className="px-4 mt-2">
          <div className="w-[142px] h-[24px] border border-[#FF9900] rounded-[8px] flex">
            <div className="w-[32px] h-[22px] italic roboto rounded-l-md bg-[#FF9900] text-black text-[7.32px] font-bold flex justify-center items-center">
              3 M
            </div>
            <div className="w-[32px] h-[22px] italic roboto bg-black text-[#FF9900] border-r border-[#FF9900] text-[7.32px] font-bold flex justify-center items-center">
              1 M
            </div>
            <div className="w-[32px] h-[22px] italic roboto bg-black text-[#FF9900] border-r border-[#FF9900] text-[7.32px] font-bold flex justify-center items-center">
              7 D
            </div>
            <div className="w-[49px] h-[22px] italic roboto rounded-r-md bg-black text-[#FF9900] border-r border-[#FF9900] text-[7.32px] font-bold flex justify-center items-center">
              24 H
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-2 px-4 mt-2">
          <div className="text-white text-[9px] font-bold roboto leading-normal">
            USDC/BUSD
          </div>
          <img src={Refresh} alt="Refresh" className="w-4" />
        </div>
        <div className="px-4 text-[#FF9900] text-xs font-medium roboto tracking-tight mt-1">
          $ 9784.79
        </div>
        <div className="flex gap-2 items-center mt-1 px-4">
          <svg
            width={15}
            height={10}
            viewBox="0 0 15 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.9944 2.92432H9.24023V0.924316H13.2402H14.2402V1.92432V5.92432H12.2402V4.50687L8.94248 7.80462L8.23537 8.51173L7.52826 7.80462L5.41902 5.69539L2.03873 9.0757L0.624512 7.66149L4.71191 3.57407L5.41902 2.86696L6.12613 3.57407L8.23537 5.6833L10.9944 2.92432Z"
              fill="#00DEA3"
            />
          </svg>

          <span className="text-[#00DEA3] text-[10px] font-medium roboto">
            7.2%
          </span>
        </div>

        {/* <div>
          <Busd />
        </div> */}
      </div>
    </>
  );
};

export default Graph;
