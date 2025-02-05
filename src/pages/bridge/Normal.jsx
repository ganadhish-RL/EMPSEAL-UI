import React, { useState } from 'react';
import Emp from './Emp';
import Wallet from './Wallet';
import ProvidersList from './ProvidersList';

const Normal = () => {
  const [padding, setPadding] = React.useState('lg:min-h-[573px] h-full');
  const [loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const quoteAll = async (
    selectedTokenA,
    selectedTokenB,
    amountIn,
    receiver
  ) => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api-v2.rubic.exchange/api/routes/quoteAll',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dstTokenAddress: selectedTokenB.address,
            dstTokenBlockchain:
              selectedTokenB?.blockchainNetwork?.toUpperCase(),
            referrer: 'rubic.exchange',
            srcTokenAddress: selectedTokenA.address,
            srcTokenAmount: amountIn,
            srcTokenBlockchain:
              selectedTokenA?.blockchainNetwork?.toUpperCase(),
            receiver: receiver,
          }),
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      setQuoteData(data); // Store response data
      console.log('API Response:', data);
    } catch (error) {
      console.error('Error calling API:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className='bg-[#121214] py-3 relative'>
        <div className='md:max-w-[1100px] mx-auto w-full px-4 flex justify-center xl:gap-4 gap-4 items-start 2xl:pt-10 py-2 md:flex-nowrap flex-wrap'>
          <div className='md:max-w-[620px] w-full'>
            <div className='md:hidden block'>
              <Wallet />
            </div>
            <Emp
              setPadding={setPadding}
              quoteAll={quoteAll}
              loading={loading}
              selectedRoute={selectedRoute}
            />
          </div>
          <div className='md:max-w-[474px] w-full'>
            <div className='md:block hidden'>
              <Wallet />
            </div>

            <div className='mt-3'>
              <ProvidersList
                padding={padding}
                quoteData={quoteData}
                loading={loading}
                setSelectedRoute={setSelectedRoute}
                selectedRoute={selectedRoute}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Normal;
