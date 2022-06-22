import React from 'react';
import './Header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header: React.FC = () => {
    return (
        <header>
            <div className='header flex'>
                <div className='header-logo'>
                    <img src='./images/logo.png' />
                </div>
                <div className='header-list flex'>
                    <ul className='flex'>
                        <li>
                            Đồ ăn
                        </li>
                        <li>
                            Đồ uống
                        </li>
                        <li>Đồ chay</li>
                        <li>Bánh kem</li>
                        <li>Tráng miệng</li>
                    </ul>
                    <ul className='flex'>
                        <li>
                            <ShoppingCartIcon />
                        </li>
                        <li>
                            <AccountCircleIcon />
                        </li>
                    </ul>
                </div>
            </div>
            
        </header>
    );
};

export default Header;