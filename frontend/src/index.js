import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import ActiveProvider from './context/active_menu';
import UserProvider from './context/user';
import CandidateProvider from './context/candidate';

const root = ReactDOM.createRoot(document.getElementById('root'));
const themeConfig = {
  token: {
    colorPrimary: '#e8d207',
    borderRadius: '5px',
  },
  components: {
    Button: {
      colorPrimary: '#e8d207',
      colorSecondary: '#233c69',
    },
  },
};
root.render(
  <ConfigProvider theme={themeConfig}>
    <CandidateProvider>
      <UserProvider>
        <ActiveProvider>
          <App />
        </ActiveProvider>
      </UserProvider>
    </CandidateProvider>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
