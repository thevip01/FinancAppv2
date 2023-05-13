import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { contextData } from './DataContext';

const isAuthenticated = (contextD) => {

    const cookie = contextD['cookies'];
    const token = cookie['token']
    return token !== undefined;
};

const AuthController = () => {
    const contextD = useContext(contextData)
    return isAuthenticated(contextD) ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthController;