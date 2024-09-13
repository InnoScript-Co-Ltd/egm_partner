import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { PrimeReactProvider } from 'primereact/api';
import { App } from './App';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "/node_modules/primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import "./assets/css/style.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

const value = {
  appendTo: 'self',
  cssTransition: true,
  ripple: true,
}

root.render(
  <PrimeReactProvider value={value}>
    <App />
  </PrimeReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
