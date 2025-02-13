import React, { useEffect, useState } from 'react';
import { useStore } from '../../redux/store/routeStore';
import ProvidersListCard from '../../components/ProviderList/ProviderListCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import SpinnerImage from '../../assets/images/spinner_middle.svg';
const ProvidersList = ({
  padding,
  quoteData,
  loading,
  setSelectedRoute,
  selectedRoute,
}) => {
  const path = useStore((state) => state.path);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (quoteData?.routes) {
      setRoutes(quoteData.routes);
      // console.log('data', quoteData);
    } else {
      setRoutes([]);
    }
  }, [quoteData]);

  return (
    <div
      className={`border-[2px] border-[#FF9900] rounded-xl bg-black ${padding}`}
    >
      <div className='w-full flex justify-center p-5'>
        {/* <span className='text-white text-base font-bold roboto leading-normal'>
          Providers
        </span> */}
        <p className="w-[100px] h-[35px] flex justify-center items-center rounded-md bg-black roboto text-[#FF9900] text-[12px] font-bold border border-[#FF9900]">
          Providers
        </p>
      </div>
      <div className='p-4'>
        {loading ? (
          <LoadingSpinner SpinnerImage={SpinnerImage} />
        ) : routes.length > 0 ? (
          <div className='max-h-[535px] overflow-y-auto flex flex-col gap-4'>
            {routes.map((route, index) => {
              return (
                <ProvidersListCard
                  key={index}
                  tokenAmount={parseFloat(
                    route.estimate.destinationTokenAmount
                  ).toFixed(5)}
                  tokenSymbol={route.tokens.to.symbol}
                  tokenRouter={route.providerType}
                  tokenAmountUsd={route.estimate.destinationUsdAmount.toFixed(
                    2
                  )}
                  protocolFee={route.fees.gasTokenFees.protocol.fixedUsdAmount}
                  providerFee={route.fees.gasTokenFees.provider?.fixedUsdAmount}
                  percentFee={route.fees.percentFees.percent}
                  fees={(
                    parseFloat(
                      route.fees.gasTokenFees.protocol.fixedUsdAmount
                    ) +
                    parseFloat(
                      route.fees.gasTokenFees.provider?.fixedUsdAmount || 0
                    )
                  ).toFixed(2)}
                  timeDuration={route.estimate.durationInMinutes}
                  onSelect={() => setSelectedRoute(route)}
                  isSelected={selectedRoute === route}
                />
              );
            })}
          </div>
        ) : (
          <p className='text-gray-400 text-center'>No providers available.</p>
        )}
      </div>
    </div>
  );
};

export default ProvidersList;
