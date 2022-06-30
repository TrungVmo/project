import React, {useState} from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ProductAdmin from './Contents/ProductAdmin';
import './NavAdmin.css';
import FoodManage from './FoodManage/FoodManage';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';


const navItem = [
    {
        id:0,
        title: 'Sản phẩm',
        icon: <AddBusinessIcon />
    },
    {
        id: 1,
        title: 'Người dùng',
        icon:  <PersonIcon />
    },
    {
        id:2,
        title: 'Phân loại',
        icon: <CategoryIcon />
    },
]

const NavAdmin: React.FC = () => {

    const [active, setActive] = useState(0);

    return (
        <>
            <div className='admin'>
                <div className='admin-nav flex'>
                    <div>
                        <img src='./images/logo.png' />
                    </div>
                    {navItem.map((item) => (
                       <div 
                        className={item.id === active ? 'box-active flex': "flex"}
                        onClick={() => setActive(item.id)}
                        key={item.id}
                       >
                           {item.icon}
                           <span>{item.title}</span>
                       </div>

                    ))}
                   
                </div> 
            </div>
            <div>
                <div className='admin-main'>
                    <ProductAdmin />
                    {/* <FoodManage /> */}
                </div>
            </div>
        </>
    );
};

export default NavAdmin;