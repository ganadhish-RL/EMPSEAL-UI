import React, { useState } from "react";
import Arrow from "../../assets/icons/downarrow.svg";
import Tokens from "../tokenList.json";

const Token = ({ onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = Tokens.filter((token) =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="bg-black bg-opacity-40 py-10 flex justify-center items-center overflow-y-auto h-full my-auto fixed top-0 px-4 left-0 right-0 bottom-0 z-[9999] fade-in-out fade-out">
        <div className="w-full flex justify-center my-auto items-center">
          <div className="md:max-w-[564px] w-full bg-black border border-white rounded-3xl relative py-6 px-5 mx-auto">
            <svg
              onClick={onClose}
              className="absolute cursor-pointer right-8 top-9"
              width={18}
              height={19}
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 1.44824L1 17.6321M1 1.44824L17 17.6321"
                stroke="#ffff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex gap-4 items-center  justify-center cursor-pointer mt-2">
              <p className="md:text-2xl text-lg font-medium text-white roboto text-center tracking-widest">
                Select a token
              </p>
            </div>
            <div className="mt-6 relative h-[43px] w-full flex gap-2 items-center">
              <input
                type="text"
                placeholder="Search token name or paste address"
                className="bg-neutral-950 rounded-[4.83px] h-[43px] text-white md:max-w-[490px] w-full px-5 outline-none border-none text-white/opacity-70 text-sm font-normal roboto leading-tight tracking-wide"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="flex flex-shrink-0 cursor-pointer"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.8632 19.0535L13.3482 13.5375C10.8947 15.2818 7.51414 14.8552 5.57102 12.556C3.62792 10.257 3.7706 6.85254 5.89925 4.72413C8.02735 2.59479 11.4322 2.45149 13.7317 4.3945C16.0311 6.3375 16.458 9.71849 14.7137 12.1721L20.2287 17.688L18.8642 19.0526L18.8632 19.0535ZM9.99282 4.95765C8.16287 4.95724 6.58411 6.24178 6.21237 8.03356C5.84064 9.82534 6.7781 11.6319 8.45718 12.3596C10.1363 13.0871 12.0955 12.5358 13.1486 11.0392C14.2018 9.54268 14.0594 7.51235 12.8078 6.17743L13.3916 6.75644L12.7335 6.10023L12.7219 6.08865C11.9999 5.36217 11.0171 4.95489 9.99282 4.95765Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="mt-6">
              <div className="flex justify-between gap-4 items-center">
                <p className="text-white text-xl font-medium roboto leading-relaxed tracking-wide">
                  Token Name
                </p>
                <img src={Arrow} alt="Arrow" />
              </div>
              {filteredTokens.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between gap-4 items-center mt-4 cursor-pointer"
                    onClick={() => onSelect(item)}
                  >
                    <div className="text-white text-base roboto leading-relaxed tracking-wide flex gap-2 items-center">
                      <img src={item.image} className="w-4 h-4" alt={item.name} />
                      {item.name}
                    </div>
                    <div className="text-white text-sm font-normal roboto tracking-wide">
                      {item.ticker}
                    </div>
                  </div>
                );
              })}
              <div className="my-6">
                <img src={Arrow} alt="Arrow" className="mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Token;