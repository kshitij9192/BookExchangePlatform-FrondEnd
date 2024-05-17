import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn/>} />
          <Route path="homepage" element={<HomePage/>} />
          <Route path="/" element={<LandingPage />}>
        </Route>
      </Routes>
    </BrowserRouter>  
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
