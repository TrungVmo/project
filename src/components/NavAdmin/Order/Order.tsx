import React, {useState, useEffect } from 'react';
import './Order.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItem, getListOrder, getOrder } from '../../../redux/actions/Cart';
import AcceptOrder from './AcceptOrder';
import PendingOrder from './PendingOrder';


const OrderItem: React.FC<{idOrder: string}> = ({idOrder}) => {

    const dispatch = useDispatch<any>();
    const order =  useSelector((state: any) => state.aOrder.data); // get infor Order from Cart
    const cartData =  useSelector((state: any) => state.cartList.data); // get items in 1 Order

    useEffect(() => {
        dispatch(getCartItem(idOrder)); // get items in 1 Order
        dispatch(getOrder(idOrder));  // get infor Order from Cart
    },[idOrder])

    return(
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 300}}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Image</TableCell>
                        <TableCell align="center">Count</TableCell>
                        <TableCell align="center">Payment</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {cartData !== [] ? cartData.map((item: any, index: number) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="center">{item.type}</TableCell>
                            <TableCell align="center">{item.price}$</TableCell>
                            <TableCell align="center">
                                <img src={item.image} alt='nothing' className='imgFoodManage' />
                            </TableCell>
                            <TableCell align="center">{item.count}</TableCell>
                            <TableCell align="center">{item.payment}$</TableCell>
                        
                        </TableRow>
                    )): (
                        <p>None</p>
                    )}
                        <TableRow>
                            <TableCell rowSpan={2} />
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="center">
                               {order?.total}$
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} >Status:  
                                <span className={order?.status ? "done" : "pending" }> {order?.status ? " Done" : " Pending"}</span>
                            </TableCell>
                            <TableCell align="center">
                                <AcceptOrder item={idOrder} />
                                <PendingOrder item={idOrder} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

const Order: React.FC = () => {

    const dispatch = useDispatch<any>();
    const listOrder = useSelector((state: any) => state.orderList.data)

    const [idOrder, setIdOrder] = React.useState('');

    useEffect(() => {
        dispatch(getOrder(idOrder));
      
    },[idOrder])

    useEffect(() => {
        dispatch(getListOrder())
    },[])

    const handleChange = (event: SelectChangeEvent) => {
        setIdOrder(event.target.value);
    };
    
    console.log('listOdre', listOrder);
    
    return (
        <div className='admin__order'>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">ID</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={idOrder}
                    label="User"
                    onChange={handleChange}
                >
                    {listOrder && listOrder.map((item: any, index: number) => (
                        <MenuItem value={item.id}>{index}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div>
                <p style={{padding: "20px 0", color:"cadetblue"}}>ORDER</p>
                { idOrder !== "" ? (
                    <OrderItem idOrder={idOrder} />
                    ) : (
                        <>None</>
                    )  
                }
            </div>
        </div>
    );
};

export default Order;