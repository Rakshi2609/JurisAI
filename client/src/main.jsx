import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import './index.css'
import axios from 'axios';

// In development, send API calls to the local backend
if (import.meta.env.DEV) {
  axios.defaults.baseURL = 'http://localhost:5000';
}
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
