import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/swap-emp.png";
import Sett from "../../assets/images/setting.png";
import Ar from "../../assets/images/arrow.svg";
import Usdc from "../../assets/images/usdc.svg";
import Refresh from "../../assets/images/refresh.svg";
import Info from "../../assets/images/info.svg";
import { Link } from "react-router-dom";
import Amount from "./Amount";
import Token from "./Token";
import { useAccount, useBalance, useReadContract, useReadContracts } from "wagmi";
import { RouterABI } from "./routerAbi";
import { formatUnits } from "viem";
import Tokens from "../tokenList.json";
import { swapTokens } from '../../utils/contractCalls'
import { useStore } from '../../redux/store/routeStore';


const Emp = ({ setPadding }) => {
  const [isAmountVisible, setAmountVisible] = useState(false);
  const [isTokenVisible, setTokenVisible] = useState(false);
  const [order, setOrder] = useState(false);
  const [selectedTokenA, setSelectedTokenA] = useState(Tokens[0]); // Add address
  const [selectedTokenB, setSelectedTokenB] = useState(Tokens[1]); // Add address
  const [isSelectingTokenA, setIsSelectingTokenA] = useState(true);
  const [amountOut, setAmountOut] = useState("0");
  const [amountIn, setAmountIn] = useState("0");
  const [swapStatus, setSwapStatus] = useState("IDLE");
  const [swapHash, setSwapHash] = useState("");
  const [tradeInfo, setTradeInfo] = useState(undefined);
  const { address, isConnected, chain } = useAccount();


  function setPath(path) {
    useStore.setState({ route: path })
  }

  const WETH_ADDRESS = "0xa1077a294dde1b09bb078844df40758a5d0f9a27";
  const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";
  const handleTokenSelect = (token) => {
    if (isSelectingTokenA) {
      setSelectedTokenA(token);
    } else {
      setSelectedTokenB(token);
    }
    setTokenVisible(false);
  };

  const convertToBigInt = (amount, decimal) => {
    return BigInt(amount * 10 ** decimal);
  };

  const { data, isLoading: quoteLoading, refetch: quoteRefresh, error } = useReadContract({
    abi: RouterABI,
    address: "0x91C2c07A1DdDF9a25Dc96517B62BEF0E52316B32",
    functionName: "findBestPath",
    args: [
      amountIn && selectedTokenA && parseFloat(amountIn) ? convertToBigInt(parseFloat(amountIn), 18) : BigInt(0),
      selectedTokenA?.address === EMPTY_ADDRESS ? WETH_ADDRESS : selectedTokenA?.address,
      selectedTokenB?.address === EMPTY_ADDRESS ? WETH_ADDRESS : selectedTokenB?.address,
      BigInt("3")
    ],
  });

  const { data: singleToken, isLoading: singleTokenLoading, refetch: singleTokenRefresh, error: singleTokenError } = useReadContract({
    abi: RouterABI,
    address: "0x91C2c07A1DdDF9a25Dc96517B62BEF0E52316B32",
    functionName: "findBestPath",
    args: [
      BigInt(1),
      selectedTokenA?.address === EMPTY_ADDRESS ? WETH_ADDRESS : selectedTokenA?.address,
      selectedTokenB?.address === EMPTY_ADDRESS ? WETH_ADDRESS : selectedTokenB?.address,
      BigInt("3")
    ],
  });

  useEffect(() => {
    console.log(singleToken)
  }, [singleToken])

  useEffect(() => {
    if (data && data.amounts && data.amounts.length > 0) {
      if (data) {
        if (data?.amounts.length > 0 && selectedTokenB) {
          console.log(data)
          setPath(data.path)
          if (
            (selectedTokenA?.address === EMPTY_ADDRESS &&
              selectedTokenB?.address === WETH_ADDRESS) ||
            (selectedTokenA?.address === WETH_ADDRESS &&
              selectedTokenB?.address === EMPTY_ADDRESS)
          ) {
            setAmountOut(amountIn);
          } else {
            setAmountOut(
              formatUnits(
                data?.amounts[data.amounts.length - 1],
                parseInt(selectedTokenB.decimal)
              )
            );
          }
          const trade = {
            amountIn: data.amounts[0],
            amountOut: data.amounts[data.amounts.length - 1],
            amounts: data.amounts,
            path: data.path,
            pathTokens: data.path.map((pathAddress, index) => {
              return (
                Tokens.find((token) => token.address == pathAddress) ||
                Tokens[0]
              );
            }),
            adapters: data.adapters,
          };
          setTradeInfo(trade);
        } else {
          setAmountOut("0");
          setTradeInfo(undefined);
        }
      } else {
        setAmountOut("0");
        setTradeInfo(undefined);
      }
    }
  }, [data, error])

  useEffect(() => {
    quoteRefresh()
  }, [amountIn, selectedTokenA, selectedTokenB])

  const confirmSwap = async () => {
    await swapTokens(
      (_swapStatus) => {
        setSwapStatus(_swapStatus);
      },
      (hash) => {
        setSwapHash(hash);
      },
      selectedTokenA?.address,
      selectedTokenB?.address,
      address,
      tradeInfo
    );
  }

  return (
    <>
      <div className="w-full border border-white rounded-xl py-10 2xl:px-16 lg:px-12 md:px-8 px-4 bg-black md:mt-0 mt-4">
        <img src={Logo} alt="Logo" className=" mx-auto" />
        <div className="flex md:justify-between justify-center gap-3 items-center md:flex-nowrap flex-wrap my-6 lg:px-1 px-0">
          <div
            onClick={() => {
              setOrder(false);
              setPadding("lg:h-[295px] h-full");
            }}
            className={`${order ? "border-[#3b3c4e]" : "border-[#FF9900]"
              } cursor-pointer md:max-w-[200px] w-full h-[28px] flex justify-center items-center rounded-md border text-white text-[15px] font-bold roboto`}
          >
            SWAP
          </div>
          <div className="min-w-[27px] h-[25px]">
            <img src={Sett} alt="Sett" className="w-full h-full" />
          </div>
          <div
            onClick={() => {
              setOrder(true);
              setPadding("md:pb-[160px] pb-10");
            }}
            className={`${order ? "border-[#FF9900]" : "border-[#3b3c4e]"
              } cursor-pointer md:max-w-[200px] w-full h-[28px] flex justify-center items-center rounded-md border text-white text-[15px] font-bold roboto`}
          >
            LIMIT ORDER
          </div>
        </div>
        <div className="flex justify-between gap-3 items-center lg:px-2">
          <div className="text-zinc-200 text-base font-normal roboto leading-normal">Pay</div>
          <div className="text-center">
            <span className="text-gray-400 text-base font-normal roboto leading-normal">
              Available
            </span>
            <span className="text-gray-400 text-base font-normal roboto leading-normal"> : </span>
            <span className="text-white text-base font-normal roboto leading-normal">0</span>
          </div>
        </div>
        <div className="flex w-full border border-[#3b3c4e] px-4 py-4 rounded-2xl mt-2">
          <div
            onClick={() => {
              setIsSelectingTokenA(true);
              setTokenVisible(true);
            }}
            className="flex justify-between gap-4 items-center cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <img className="w-4 h-4" src={selectedTokenA.image} alt={selectedTokenA.name} />
              <div className="text-white text-base font-bold roboto leading-normal bg-black appearance-none outline-none">
                {selectedTokenA.ticker}
              </div>
            </div>
            <svg
              className="pointer-events-none"
              width={11}
              height={7}
              viewBox="0 0 11 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1.56934L5.5 5.56934L9.5 1.56934"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="0"
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value)}
            className="text-white text-xl font-bold roboto text-right w-full leading-7 outline-none border-none bg-transparent"
          />
        </div>
        <div
          className={`lg:px-1 mt-3 flex gap-4 lg:flex-nowrap flex-wrap items-center ${order ? "" : "hidden"
            }`}
        >
          <div className="md:w-[300px] w-full">
            <div className="text-center mb-2">
              <span className="text-[#DCDDE5] text-base font-normal roboto leading-[18.31px]">
                Sell {selectedTokenA.ticker} at rate(
              </span>
              <span className="text-amber-500 text-base font-normal roboto leading-[18.31px]">
                -57%
              </span>
              <span className="text-[#DCDDE5] text-base font-normal roboto leading-[18.31px]">)</span>
            </div>
            <div className="w-full border border-[#3b3c4e] px-4 py-[10px] rounded-xl flex justify-between">
              <input
                type="text"
                placeholder="0"
                className="text-white text-xl font-bold roboto text-left w-full leading-7 outline-none border-none bg-transparent"
              />
              <div className="flex gap-2 items-center">
                <img src={selectedTokenA.image} alt={selectedTokenA.name} />
                <select className="text-white text-base font-bold roboto leading-normal bg-black appearance-none outline-none w-[50px]">
                  <option value="0">{selectedTokenA.name}</option>
                  <option value="1">USDT</option>
                </select>
              </div>
            </div>
          </div>
          <div className="md:w-[142px] w-full">
            <div className="text-center mb-3">
              <div className="text-center text-gray-400 text-base font-normal roboto leading-[18.31px]">
                Expiry
              </div>
            </div>
            <div className="w-full border border-[#3b3c4e] px-4 py-[13px] rounded-xl flex justify-between">
              <select className="text-white text-base font-bold roboto leading-normal bg-black w-full outline-none">
                <option value="0"> 0 days</option>
                <option value="1"> 1 days</option>
              </select>
            </div>
          </div>
        </div>
        <img src={Ar} alt="Ar" className="mx-auto mt-6" />
        <div className="flex justify-between gap-3 items-center">
          <div className="text-zinc-200 text-base font-normal roboto leading-normal">Receive</div>
          <div className="text-center">
            <span className="text-gray-400 text-base font-normal roboto leading-normal">
              Available
            </span>
            <span className="text-gray-400 text-base font-normal roboto leading-normal"> : </span>
            <span className="text-white text-base font-normal roboto leading-normal">0</span>
          </div>
        </div>

        <div className="flex w-full border border-[#3b3c4e] px-4 py-4 rounded-2xl mt-3">
          <div
            onClick={() => {
              setIsSelectingTokenA(false);
              setTokenVisible(true);
            }}
            className="flex justify-between gap-4 items-center cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <img className="w-4 h-4" src={selectedTokenB.image} alt={selectedTokenB.name} />
              <div className="text-white text-base font-bold roboto leading-normal bg-black appearance-none outline-none">
                {selectedTokenB.ticker}
              </div>
            </div>
            <svg
              className="pointer-events-none"
              width={11}
              height={7}
              viewBox="0 0 11 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1.56934L5.5 5.56934L9.5 1.56934"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="0"
            value={parseFloat(amountOut).toFixed(6)}
            className="text-white text-xl font-bold roboto text-right w-full leading-7 outline-none border-none bg-transparent"
          />
        </div>
        <div className="flex justify-center items-center gap-2 my-4">
          <div className="text-white text-base font-normal roboto leading-normal">
            1 {selectedTokenA.name} = {singleToken && singleToken.amounts && singleToken.amounts[singleToken.amounts.length - 1] ? parseFloat(singleToken.amounts[singleToken.amounts.length - 1].toString()).toFixed(6) : "0"} {selectedTokenB.ticker}
          </div>
          <div className="cursor-pointer" onClick={() => singleTokenRefresh()}>
            <img src={Refresh} alt="Refresh" />
          </div>
        </div>
        <button
          onClick={() => setAmountVisible(true)}
          className="w-full h-14 flex justify-center items-center rounded-xl bg-[#FF9900] roboto text-black text-base font-bold border hover:text-[#FF9900] border-[#FF9900] hover:bg-transparent"
        >
          {quoteLoading ? "Loading..." : "Confirm Order"}
        </button>
        <div className="md:max-w-[403px] w-full mx-auto my-5 h-px relative bg-gray-700" />
        <div className="px-1 w-full mx-auto">
          <div className="flex justify-between gap-2 items-center">
            <div className="text-gray-400 text-[12px] font-normal roboto leading-none flex gap-1 items-center">
              Amount to Send
              <img src={Info} alt="Info" />
            </div>
            <div className="text-right text-white text-[12px] font-normal roboto leading-none">
              {amountIn} {selectedTokenA.ticker}
            </div>
          </div>
          <div className="flex justify-between gap-2 items-center my-2">
            <div className="text-gray-400 text-[12px] font-normal roboto leading-none flex gap-1 items-center">
              Min. to Receive
              <img src={Info} alt="Info" />
            </div>
            <div className="text-right text-white text-[12px] font-normal roboto leading-none">
              {amountOut} {selectedTokenB.ticker}
            </div>
          </div>
          <div className="flex justify-between gap-2 items-center">
            <div className="text-gray-400 text-[12px] font-normal roboto leading-none flex gap-1 items-center">
              EMPX Swap Fee
              <img src={Info} alt="Info" />
            </div>
            <div className="text-right text-white text-[12px] font-normal roboto leading-none">
              0.28 PLS
            </div>
          </div>
          <div className="flex justify-between gap-2 items-center mt-2">
            <div className="text-gray-400 text-[12px] font-normal roboto leading-none flex gap-1 items-center">
              Contract Spender
              <img src={Info} alt="Info" />
            </div>
            <Link to="https://snowtrace.io/address/0xC4729E56b831d74bBc18797e0e17A295fA77488c" target="_blank">
              <div className="text-right text-white text-[12px] font-normal roboto leading-none">
                0xC472...488c
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div aria-label="Modal">
        {isAmountVisible && <Amount onClose={() => setAmountVisible(false)} amountIn={amountIn} amountOut={parseFloat(amountOut).toFixed(6)} tokenA={selectedTokenA} tokenB={selectedTokenB} refresh={quoteRefresh} confirm={confirmSwap} />}
      </div>
      <div aria-label="Modal1">
        {isTokenVisible && <Token onClose={() => setTokenVisible(false)} onSelect={handleTokenSelect} />}
      </div>
    </>
  );
};

export default Emp;
