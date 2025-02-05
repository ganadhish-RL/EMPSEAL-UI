import ZigZag from '../../assets/images/zig_zag_provider.svg';
import DollarSign from '../../assets/images/dollar-sign.svg';
import Clock from '../../assets/images/clock.svg';
import React, { useState } from 'react';

const ProvidersListCard = ({
  SpinnerImage,
  tokenAmount,
  tokenSymbol,
  tokenRouter,
  tokenAmountUsd,
  fees,
  timeDuration,
  protocolFee,
  providerFee,
  onSelect,
  isSelected,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        onClick={onSelect} // Set the selected card on click
        className={`border cursor-pointer transition-all duration-200 p-1 hover:border-[#FF9900] ${
          isSelected ? 'border-[#FF9900] shadow-md' : 'border-transparent'
        }`}
      >
        <div className='grid grid-cols-[50%_50%]  justify-between bg-[#191919] p-3 '>
          <div className='flex flex-col '>
            <span className='text-white text-xl font-bold roboto '>
              {tokenAmount} {tokenSymbol}
            </span>

            <div className='flex items-center mt-2'>
              {/* <img src={ZigZag} alt='Loading' className='w-3 h-4' /> */}
              <span className='text-sm font-sm text-white roboto'>
                {tokenRouter}
              </span>
            </div>
          </div>
          <div className='flex flex-col '>
            <span className='text-base font-normal roboto text-white text-end'>
              ~{tokenAmountUsd}$
            </span>
          </div>
        </div>
        <div className='grid grid-cols-[40%_40%] justify-between bg-[#3B3B3B] text-[#FF9900] p-3'>
          <div
            className='relative flex items-center'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img src={DollarSign} alt='Loading' className='w-4 h-6' />
            <span className='text-sm font-base roboto'>~${fees}</span>

            {hovered && (
              <div className='absolute bottom-full mb-2 left-0 p-3 bg-[#3D3D3D] text-white text-xs rounded-lg shadow-lg'>
                <p>
                  <strong>Protocol Fee:</strong> {protocolFee}
                </p>
                <p>
                  <strong>Provided Fee:</strong> {providerFee}
                </p>
              </div>
            )}
          </div>
          <div className='flex justify-end items-center'>
            <img src={Clock} alt='Loading' className='w-3 h-4' />

            <span className=' text-sm font-base  roboto '>{timeDuration}M</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProvidersListCard;
