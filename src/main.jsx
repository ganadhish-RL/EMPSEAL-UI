import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import store from './redux/store/store.jsx';
import { Provider } from 'react-redux';
import WagmiProviderWrapper from './Wagmi/WagmiProvider.tsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProviderWrapper>
      <Provider store={store}>
        <App />
      </Provider>
    </WagmiProviderWrapper>
  </React.StrictMode>,
)
