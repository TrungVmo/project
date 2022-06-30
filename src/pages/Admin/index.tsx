import React from 'react';
import FoodManage from '../../components/NavAdmin/FoodManage/FoodManage';
import NavAdmin from '../../components/NavAdmin/NavAdmin';
import UserManage from '../../components/NavAdmin/UserManage/UserMange';

const Admin: React.FC = () => {
    return (
        <div>
            <NavAdmin />
            <FoodManage />
            <UserManage />
        </div>
    );
};

export default Admin;