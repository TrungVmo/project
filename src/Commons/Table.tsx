import React from 'react';
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

const TableOrder: React.FC = () => {
    return (
        <></>
        // <Paper sx={{ width: '100%', overflow: 'hidden' }}>

        //     <TableContainer sx={{ maxHeight: 300}}>
        //         <Table aria-label="simple table">
        //             <TableHead>
        //             <TableRow>
        //                 <TableCell>Name</TableCell>
        //                 <TableCell align="center">Type</TableCell>
        //                 <TableCell align="center">Price</TableCell>
        //                 <TableCell align="center">Image</TableCell>
        //                 <TableCell align="center">Count</TableCell>
        //                 <TableCell align="center">Payment</TableCell>
        //                 <TableCell align="center">Status</TableCell>
        //                 <TableCell align="center">Function</TableCell>
        //             </TableRow>
        //             </TableHead>
        //             <TableBody>
        //             {orderData !== [] ? orderData.map((item: any, index: number) => (
        //                 <TableRow
        //                 key={index}
        //                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //                 >
        //                     <TableCell component="th" scope="row">
        //                         {item.name}
        //                     </TableCell>
        //                     <TableCell align="center">{item.type}</TableCell>
        //                     <TableCell align="center">{item.price}$</TableCell>
        //                     <TableCell align="center">
        //                         <img src={item.image} alt='nothing' className='imgFoodManage' />
        //                     </TableCell>
        //                     <TableCell align="center">{item.count}</TableCell>
        //                     <TableCell align="center">{item.payment}$</TableCell>
        //                     <TableCell align="center" className={item.status ? 'done' : 'pending'}>{item.status ? 'Done' : 'Pending'}</TableCell>
        //                     <TableCell align="center">
        //                         <AcceptOrder item={item} />
        //                         <PendingOrder item={item} />
        //                     </TableCell>
        //                 </TableRow>
        //             )): (
        //                 <p>None</p>
        //             )}
        //             </TableBody>
        //         </Table>
        //     </TableContainer>
        // </Paper>
    );
};

export default TableOrder;