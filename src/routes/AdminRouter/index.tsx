import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRouter: React.FC<{children: any}> = ({children}) => {

    const admin: any = localStorage.getItem("admin");
    return admin ? children : <Navigate to='/signin' />
};

export default AdminRouter;