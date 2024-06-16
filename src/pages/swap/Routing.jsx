import React from "react";
import Eth from "../../assets/images/eth.png";
import Bi from "../../assets/images/bi.png";
import Arrow from "../../assets/images/icon-wrapper.png";
import Line from "../../assets/images/Line 106.png";

const Routing = ({ padding }) => {
  return (
    <>
      {/* ${padding} */}
      {/* md:pt-10 pt-10 */}
      <div
        className={`w-full border border-white rounded-xl py-4  2xl:px-7 lg:px-5 px-4 bg-black`}
      >
        <div className="flex justify-center gap-2 md:flex-nowrap flex-wrap">
          <button className="w-[85px] h-[28px] flex justify-center items-center rounded-md bg-black roboto text-[#FF9900] text-[8.24px] font-bold border hover:text-black border-[#FF9900] hover:bg-[#FF9900]">
            Routing
          </button>
        </div>
        <div className="flex justify-between gap-2 items-center mt-6">
          <img src={Eth} alt="Eth" />
          <img src={Line} alt="Line" />
          <img src={Arrow} alt="Arrow" />
          <div className="w-[180px] border border-white border-opacity-50 px-2 py-3 rounded-xl">
            <div className="flex gap-3 items-center">
              <img src={Bi} alt="Bi" />
              <div className="text-white text-sm font-bold roboto leading-[20.93px]">
                BUSD
              </div>
            </div>
            <div className="mt-3 w-full h-[25px] flex justify-center items-center rounded-md border border-[#FF9900] text-white text-[12px] font-normal roboto">
              Sushiswap 2%
            </div>
            <div className="mt-2 w-full h-[25px] flex justify-center items-center rounded-md border border-[#FF9900] text-white text-[12px] font-normal roboto">
              Uniswap 2%
            </div>
          </div>
          <img src={Arrow} alt="Arrow" />
          <img src={Line} alt="Line" />
          <img src={Bi} alt="Bi" />
        </div>
      </div>
    </>
  );
};

export default Routing;
