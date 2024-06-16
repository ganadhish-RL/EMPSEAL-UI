import React from "react";
import Emp from "./Emp";
import Wallet from "./Wallet";
import Routing from "./Routing";
import Graph from "./Graph";
import Table from "./Table";

const Normal = () => {
  const [padding, setPadding] = React.useState("lg:h-[295px] h-full");
  return (
    <>
      <div className="bg-[#121214] py-3 relative">
        <div className="md:max-w-[1100px] mx-auto w-full px-4 flex justify-center xl:gap-4 gap-4 items-start 2xl:pt-10 py-2 md:flex-nowrap flex-wrap">
          <div className="md:max-w-[620px] w-full">
            <div className="md:hidden block">
              <Wallet />
            </div>
            <Emp setPadding={setPadding} />
          </div>
          <div className="md:max-w-[360px] w-full">
            <div className="md:block hidden">
              <Wallet />
            </div>
            <div className="mt-3">
              <Routing />
            </div>
            <div className="mt-3">
              <Graph padding={padding} />
            </div>
          </div>
        </div>
        <div className="md:max-w-[1030px] mx-auto w-full px-4 flex justify-center xl:gap-9 gap-4 items-start mt-1 md:flex-nowrap flex-wrap h-full">
          {/* <div className="md:max-w-[470px] w-full h-full">
            <Graph />
          </div> */}
          <div className="w-full h-full">
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default Normal;
