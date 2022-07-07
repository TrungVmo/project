import React,{useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { addCate, getCategorys } from '../../../redux/actions/Category';
import DeleteCate from './DeleteCate';
import UpdateCate from './UpdateCate';

const Category: React.FC = () => {
    
    const [type, setType] = useState<string>("");

    const dispatch = useDispatch<any>();

    const cateData = useSelector((state: any) => state.cateList.data);
    useEffect(() => {
        dispatch(getCategorys());
    },[])

    console.log('cateData', cateData);
    
    const testCate = useSelector((state: any) => state.cateList)
    const handleAddType = async() => {
        const typeFood: string = type;
        await dispatch(addCate(typeFood))
        console.log('testCate',testCate);
        
    }
    return (
        <>
            <div>
                <div className='text-line'>
                    <span>Type</span>
                    <TextField 
                        id="outlined-basic" 
                        label="Type" 
                        variant="outlined" 
                        style={{width: '50%'}}
                        required
                        onChange={(e: any) => setType(e.target.value)} />
                </div>
                <Button 
                    variant="contained" 
                    onClick={handleAddType}
                    type='submit'
                    >Add Type
                </Button>
            </div>
            <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                <TableContainer sx={{ maxHeight: 300}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Tên loại</TableCell>
                                <TableCell align="center">Chức năng</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {cateData && cateData.map((item: any, index: number) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                
                                <TableCell align="center">{item.type}</TableCell>
                                
                                <TableCell align="center">
                                    <DeleteCate item={item} />
                                    <UpdateCate item={item} />
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
            </div>
        </>
    );
};

export default Category;