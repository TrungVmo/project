import React, {useState, useEffect} from 'react';
import './FoodManage.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteFood from './DeleteFood';
import UpdateFood from './UpdateFood';
import ProductAdmin from './Contents/ProductAdmin';
import { useDispatch, useSelector } from 'react-redux';
import {listFoods} from '../../../redux/actions/Food';
import { ItemFood } from '../../../redux/constants';

const FoodManage: React.FC = () => {

    const dispath = useDispatch<any>();
    const foodData = useSelector((state: any) => state.foodList.data)

    useEffect(() => {
        dispath(listFoods());

    },[])
    

    return (
        <>
            <div className='admin-main'>
                <ProductAdmin />
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                <TableContainer sx={{ maxHeight: 300, overflowY: 'auto'}}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Function</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {foodData && foodData.map((item: ItemFood, index: number) => (
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
                                <TableCell align="center">
                                    <img src={item.image} alt='nothing' className='imgFoodManage' />
                                </TableCell>
                                <TableCell align="center">
                                    <DeleteFood item={item}  />
                                    <UpdateFood item={item} />
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default FoodManage;