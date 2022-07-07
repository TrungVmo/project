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
import { getOrders } from '../../../redux/actions/Cart';
import AcceptOrder from './AcceptOrder';
import PendingOrder from './PendingOrder';
import { listUsers } from '../../../redux/actions/Auth';

const Order: React.FC = () => {

    const dispatch = useDispatch<any>();
    const listUser = useSelector((state: any) => state.userList.data)
    const orderData = useSelector((state: any) => state.orderList.data);

    const [idUser, setIdUser] = React.useState('');

    useEffect(() => {
        dispatch(getOrders(idUser));
    },[idUser])

    useEffect(() => {
        dispatch(listUsers())
    },[])

    const handleChange = (event: SelectChangeEvent) => {
        setIdUser(event.target.value);
    };
    

    return (
        <div className='admin__order'>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={idUser}
                    label="User"
                    onChange={handleChange}
                >
                    {listUser && listUser.map((item: any) => (
                        <MenuItem value={item.id}>{item.id}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            
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
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Function</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {orderData !== [] ? orderData.map((item: any, index: number) => (
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
                                <TableCell align="center" className={item.status ? 'done' : 'pending'}>{item.status ? 'Done' : 'Pending'}</TableCell>
                                <TableCell align="center">
                                    <AcceptOrder item={item} />
                                   <PendingOrder item={item} />
                                </TableCell>
                            </TableRow>
                        )): (
                            <p>None</p>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
        </div>
    );
};

export default Order;