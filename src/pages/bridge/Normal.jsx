import React, { useState } from 'react';
import Emp from './Emp';
import Wallet from './Wallet';
import ProvidersList from './ProvidersList';

const Normal = () => {
  const [padding, setPadding] = React.useState('lg:min-h-[573px] h-full');
  const [loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [activeTab, setActiveTab] = useState('cross'); // 'cross' | 'native'

  const integratorAddress = '0x02E6B1C1E78A7C71798262ef34386182C553bA8C';

  const quoteAll = async (
    selectedTokenA,
    selectedTokenB,
    amountIn,
    receiver,
    address
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
            integratorAddress: integratorAddress,
            fromAddress: address,
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
        <div className='md:max-w-[1100px] mx-auto w-full flex md:justify-between justify-center gap-3 items-center md:flex-nowrap flex-wrap my-6 px-3'>
          <div
            onClick={() => setActiveTab('cross')}
            className={`${
              activeTab === 'cross' ? 'border-[#FF9900]' : 'border-[#3b3c4e]'
            } cursor-pointer md:max-w-[200px] w-full h-[28px] flex justify-center items-center rounded-md border text-white text-[15px] font-bold roboto`}
          >
            Cross Chain Swap
          </div>

          <div
            onClick={() => setActiveTab('native')}
            className={`${
              activeTab === 'native' ? 'border-[#FF9900]' : 'border-[#3b3c4e] '
            }  cursor-pointer md:max-w-[200px] w-full h-[28px] flex justify-center items-center rounded-md border text-white text-[15px] font-bold roboto`}
          >
            Native Bridge
          </div>
        </div>
        <div className='md:max-w-[1100px] mx-auto w-full px-4 flex justify-center xl:gap-4 gap-4 items-start 2xl:pt-10 py-2 md:flex-nowrap flex-wrap'>
          <div className='md:max-w-[620px] w-full'>
            <div className='md:hidden block'>
              {activeTab === 'cross' ? <Wallet /> : <div></div>}
            </div>
            {activeTab === 'cross' ? (
              <Emp
                setPadding={setPadding}
                quoteAll={quoteAll}
                loading={loading}
                selectedRoute={selectedRoute}
                quoteData={quoteData}
                setQuoteData={setQuoteData}
              />
            ) : (
              <div></div>
            )}
          </div>
          <div className='md:max-w-[474px] w-full'>
            <div className='md:block hidden'>
              {activeTab === 'cross' ? <Wallet /> : <div></div>}
            </div>

            <div className='mt-3'>
              {activeTab === 'cross' ? (
                <ProvidersList
                  padding={padding}
                  quoteData={quoteData}
                  loading={loading}
                  setSelectedRoute={setSelectedRoute}
                  selectedRoute={selectedRoute}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Normal;
