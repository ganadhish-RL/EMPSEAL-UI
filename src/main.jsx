import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import store from './redux/store/store.jsx';
import { Provider } from 'react-redux';
import WagmiProviderWrapper from './Wagmi/WagmiProvider.tsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProviderWrapper>
      <Provider store={store}>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </Provider>
    </WagmiProviderWrapper>
  </React.StrictMode>,
)
