import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import {listUsers} from '../../../redux/actions/Auth';
import { ItemUser } from '../../../redux/constants';
import DeleteUser from './DeleteUser';

const UserManage: React.FC = () => {

    const dispatch = useDispatch<any>();
    const userData = useSelector((state: any) => state.userList.data);

    useEffect(() => {
        dispatch(listUsers())
    },[])

    console.log('user', userData);
    
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>

            <TableContainer sx={{ maxHeight: 300}}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Họ</TableCell>
                        <TableCell align="center">Tên</TableCell>
                        <TableCell align="center">Ảnh đại diện</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Địa chỉ</TableCell>
                        <TableCell align="center">Số điện thoại</TableCell>
                        <TableCell align="center">Chức năng</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {userData && userData.map((item: ItemUser, index: number) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {item.firstName}
                            </TableCell>
                            <TableCell align="center">{item.lastName}</TableCell>
                            <TableCell align="center">
                                <img src='' alt='nothing' className='imgFoodManage' />
                            </TableCell>
                            <TableCell align="center">{item.email}</TableCell>
                            <TableCell align="center">{item.address}</TableCell>
                            <TableCell align="center">{item.phone}</TableCell>
                            <TableCell align="center">
                                <DeleteUser item={item} />
                                {/* <UpdateFood item={item} /> */}
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default UserManage;