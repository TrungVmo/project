import React, { useState } from 'react';
import './Cart.css';
import CartItems from '../../components/Cart/CartItem';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../redux/actions/Cart';
import { auth } from '../../firebase';
import { getAuth } from 'firebase/auth';

const Carts: React.FC = () => {

    const us = localStorage.getItem('user');
    const user = us && JSON.parse(us ? us : "");
    const ca = localStorage.getItem('cart');
    const cart = ca ? JSON.parse(ca ? ca : "") : "";
    const dispatch = useDispatch<any>();
    const data = useSelector((state: any) => state)

    
    let sum = 0;
    const handleOrder = async() => {
        cart?.forEach((e: any) => {
            sum += e.payment;
        });

        if(user){
           await dispatch(addCart(user.uid, sum));  
           setTimeout(() => {
            localStorage.setItem('cart', "[]"); 
            alert('succes')
           }, 1000) 
        }
    }

   
    
    return (
        <div className='cart'>
            <div>
                <div>Cart</div>
            </div>
            {
                (user && cart?.length !== 0) ? (
                    <>
                        <CartItems />
                        <div>
                            <Button variant="contained" onClick={handleOrder}>Order</Button>
                        </div>
                    </>
                ) : (<>
                    Nothing
                </>)
            }
        </div>
    );
};

export default Carts;