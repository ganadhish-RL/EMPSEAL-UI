import React, { useEffect, useState } from "react";
import Refresh from "../../assets/images/refresh.svg";
import { useStore } from "../../redux/store/routeStore";
import axios from "axios";
import { getTokenInfoByAddress } from "../../utils/utils";
import { Chart } from "react-google-charts";

const Graph = ({ padding }) => {
  const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";
  const path = useStore((state) => state.path);
  const [ovhList, setOvhList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [baseName, setBaseName] = useState("");
  const [quoteName, setQuoteName] = useState(""); 
  const [highValue, setHighValue] = useState(null);

  useEffect(() => {
    getGraph();
  }, [path]);

  const transformData = (apiData) => {
    const ohlcvList = apiData.data.attributes.ohlcv_list;
    const chartData = [["Date", "Open", "High", "Low", "Close"]];

    ohlcvList.forEach((item) => {
      const date = new Date(item[0] * 1000);
      chartData.push([date, item[1], item[2], item[3], item[4]]);
    });

    return chartData;
  };

  const getGraph = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (!getTokenInfoByAddress(path[0]) || !getTokenInfoByAddress(path[1])) {
        setLoading(false);
        return;
      }

      if (path[0] === EMPTY_ADDRESS) {
        const pairInfo = await axios.get(
          `https://api.geckoterminal.com/api/v2/search/pools?query=${getTokenInfoByAddress(path[1]).ticker}&network=pulsechain&page=1`
        );
        let pairAddress = pairInfo.data.data[0].id.replace("pulsechain_", "");
        response = await axios.get(
          `https://api.geckoterminal.com/api/v2/networks/pulsechain/pools/${pairAddress}/ohlcv/day?aggregate=1`
        );
      } else {
        const pairInfo = await axios.get(
          `https://api.geckoterminal.com/api/v2/search/pools?query=${getTokenInfoByAddress(path[0]).ticker}&network=pulsechain&page=1`
        );
        console.log(pairInfo, 'pair')
        let pairAddress = pairInfo.data.data[0].id.replace("pulsechain_", "");
        response = await axios.get(
          `https://api.geckoterminal.com/api/v2/networks/pulsechain/pools/${pairAddress}/ohlcv/day?aggregate=1`
        );
      }

      console.log(response.data);

      if (response) {
        setOvhList(transformData(response.data));


        const ohlcvList = response.data.data.attributes.ohlcv_list;
        const high = Math.max(...ohlcvList.map((item) => item[2]));
        setHighValue(high);


        const { base, quote } = response.data.meta;
        setBaseName(base.name);
        setQuoteName(quote.name);
      }
    } catch (error) {
      setError("Failed to load graph data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full border-[2px] border-[#FF9900] rounded-xl pt-4 pb-12 bg-black ${padding}`}>
      {loading && <div>Loading Chart...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="flex justify-start gap-2 px-4 mt-2">
        <div className="text-white text-[14px] font-bold roboto leading-normal">
          {baseName} / {quoteName}
        </div>
      </div>

      {/* High Value Display */}
      {highValue !== null && (
        <div className="text-white text-[12px] px-4 pt-2">
          <strong>Price:</strong> {highValue}
        </div>
      )}

      <Chart
        width={"100%"}
        height={"100%"}
        chartType="AreaChart"
        loader={<div>Loading Chart...</div>}
        data={ovhList}
        options={{
          legend: "none",
          vAxis: {
            gridlines: { color: "transparent" },
          },
          hAxis: {
            gridlines: { color: "transparent" },
          },
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
};

export default Graph;
