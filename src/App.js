import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/Public/LoginPage'
import RegisterPage from './components/Public/RegisterPage';
import { contextData } from './components/utils/DataContext';
import Transaction from './components/Transactions/AllTransaction/Transaction';
import AddNew from './components/Transactions/AddTransaction/AddNew';
import { useState } from 'react';
import ViewData from './components/Transactions/ViewTransaction/ViewData';
function App() {

  // const InitData = JSON.parse(localStorage.getItem('MyTransaction'))
  // const InitUserData = JSON.parse(localStorage.getItem('MyUser'))

  const [transactionData, setTransactionData] = useState([]);
  const [userData, setUserData] = useState([])

  return (
    <div className="App">
      <contextData.Provider value={{ transactionData, userData, setTransactionData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to={'/login'} />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route exact path='/transaction' element={<Transaction />} />
            <Route path='/add' element={<AddNew />} />
            <Route path='/edit/:id' element={<AddNew />} />
            <Route path='/view/:id' element={<ViewData />} />
          </Routes>
        </BrowserRouter>
      </contextData.Provider>
    </div>
  );
}

export default App;
