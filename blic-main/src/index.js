import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import {  Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-mui";
import reportWebVitals from "./reportWebVitals";

// const options = {
//   // you can also just use 'bottom center'
//   position: positions.BOTTOM_CENTER,
//   timeout: 5000,
//   offset: "30px",
//   // you can also just use 'scale'
//   transition: transitions.SCALE,
// };

ReactDOM.render(
  <React.StrictMode>
    {/* <AlertProvider timeout={3000} template={AlertTemplate} {...options}> */}
    <AlertProvider timeout={3000} template={AlertTemplate}> 
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
