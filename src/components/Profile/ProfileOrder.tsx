import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getCartItem } from '../../redux/actions/Cart';
import { collection, getDocs, doc, setDoc, getDoc, deleteDoc, updateDoc, addDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

const ProfileOrder: React.FC<{item: any}> = ({item}) => {

    const [cartData, setCartData] = useState<any>([]);

    const onGet = async () => {
        let filterData: any[] = [];
        const getCart = async() => {
            const data = query(collection(db, 'cartItem'), where("idCart", "==", item.id));
            const querySnapshot = await getDocs(data);
            const orderList = querySnapshot.docs.map((doc:any) => ({ ...doc.data(), id: doc.id }));
            return orderList
        }
        try{
            filterData = await getCart();
            setCartData(filterData);
        }catch(err){
            console.log(err);
            
        }
    }
     
    useEffect(() => {
        onGet();
    },[item]);

    return (
        <div style={{marginBottom: 30, border: '1px solid grey'}}>
            <div>Code Order: {item?.id}</div>
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
                            
                        </TableBody> 
                    </Table>
                </TableContainer>
            </Paper> 
            <div className='flex' style={{justifyContent: 'flex-end'}}>
                <span style={{fontSize: 30}}>Total: {item?.total}$</span>
            </div>
            <div className='flex' style={{justifyContent: 'flex-end'}}>
                <span style={{fontSize: 20}}>Status:</span>
                <span style={{fontSize: 20}} className={item?.status ? "done" : "pending"}> {item?.status ? "Done" : "Pending"}</span>
            </div>
        </div>     
    );
};

export default ProfileOrder;