import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ConfigProvider } from "@portkey/did-ui-react";

ConfigProvider.setGlobalConfig({
  requestDefaults: {
    baseUrl: "https://did-portkey-test.portkey.finance",
  },
  graphQLUrl:
    "https://dapp-portkey-test.portkey.finance/Portkey_DID/PortKeyIndexerCASchema/graphql",
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
