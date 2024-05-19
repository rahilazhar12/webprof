import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ element: Component, allowedRoles, ...rest }) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userRole = user ? user.role : null;

    return allowedRoles.includes(userRole)
        ? Component
        : <Navigate to='/unauthorized' />;
};

export default ProtectedRoutes;
