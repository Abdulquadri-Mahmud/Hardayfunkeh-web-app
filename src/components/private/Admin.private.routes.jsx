import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function Admin_Private_Route() {
    const { currentAdmin } = useSelector((state) => state.admin);

    return currentAdmin ? <Outlet/> : <Navigate to={'/admin-login'}/>
}
