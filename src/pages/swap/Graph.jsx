import React, { useEffect, useState } from "react";
import { useStore } from '../../redux/store/routeStore';
import axios from 'axios';
import { getTokenInfoByAddress } from '../../utils/utils';
import { Chart } from 'react-google-charts';

const Graph = ({ padding }) => {
  const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";
  const path = useStore((state) => state.path);
  const [ovhList, setOvhList] = useState([]);
  const [stats, setStats] = useState({
    artworkSold: 180,
    artworkCancel: 8,
    totalEarning: 262,
  });

  useEffect(() => {
    console.log(path);
    getGraph();
  }, [path]);

  const transformData = (apiData) => {
    const ohlcvList = apiData.data.attributes.ohlcv_list;
    const chartData = [
      ['Date', 'Value'],
    ];

    ohlcvList.forEach((item) => {
      const date = new Date(item[0] * 1000);
      chartData.push([date, item[4]]); // Using closing price as an example
    });

    return chartData;
  };

  const getGraph = async () => {
    let response;
    if (!getTokenInfoByAddress(path[0]) || !getTokenInfoByAddress(path[1])) {
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
      let pairAddress = pairInfo.data.data[0].id.replace("pulsechain_", "");
      response = await axios.get(
        `https://api.geckoterminal.com/api/v2/networks/pulsechain/pools/${pairAddress}/ohlcv/day?aggregate=1`
      );
    }
    if (response) {
      setOvhList(transformData(response.data));
    }
  };

  return (
    <div className={`w-full border_gradient rounded-xl bg-transparent p-6 ${padding} flex`}>
      {/* Statistics Section */}
      <div className="flex flex-col text-white w-1/3 mr-16 relative z-10">
        <h2 className="text-lg font-bold mb-4 text-sm">Statistics</h2>
        <div className="flex flex-col gap-3 text-xs">
          <div className="grid grid-cols-2 py-2 px-3 gap-  bg-[#222222] rounded-lg text-[#FF9900] w-[10rem] ">
            <div className="w-[5rem]">Artwork Sold</div>
            <div className="text-white text-end">{stats.artworkSold}</div>
          </div>
          <div className="grid grid-cols-2 py-2 px-3 gap-  bg-[#222222] rounded-lg text-[#FF9900] w-[10rem]">
            <div className="w-[6rem]">Artwork Cancel</div>
            <div className="text-white text-end">{stats.artworkCancel}</div>
          </div>
          <div className="grid grid-cols-2 py-2 px-3 gap bg-[#222222] rounded-lg text-[#FF9900] w-[10rem]">
            <div className="w-[6rem]">Total Earning</div>
            <span className="text-white text-end">{stats.totalEarning} ETH</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex flex-col items-start w-3/4 bg-[#222222] relative z-10">
        <h3 className="text-white text-md mb-2 text-xs ps-4 pt-3">Overall Performance</h3>
        <Chart
          width={'100%'}
          height={'120px'}
          chartType="AreaChart"
          className="chart"
          loader={<div>Loading Chart...</div>}
          data={ovhList}
          options={{
            legend: 'none',
            colors: ['#FF9900'],
            vAxis: { gridlines: { color: 'transparent' }, textPosition: 'none' },
            hAxis: { gridlines: { color: 'transparent' }, textPosition: 'none' },
            backgroundColor: 'transparent',
            lineWidth: 0,
            chartArea: { width: '90%', height: '50%' },
          }}
        />
       
      </div>
    </div>
  );
};

export default Graph;
