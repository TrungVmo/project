import React, { useState, useCallback, useEffect } from 'react';
import './Header.css';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));


const Header: React.FC = () => {

    const [count, setCount] = useState<number>(0);
    const [search, setSearch] = useState<boolean>(true);

    let ca = localStorage.getItem('cart');
    let cart = ca ? JSON.parse(ca ? ca : "") : 0; 

    const dispatch = useDispatch<any>();

    const getCountCart = useCallback(async() => {
        let res = await localStorage.getItem('cart');
        let result = res ? await JSON.parse(res? res : "") : 0; 

        if(result){
            setCount(result.length);
        }
    },[]);

    useEffect(() => {
        getCountCart();
    }, [cart])

    return (
        <header>
            <div className='header flex'>
                <div className='header-logo'>
                    <Link to="/">
                        <img src={logo} />
                    </Link>
                </div>
                <div className='header-list flex'>
                    <ul className='flex'>
                        <li>
                            <Link to="/menu/Food">
                                 Food
                            </Link>
                        </li>
                        <li>
                            <Link to="/menu/Drink">
                                 Drink
                            </Link>
                        </li>
                        <li>
                            <Link to="/menu/Cake">
                                 cake
                            </Link>
                        </li>
                    </ul>
                    <ul className='flex'>
                        <li>
                            <SearchIcon />
                        </li>
                        <li>
                           <Link to="/cart"> 
                            <StyledBadge badgeContent={count > 0 ? count : ''} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                           </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <AccountCircleIcon />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* {
                search && <Test />
            } */}
        </header>
    );
};

export default Header;