import React from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ProductAdmin from './Contents/ProductAdmin';
import './NavAdmin.css';

const NavAdmin: React.FC = () => {
    return (
        <section className='admin'>
            <div className='admin-nav'>
                <div>
                    <img src='./images/logo.png' />
                </div>
                <div>
                    <AddBusinessIcon />
                    <span>Product</span>
                </div>
            </div>
            <div className='admin-main'>
                <ProductAdmin />
            </div>
            
        </section>
    );
};

export default NavAdmin;