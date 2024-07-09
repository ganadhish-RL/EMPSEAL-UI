import React, { useEffect } from "react";
import Eth from "../../assets/images/eth.png";
import Bi from "../../assets/images/bi.png";
import Arrow from "../../assets/images/icon-wrapper.png";
import Line from "../../assets/images/Line 106.png";
import tokens from "../tokenList.json";
import adapters from "../adapters.json";
import { useStore } from '../../redux/store/routeStore';

const Routing = ({ routing }) => {


  const route = useStore((state) => state.route)
  const adapter = useStore((state) => state.adapter)

  useEffect(() => {
    console.log(route)
    console.log(adapter)
  }, [route, adapter])

  const getImage = (item) => {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].address === item) {
        return tokens[i].image
      }
    }
  };

  const getAdapter = (item) => {
    for (let i = 0; i < adapters.length; i++) {
      if (adapters[i].address === item) {
        return adapters[i].name
      }
    }
  }


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
          {route && route.map((item, index) => (
            index === route.length - 1 ?
              <img className="w-6 h-6" src={getImage(item)} alt="Eth" />
              :
              <>
                <img className="w-6 h-6" src={getImage(item)} alt="Eth" />
                <div className="flex flex-col gap-2">

                  <div className="flex flex-col gap-4">
                    <img src={Arrow} alt="Arrow" />
                    <p className="text-white text-[10px] font-bold roboto">{getAdapter(adapter[index])}</p>
                  </div>
                </div>
              </>
          ))}
          {/* <img src={Arrow} alt="Arrow" />

          <img src={Eth} alt="Eth" />
          <img src={Arrow} alt="Arrow" />


          <img src={Eth} alt="Eth" />
          <img src={Arrow} alt="Arrow" />

          <img src={Eth} alt="Eth" />
          <img src={Arrow} alt="Arrow" />

          <img src={Bi} alt="Bi" /> */}
        </div>
      </div>
    </>
  );
};

export default Routing;
