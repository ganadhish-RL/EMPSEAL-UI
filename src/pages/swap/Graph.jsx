import React, { useEffect, useState, useRef } from "react";
import Refresh from "../../assets/images/refresh.svg";
import { useStore } from "../../redux/store/routeStore";
import axios from "axios";
import { getTokenInfoByAddress } from "../../utils/utils";
import { Chart } from "react-google-charts";
import { useReadContract } from "wagmi";
import { ERC20_ABI } from "./tokenFetch";

const PRICE_CHART_ID = "price-chart-widget-container";

export const PriceChartWidget = ({ tokenAddress }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const loadWidget = () => {
      try {
        if (typeof window.createMyWidget === "function") {
          window.createMyWidget(PRICE_CHART_ID, {
            autoSize: true,
            chainId: "0x171",
            tokenAddress,
            defaultInterval: "1D",
            timeZone:
              Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Etc/UTC",
            theme: "moralis",
            locale: "en",
            backgroundColor: "#000000",
            gridColor: "#000000",
            textColor: "#ffffff",
            candleUpColor: "#4CE666",
            candleDownColor: "#E64C4C",
            hideLeftToolbar: true,
            hideTopToolbar: false,
            hideBottomToolbar: true,
          });
        } else {
          console.error("createMyWidget function is not defined.");
        }
      } catch (error) {
        console.error("Failed to load widget:", error);
      }
    };

    if (!document.getElementById("moralis-chart-widget")) {
      const script = document.createElement("script");
      script.id = "moralis-chart-widget";
      script.src = "https://moralis.com/static/embed/chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = loadWidget;
      script.onerror = () => {
        console.error("Failed to load the chart widget script.");
      };
      document.body.appendChild(script);
    } else {
      loadWidget();
    }
  }, [tokenAddress]);

  return (
    <div className="w-full max-w-[20rem] sm:max-w-[28rem] rounded-xl flex justify-center m-1 h-[25rem] md:mx-auto sm:px-4 ">
      {/* <div style={{ width: "29rem", height: "17rem" }}> */}

      <div
        className="w-full md:max-w-[28rem] max-w-23 h-full"
        id={PRICE_CHART_ID}
        ref={containerRef}
        // style={{ width: "100%", height: "150%" }}
      />
    </div>
  );
};

const Graph = ({ padding }) => {
  const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";
  const path = useStore((state) => state.path);
  // const [ovhList, setOvhList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [baseName, setBaseName] = useState("");
  // const [quoteName, setQuoteName] = useState("");
  // const [highValue, setHighValue] = useState(null);
  // const [tokenSymbol, setTokenSymbol] = useState("");

  const finalTokenInfo = path[0] === EMPTY_ADDRESS ? path[1] : path[0];

  return (
    <>
      <div
        className={` border-[2px] border-[#FF9900] rounded-xl pt-4  bg-black ${padding}`}
      >
        {/* {loading && (
          <div className="text-white text-center py-4">Loading Chart...</div>
        )} */}
        <PriceChartWidget tokenAddress={finalTokenInfo} />
      </div>
    </>
  );

  // useEffect(() => {
  //   const fetchTokenData = async () => {
  //     // Reset states
  //     setLoading(true);
  //     setError(null);

  //     const finalTokenInfo = path[0] === EMPTY_ADDRESS ? path[1] : path[0];
  //     try {
  //       // Get token info from predefined list or fetch from contract
  //       let tokenInfo = getTokenInfoByAddress(
  //         path[0] === EMPTY_ADDRESS ? path[1] : path[0]
  //       );

  //       // Fetch pool info
  //       const pairInfo = await axios.get(
  //         // `https://api.geckoterminal.com/api/v2/search/pools?query=${searchQuery}&network=pulsechain&page=1`
  //         `https://api.geckoterminal.com/api/v2/networks/pulsechain/tokens/${finalTokenInfo.toLowerCase()}/pools?page=1`
  //       );

  //       if (!pairInfo.data.data || pairInfo.data.data.length === 0) {
  //         throw new Error("No pool data found");
  //       }

  //       const pairAddress = pairInfo.data.data[0].id.replace("pulsechain_", "");
  //       // console.log("Pair address: ", pairAddress);

  //       // Fetch OHLCV data
  //       const response = await axios.get(
  //         `https://api.geckoterminal.com/api/v2/networks/pulsechain/pools/${pairAddress.toLowerCase()}/ohlcv/day?aggregate=1`
  //       );

  //       if (response.data) {
  //         setOvhList(transformData(response.data));

  //         const ohlcvList = response.data.data.attributes.ohlcv_list;
  //         const high = Math.max(...ohlcvList.map((item) => item[2]));
  //         setHighValue(high);

  //         const { base, quote } = response.data.meta;
  //         setBaseName(base.name);
  //         setQuoteName(quote.name);
  //       }
  //     } catch (error) {
  //       console.error("Graph fetch error:", error);
  //       setError("Failed to load graph data. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const timeout = setTimeout(() => {
  //     if (path && (path[0] || path[1])) {
  //       fetchTokenData();
  //     }
  //   }, 1000);

  //   // setOvhList([]);
  //   // setBaseName("");
  //   // setQuoteName("");
  //   // setHighValue(null);
  //   return () => clearTimeout(timeout);
  // }, [path]);

  // const transformData = (apiData) => {
  //   const ohlcvList = apiData.data.attributes.ohlcv_list;
  //   const chartData = [["Date", "Open", "High", "Low", "Close"]];

  //   ohlcvList.forEach((item) => {
  //     const date = new Date(item[0] * 1000);
  //     chartData.push([date, item[1], item[2], item[3], item[4]]);
  //   });

  //   return chartData;
  // };

  // return (
  //   <div
  //     className={`w-full border-[2px] border-[#FF9900] rounded-xl pt-4  bg-black ${padding}`}
  //   >
  //     {loading && (
  //       <div className="text-white text-center py-4">Loading Chart...</div>
  //     )}
  //     {error && <div className="text-red-500 text-center py-4">{error}</div>}

  //     <div className="flex justify-start gap-2 px-4 mt-2">
  //       <div className="text-white text-[14px] font-bold roboto leading-normal">
  //         {baseName || "Loading..."}/WPLS
  //       </div>
  //     </div>

  //     {highValue !== null && (
  //       <div className="text-white text-[12px] px-4 pt-2 roboto">
  //         <strong>Price:</strong> {highValue}
  //         {/* <strong>Price High:</strong> {parseFloat(highValue).toFixed(18)} */}
  //       </div>
  //     )}

  //     <Chart
  //       width={"100%"}
  //       height={"100%"}
  //       chartType="AreaChart"
  //       loader={<div>Loading Chart...</div>}
  //       data={ovhList}
  //       options={{
  //         legend: "none",
  //         vAxis: {
  //           gridlines: { color: "transparent" },
  //         },
  //         hAxis: {
  //           gridlines: { color: "transparent" },
  //         },
  //         backgroundColor: "transparent",
  //       }}
  //     />
  //   </div>
  // );
};

export default Graph;
