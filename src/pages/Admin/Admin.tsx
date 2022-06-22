import React from 'react';
import FoodManage from '../../components/NavAdmin/FoodManage/FoodManage';
import NavAdmin from '../../components/NavAdmin/NavAdmin';

const Admin: React.FC = () => {
    return (
        <>
            <NavAdmin />
            <FoodManage />
        </>
    );
};

export default Admin;