import React from 'react';
import './Admin.css';
import NavAdmin from '../../components/NavAdmin/NavAdmin';
import HeaderMobile from '../../components/NavAdmin/HeaderMobile/HeaderMobile';


const Admin: React.FC<{Elem: any}> = ({Elem}) => {
    return (
        <div>
            <NavAdmin />
            <HeaderMobile />
            <div className='admin__element'>
                <Elem />
            </div>
        </div>
    );
};

export default Admin;