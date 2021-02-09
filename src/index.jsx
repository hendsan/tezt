import React from 'react';
import ReactDOM from 'react-dom';
// import "nprogress/nprogress.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-datepicker/dist/react-datepicker.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WorldData from './world/WorldData';

WorldData.init();

ReactDOM.render(
  <React.StrictMode>
    {/* <Devtools> */}
    <App />
    {/* </Devtools> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
