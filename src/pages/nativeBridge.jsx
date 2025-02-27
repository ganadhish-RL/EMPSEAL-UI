import React, { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import SpinnerImage from '../assets/images/spinner_middle.svg';
import { Link } from 'react-router-dom';

const NativeBridge = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('native'); // 'cross' | 'native'
  const iframeSrc =
    import.meta.env.REACT_APP_IFRAME_URL ||
    'https://native-bridge-omega.vercel.app';

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className='md:max-w-[1100px] mx-auto w-full flex justify-center gap-10 items-center md:flex-nowrap flex-wrap my-6 px-3'>
        <Link to={'/bridge'}>
          <div
            // onClick={() => setActiveTab('cross')}
            className={` opacity-50 px-3 py-2 border-[#3b3c4e] md:max-w-[200px] w-full h-[28px] flex justify-center items-center rounded-md border text-white text-[15px] font-bold roboto`}
          >
            Cross Chain Swap
          </div>
        </Link>
        <Link to={'/nativebridge'}>
          <div
            // onClick={() => setActiveTab('native')}
            className={` border-[#FF9900] cursor-pointer px-3 py-2  md:max-w-[200px] w-full h-[28px] flex justify-center items-center rounded-md border text-white text-[15px] font-bold roboto`}
          >
            Native Bridge
          </div>
        </Link>
      </div>
      {/* Loader (Visible when iframe is loading) */}
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoadingSpinner SpinnerImage={SpinnerImage} />
        </div>
      )}

      <iframe
        src={iframeSrc}
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: loading ? 'none' : 'block', // Hide iframe while loading
        }}
        onLoad={() => setLoading(false)} // Hide loader when iframe loads
      ></iframe>
    </div>
  );
};

export default NativeBridge;
