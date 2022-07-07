import React, { useState, useEffect, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CartItem } from '../../redux/constants';
import DeleteCart from './DeleteCart';

const CartItems: React.FC = () => {
    
    
    const [cart, setCart] = useState<any>([]);
    
    const handleGetCart = useCallback(() => {
        const ca = localStorage.getItem('cart');
        setCart(ca ? JSON.parse(ca ? ca : "") : []);
        
    },[]);

    useEffect(() => {
        handleGetCart();
     },[])
 

    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                <TableContainer sx={{ maxHeight: 300}}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>name</TableCell>
                            <TableCell align="center">des</TableCell>
                            <TableCell align="center">type</TableCell>
                            <TableCell align="center">price</TableCell>
                            <TableCell align="center">count</TableCell>
                            <TableCell align="center">image</TableCell>
                            <TableCell align="center">payment</TableCell>
                            <TableCell align="center">function</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {cart && cart.map((item: CartItem, index: number) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="center">{item.des}</TableCell>
                                <TableCell align="center">{item.type}</TableCell>
                                <TableCell align="center">{item.price}</TableCell>
                                <TableCell align="center">{item.count}</TableCell>
                                <TableCell align="center">
                                    <img src={item.image} alt='nothing' className='imgFoodManage' />
                                </TableCell>
                                <TableCell align="center">{item.payment}</TableCell>
                                <TableCell align="center">
                                    <DeleteCart item={item} index={index} resetCart={handleGetCart} />
                                    {/* <UpdateFood item={item} /> */}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default CartItems;