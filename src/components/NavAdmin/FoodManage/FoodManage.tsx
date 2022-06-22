import React, {useState, useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import { db } from '../../../firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteFood from './DeleteFood';
import UpdateFood from './UpdateFood';


const FoodManage: React.FC = () => {

    const [foodData, setFoodData]= useState<any[]>();

    useEffect(() => {
        const getFoods = async () => {
            const data = await getDocs(collection(db, 'Food-product'));
            setFoodData(data.docs.map((doc:any) => ({ ...doc.data(), id: doc.id })));
        }
        getFoods();
    },[])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="center">Calories</TableCell>
                    <TableCell align="center">Fat</TableCell>
                    <TableCell align="center">Carbs</TableCell>
                    <TableCell align="center">Protein</TableCell>
                    <TableCell align="center">Combat</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {foodData && foodData.map((item: any, index: number) => (
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
                            <img src={item.image} />
                        </TableCell>
                        <TableCell align="center">
                            <DeleteFood />
                            <UpdateFood />
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        // <div>
        //     {
        //         foodData && foodData.map((item: object) => (
        //             <div>

        //             </div>
        //         ))
        //     }
        // </div>
    );
};

export default FoodManage;