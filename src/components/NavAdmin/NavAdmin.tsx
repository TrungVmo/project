import React, {useEffect, useState} from 'react';
import './NavAdmin.css';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import NavItem from '../../Commons/DataNav';



const NavAdmin: React.FC = () => {

    const [active, setActive] = useState(0);
    const location: any = useLocation();

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
                    {NavItem.map((item) => (
                        
                       <div 
                        className={item.id === active ? 'box-active flex': "flex"}
                        onClick={() => setActive(item.id)}
                        key={item.id}
                       >
                            <Link to={`${item.url}`} className="flex" style={{alignItems: "center"}} >
                                {item.icon}
                                {item.title}
                            </Link>
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