import React from 'react';
import Logo from '../../assets/images/logo_nft.png';
import Fire from '../../assets/images/fire.png';
import Bracket from '../../assets/images/bracket.png';
import Market from '../../assets/images/market.png';
import Git from '../../assets/images/github.png';
import Tx from '../../assets/images/tele.png';
import X from '../../assets/images/x.png';
import Master from '../../assets/images/master.png';
import Star from '../../assets/images/star.png';
import Cell from '../../assets/images/cell.gif';
import Dia from '../../assets/images/diamond.png';
import Stone from '../../assets/images/bridge.png';
import User from '../../assets/images/user-nft.svg';
import { Link } from 'react-router-dom';
const NFTMarketplace = () => {
  return (
    <>
      <div className="bg-[#121214] py-3 relative">
        <div className="md:max-w-[1536px] mx-auto w-full px-4 flex justify-center xl:gap-9 gap-4 items-start 2xl:py-10 py-2 md:flex-nowrap flex-wrap">
          <div className="xl:max-w-[450px] lg:max-w-[300px] md:max-w-[220px] w-full text-white rounded-lg">
            <div className="flex flex-row items-center border_gradient p-4  mb-4">
              <div className="pe-5">
                <img src={Logo} alt="Collection Logo" className="w-40 h-40" />
              </div>

              <div>
                <h2 className="text-lg font-bold">Collection Name</h2>
                <p className="text-gray-400">Creator Name</p>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between">
                    <h6>Floor</h6>
                    <h6 className="text-yellow-500">:5M PLS</h6>
                  </div>
                  <div className="flex justify-between">
                    <h6>24H Vol</h6>
                    <h6 className="text-yellow-500">:5M PLS</h6>
                  </div>
                  <div className="flex justify-between">
                    <h6>High Offer</h6>
                    <h6 className="text-yellow-500">:1000 PLS</h6>
                  </div>
                  <div className="flex justify-between">
                    <h6>Total Items</h6>
                    <h6>:10K</h6>
                  </div>
                  <div className="flex justify-between">
                    <h6>Creator Fee</h6>
                    <h6>:10%</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className=" border_gradient   mb-4 ">
              <div className="top_seller p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base">Top Sellers</h2>
                  <h2 className="text-[#FF9900]">See All</h2>
                </div>
              </div>
              <ul className="p-4">
                <li className="flex flex-row items-center justify-between mb-5">
                  <div className="flex items-center">
                    <div className="me-2">
                      <img className="w-10 h-10" src={User} alt="user" />
                    </div>
                    <div>
                      <h3 className="text-base text-white">Sam Lee</h3>
                      <h3 className="text-xs text-[#6C6C6C]">@samlee</h3>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      class="focus:outline-none text-black bg-[#FF9900]  hover:bg-[#FF9900]  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                    >
                      Follow
                    </button>
                  </div>
                </li>
                <li className="flex flex-row items-center justify-between mb-5">
                  <div className="flex items-center">
                    <div className="me-2">
                      <img className="w-10 h-10" src={User} alt="user" />
                    </div>
                    <div>
                      <h3 className="text-base text-white">Sam Lee</h3>
                      <h3 className="text-xs text-[#6C6C6C]">@samlee</h3>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      class="focus:outline-none text-black bg-[#FF9900]  hover:bg-[#FF9900]  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                    >
                      Follow
                    </button>
                  </div>
                </li>
                <li className="flex flex-row items-center justify-between mb-5">
                  <div className="flex items-center">
                    <div className="me-2">
                      <img className="w-10 h-10" src={User} alt="user" />
                    </div>
                    <div>
                      <h3 className="text-base text-white">Sam Lee</h3>
                      <h3 className="text-xs text-[#6C6C6C]">@samlee</h3>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      class="focus:outline-none text-black bg-[#FF9900]  hover:bg-[#FF9900]  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                    >
                      Follow
                    </button>
                  </div>
                </li>
                <li className="flex flex-row items-center justify-between mb-5">
                  <div className="flex items-center">
                    <div className="me-2">
                      <img className="w-10 h-10" src={User} alt="user" />
                    </div>
                    <div>
                      <h3 className="text-base text-white">Sam Lee</h3>
                      <h3 className="text-xs text-[#6C6C6C]">@samlee</h3>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      class="focus:outline-none text-black bg-[#FF9900]  hover:bg-[#FF9900]  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                    >
                      Follow
                    </button>
                  </div>
                </li>
                <li className="flex flex-row items-center justify-between mb-5">
                  <div className="flex items-center">
                    <div className="me-2">
                      <img className="w-10 h-10" src={User} alt="user" />
                    </div>
                    <div>
                      <h3 className="text-base text-white">Sam Lee</h3>
                      <h3 className="text-xs text-[#6C6C6C]">@samlee</h3>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      class="focus:outline-none text-black bg-[#FF9900]  hover:bg-[#FF9900]  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                    >
                      Follow
                    </button>
                  </div>
                </li>
                <li className="flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    <div className="me-2">
                      <img className="w-10 h-10" src={User} alt="user" />
                    </div>
                    <div>
                      <h3 className="text-base text-white">Sam Lee</h3>
                      <h3 className="text-xs text-[#6C6C6C]">@samlee</h3>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      class="focus:outline-none text-black bg-[#FF9900]  hover:bg-[#FF9900]  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                    >
                      Follow
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:max-w-[370px] w-full md:mt-0 mt-10">
            <div className="w-full rounded-3xl border border-[#90A321] h_grid1 px-4 py-3 relative">
              <div className="w-[74px] h-[74px] rounded-full flex justify-center items-center bg-[#FFE500] absolute right-8 bottom-[-20px]">
                <img src={Bracket} alt="Bracket" />
              </div>
              <div className="bg-[#dee870] rounded-3xl px-3 py-3 text-neutral-900 2xl:text-xl text-base font-medium lexend">
                Add <span className="font-bold">EMP X</span> | SWAP to your
                products and earn <br className="2xl:block hidden" />{' '}
                transaction fees
              </div>
            </div>
            <div className="w-full rounded-3xl border border-white black px-4 py-3 relative mt-10 flex flex-col justify-center items-center">
              <div className="absolute left-0 right-0 top-0 bottom-0 mx-auto my-auto px-4 py-3 h-full">
                <img src={Market} alt="Market" className="w-full h-full" />
              </div>
              <div className="text-center text-black text-2xl font-light relative z-50 mt-4 2xl:top-[70px] lg:top-[30px] top-[70px]">
                EMP X
              </div>
              <div className="text-center text-black 2xl:text-[50px] lg:text-2xl text-[50px] font-bold relative z-50 mt-3 2xl:top-[70px] lg:top-[20px] top-[50px]">
                MARKET
              </div>
              <div className="text-black 2xl:text-[26px] text-base font-normal leading-[30px] roboto relative z-50 2xl:left-[-30px] left-[-70px] 2xl:mt-[230px] top-[-20px] lg:mt-[50px] mt-[160px]">
                Decentralised <br /> NFT Marketplace
              </div>
            </div>
            <div className="w-full rounded-2xl border border-white black px-4 py-4 relative mt-8 flex gap-8 justify-center items-center h_grid2">
              <img src={Git} alt="Git" />
              <img src={Tx} alt="Tx" />
              <img src={X} alt="X" />
              <img src={Master} alt="Master" />
            </div>
            <div className="w-full rounded-2xl border border-white black px-4 py-5 relative mt-8 flex gap-8 justify-center items-center h_grid2">
              <div className="text-center text-white text-base font-normal leading-[14px]">
                DOCUMENTATION
              </div>
            </div>
          </div>
          <div className="md:max-w-[400px] w-full">
            <div className="w-full rounded-3xl border border-white 2xl:pt-7 2xl:pb-8 lg:py-4 py-7 relative h_grid3">
              <img
                src={Cell}
                alt="Cell"
                className="absolute 2xl:w-[348px] xl:w-[200px] lg:w-[180px] md:w-[150px] w-[250px] 2xl:right-[-75px] lg:right-[-25px] right-[-15px] 2xl:top-[-22px] md:top-[0px] top-[-12px]"
              />
              <div className="bg-white px-3 py-4 flex justify-between gap-3 items-center">
                <div className="text-center text-stone-950 text-xs font-medium uppercase leading-3 tracking-wider flex gap-5 items-center">
                  EMP X
                  <img src={Star} alt="Star" />
                </div>
                <div className="text-center text-stone-950 text-xs font-medium uppercase leading-3 tracking-wider flex gap-5 items-center">
                  EMP X
                  <img src={Star} alt="Star" />
                </div>
                <div className="text-center text-stone-950 text-xs font-medium uppercase leading-3 tracking-wider flex gap-5 items-center">
                  EMP X
                  <img src={Star} alt="Star" />
                </div>
                <div className="text-center text-stone-950 text-xs font-medium uppercase leading-3 tracking-wider flex gap-5 items-center">
                  EMP X
                  <img src={Star} alt="Star" />
                </div>
              </div>
              <div className="px-10 pt-4">
                <Link to="/swap">
                  <span className="text-white text-2xl font-extrabold">
                    EMP X{' '}
                  </span>
                  <span className="text-white text-[21.90px] font-extrabold">
                    {' '}
                  </span>
                  <span className="text-white text-sm font-light">| </span>
                  <span className="text-white text-xs font-light">SWAP</span>
                </Link>
              </div>
              <div className="px-10 pt-2">
                <div className="text-white 2xl:text-[17.42px] lg:text-sm text-lg font-extralight">
                  The Most
                </div>
                <div className="text-white 2xl:text-[17.42px] lg:text-sm text-lg font-extralight">
                  Efficient
                </div>
                <div className="text-white 2xl:text-[17.42px] lg:text-sm text-lg font-extralight">
                  On-Chain
                </div>
                <div className="text-white 2xl:text-[17.42px] lg:text-sm text-lg font-extralight">
                  Aggregation
                </div>
                <div className="text-white 2xl:text-[17.42px] lg:text-sm text-lg font-extralight">
                  with Limit
                </div>
                <div className="text-white 2xl:text-[17.42px] lg:text-sm text-lg font-extralight">
                  Orders.
                </div>
              </div>
            </div>
            <div className="w-full rounded-3xl border border-white 2xl:py-8 lg:py-4 py-8 relative mt-4 h_grid4 px-9 pt-8 pb-8">
              <img
                src={Dia}
                alt="Dia"
                className="absolute right-0 top-0 bottom-0 my-auto h-full"
              />
              <div className="relative z-50">
                <div className="text-white 2xl:text-[21.90px] lg:text-base text-[21.90px] font-extrabold">
                  DASHBOARD{' '}
                </div>
                <div className="text-white 2xl:text-sm lg:text-xs text-sm font-extralight">
                  Protocol & Market Analysis
                </div>
                <div className="2xl:mt-4 lg:mt-1 mt-4 text-gray-300 text-xs font-normal">
                  All-Time Volume
                </div>
                <div className="text-white 2xl:text-3xl lg:text-xl text-3xl font-bold">
                  $ 445 m{' '}
                </div>
                <div className="2xl:mt-4 lg:mt-1 mt-4 text-gray-300 text-xs font-normal">
                  Total Users
                </div>
                <div className="text-white 2xl:text-3xl lg:text-xl text-3xl font-bold">
                  4144450
                </div>
              </div>
            </div>
            <div className="w-full rounded-3xl border border-white 2xl:py-[67px] lg:py-4 py-8 relative mt-4 h_grid5 px-9 pt-8 pb-10 z-10">
              <img
                src={Stone}
                alt="Dia"
                className="absolute left-0 right-0 top-0 mx-auto  2xl:object-cover  h-full rounded-br-[25px] w-full z-0"
              />
              <div className="relative z-50">
                <div className="text-center text-gray-300 text-xs font-normal">
                  EMP X CROSS CHAIN
                </div>
                <div className="text-center text-white 2xl:text-[44px] lg:text-2xl text-[44px] font-bold mt-2">
                  BRIDGE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTMarketplace;
