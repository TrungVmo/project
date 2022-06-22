import React, { useState } from 'react';
import './Menu.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListFood from '../../components/ListFood/ListFood';

const MenuLi: React.FC<{item: string}> = ({item}) => {

    const [show, setShow] = useState<boolean>(false);
    const handleShow = () => {
        if(!show){
            setShow(true)
        }
    }
    return(
        <li onClick={handleShow}>
            <span>{item}</span>
            {/* {show && <ArrowDropDownIcon />} */}
        </li>
    )
}

const Menu: React.FC = () => {
    const liArr= ['Food','Drink','Coffee']
    return (
        <div className='menu'>
            <div className='menu-top'>
                <span>Food Menu</span>
            </div>
            <div className='menu-content'>
                <div className='flex'>
                    <span className='span'>Delcious Food Menu</span>
                    <ul className='flex'>
                        {liArr.map((item: string) => (
                            <MenuLi item={item} />
                        ))}
                    </ul>
                </div>
                <div>
                    <ListFood />
                </div>
            </div>
        </div>
    );
};

export default Menu;