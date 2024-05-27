import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from "react-redux";
import store from './redux/store';
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
const ConfigProviderWithTheme = ({ children }) => {
  const {theme} = useSelector((state) => state.theme);

  return (
    <ConfigProvider theme={{
      token: {
        colorBgContainer: theme ? '#0f0e0f' : 'white',
        colorBgLayout: theme ? '#0f0e0f' : 'white',
        colorText: theme ? 'white' : '#0f0e0f',
      }
    }}>
      {children}
    </ConfigProvider>
  );
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProviderWithTheme>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProviderWithTheme>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
