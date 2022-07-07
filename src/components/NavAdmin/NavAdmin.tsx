import React, {useEffect, useState} from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import './NavAdmin.css';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';

import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';

const navItem = [
    {
        id:0,
        title: 'Sản phẩm',
        url: '/admin/food',
        icon: <AddBusinessIcon />
    },
    {
        id: 1,
        title: 'Người dùng',
        url: '/admin/user',
        icon:  <PersonIcon />
    },
    {
        id:2,
        title: 'Phân loại',
        url: '/admin/category',
        icon: <CategoryIcon />
    },
    {
        id:3,
        title: 'Đơn hàng',
        url: '/admin/order',
        icon: <BookmarkBorderIcon />
    },
]

const NavAdmin: React.FC = () => {

    const [active, setActive] = useState(0);
    const location: any = useLocation();
    // console.log(location.pathname);
    // console.log(typeof(location.pathname))
    useEffect(() => {
        switch (location.pathname) {
            case '/admin/order':
                setActive(3);
                break
            case '/admin/category':
                setActive(2);
                break
            case '/admin/user':
                setActive(1);
                break
            case '/admin/food':
                setActive(0);
                break
            default:
                break;
        }
    },[]);

    return (
        <>
            <div className='admin'>
                <div className='admin-nav flex'>
                    <div>
                        <Link to="/">
                            <img src={logo} />
                        </Link>
                    </div>
                    {navItem.map((item) => (
                        
                       <div 
                        className={item.id === active ? 'box-active flex': "flex"}
                        onClick={() => setActive(item.id)}
                        key={item.id}
                       >
                            
                            {item.icon}
                            <Link to={`${item.url}`} >{item.title}</Link>
                       </div>
                       
                    ))}
                   
                </div> 
                <div className='admin-navR'>
                    <PersonIcon />
                </div>
            </div>
            
        </>
    );
};

export default NavAdmin;