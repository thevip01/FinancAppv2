import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/Public/LoginPage'
import RegisterPage from './components/Public/RegisterPage';
import { contextData } from './components/utils/DataContext';
import Transaction from './components/Transactions/AllTransaction/Transaction';
import AddNew from './components/Transactions/AddTransaction/AddNew';
import { useState } from 'react';
import ViewData from './components/Transactions/ViewTransaction/ViewData';
import { CookiesProvider } from "react-cookie";
import { useCookies } from 'react-cookie';
import AuthController from './components/utils/AuthController';


function App() {

  // eslint-disable-next-line
  const InitData = JSON.parse(localStorage.getItem('MyTransaction'))
  // eslint-disable-next-line
  const InitUserData = JSON.parse(localStorage.getItem('MyUser'))

  const [transactionData, setTransactionData] = useState(InitData);
  const [userData, setUserData] = useState([
    { userName: "Vipul", email: "thevip@gmail.com", password: "Abcd@123", rePassword: "Abcd@123" }
  ])


  const [cookies, setCookie, removeCookie] = useCookies();


  return (
    <div className="App">
      <CookiesProvider>
        <contextData.Provider value={{ transactionData, userData, setTransactionData, setUserData, removeCookie, cookies, setCookie }}>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path='/' element={<Navigate to={'/login'} />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />

              {/* Private Routes */}
              <Route path="/" element={<AuthController />}>
                <Route exact path='/transaction' element={<Transaction />} />
                <Route path='/add' element={<AddNew />} />
                <Route path='/edit/:id' element={<AddNew />} />
                <Route path='/view/:id' element={<ViewData />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </contextData.Provider>
      </CookiesProvider>
    </div>
  );
}

export default App;
