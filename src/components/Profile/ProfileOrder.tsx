import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getOrders } from '../../redux/actions/Cart';

const ProfileOrder: React.FC<{idUser: any}> = ({idUser}) => {

    const dispatch = useDispatch<any>();
    const orderData = useSelector((state: any) => state.orderList.data)

    useEffect(() => {
        dispatch(getOrders(idUser));
    },[]);

    return (
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
                            
                        </TableRow>
                    )): (
                        <p>None</p>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ProfileOrder;