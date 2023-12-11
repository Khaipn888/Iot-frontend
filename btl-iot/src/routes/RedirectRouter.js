import React from 'react';
import { Navigate } from "react-router-dom";
import Register from '../views/Register';

const RedirectRouter = ({ route }) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (route === <Register />) return ;
    return token ? route : <Navigate to="/login" />;
};

export default RedirectRouter;