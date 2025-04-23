import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import axios from 'axios'

window.Telegram.WebApp.expand()

const api = axios.create({
  baseURL: 'https://aniton.xyz/api/v1/',
});

export default api;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
