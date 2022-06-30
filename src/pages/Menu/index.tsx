import React, { useEffect, useState } from 'react';
import './Menu.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListFood from '../../components/ListFood/ListFood';
import { useDispatch, useSelector } from 'react-redux';
import { listFoods } from '../../redux/actions/Food';
import {ItemFood} from '../../redux/constants';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import SkeletonItem from '../../components/ListFood/Skeleton';
import { Link } from 'react-router-dom';

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
    const liArr= ['Food','Drink','Coffee'];

    const dispatch = useDispatch<any>();
    const listFood = useSelector((state: any) => state.foodList.data);
    const loading = useSelector((state: any) => state.foodList.loading);

    const testArr = ['a','b','c','d'];
    useEffect(() => {
        dispatch(listFoods());
    },[])

    console.log(listFood);
    
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
                <div className='flex'>
                    
                    { !loading ?(listFood && listFood.map((item: ItemFood, index: number) => (
                        <Link to={`/detail/${item.id}`}>
                             <ListFood key={index} item={item} loading={loading} />
                         </Link>  
                        ))): testArr.map(() => (<SkeletonItem />) )
                    }
                     {/* <Stack spacing={2}>
                        <Pagination count={listFood?.length} color="primary" />
                    </Stack> */}
                </div>
            </div>
        </div>
    );
};

export default Menu;