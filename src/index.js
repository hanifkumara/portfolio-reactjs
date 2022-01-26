import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log("error response axios ====>", error.response)
  if (error.response.status === 401) {
    if (error.response.data.err.message === 'Invalid Token') {
      localStorage.clear()
    } else if (error.response.data.err.message === 'You not have Token!') {
      localStorage.clear()
    }
  }
  return Promise.reject(error)
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
