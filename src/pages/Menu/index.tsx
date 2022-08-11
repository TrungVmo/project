import React, { useEffect, useState } from 'react';
import './Menu.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListFood from '../../components/ListFood/ListFood';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterFood, listFoods } from '../../redux/actions/Food';
import {ItemFood} from '../../redux/constants';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import SkeletonItem from '../../components/ListFood/Skeleton';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit, startAt, orderBy, startAfter } from "firebase/firestore";
import { db } from '../../firebase';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { endBefore } from 'firebase/database';
import { getCategorys } from '../../redux/actions/Category';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import usePagination from "../../Commons/Pagination";


const Menu: React.FC = () => {
    
    const dispatch = useDispatch<any>();
    const listFood = useSelector((state: any) => state.foodList.data);
    const loading = useSelector((state: any) => state.foodList.loading);
    const cateData = useSelector((state: any) => state.cateList.data);
    const testArr = ['a','b','c','d'];

    useEffect(() => {
        dispatch(listFoods());
        dispatch(getCategorys());
    },[])

    // -------------------------------------------
    // const [page, setPage] = useState<object[]>([]);
    const [onTest, setOnTest] = useState<any>();

    const oneTest = async() => {
        const first = query(collection(db, "Food-product"), limit(2));
        const documentSnapshots = await getDocs(first);
        // setPage(documentSnapshots.docs.map((doc) => ({...doc.data()})));
        
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1] ;
        setOnTest(lastVisible);
        
    }

    useEffect(() => {
        oneTest()
    },[]);

    // ----------------------------------------------------
   
    const [typeCate, setTypeCate] = React.useState('');
   
    const handleChangeType = (event: SelectChangeEvent) => {
        setTypeCate(event.target.value);
        
    };
    // 

    const [cost, setCost] = React.useState('');

    const handleChangeCost = (event: SelectChangeEvent) => {
        setCost(event.target.value as string);
    };
    
    const [page, setPage] = useState<number>(1)
    const count = Math.ceil(listFood.length / 4);

    const _DATA = usePagination(listFood, 4);
    const handleChange = (e: any,p: any) => {
        setPage(p);
        _DATA.jump(p);
    }
    
    return (
        <div className='menu'>
            <div className='menu__top'>
                <span>Food Menu</span>
            </div>
            <div className='menu__content'>
                <div className='flex'>
                    <span className='span'>Delcious Food Menu</span>
                    <FormControl style={{width: 200}}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeCate}
                            label="User"
                            onChange={handleChangeType}
                        >
                            {cateData && cateData.map((item: any) => (
                                <Link to={`/menu/${item.type}`}>
                                    <MenuItem value={item.type}>
                                            {item.type}
                                    </MenuItem>
                                </Link>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl style={{width: 200}}>
                        <InputLabel id="demo-simple-select-label">Filter with </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={cost}
                            label="User"
                            onChange={handleChangeCost}
                        >
                            <Link to="/search?keyword=price&max=50">
                                <MenuItem value={0}>Less than 50$</MenuItem>
                            </Link>
                            <Link to="/search?keyword=price&min=50&max=100">
                                <MenuItem value={1}>From 50$ - 100$</MenuItem>
                            </Link>
                            <Link to="/search?keyword=price&min=100">
                                <MenuItem value={2}>Over 100$</MenuItem>
                            </Link>
                            
                        </Select>
                    </FormControl>
                    
                </div>
                <Pagination count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange} 
                />
                <div className='menu__content-list'>
                    
                    { !loading ?(_DATA && _DATA.currentData().map((item: ItemFood, index: number) => (
                        <Link to={`/detail/${item.id}`}>
                             <ListFood key={index} item={item} loading={loading} />
                         </Link>  
                        ))): testArr.map(() => (<SkeletonItem />) )
                    }
                    {
                        !loading && (
                            <div>
                                {/* <ArrowCircleLeftIcon onClick={prevPage} />
                                <ArrowCircleRightIcon onClick={nextPage} /> */}
                            </div>
                        )
                    }
                     {/* <Stack spacing={2}>
                        <Pagination count={listFood?.length} color="primary" />
                    </Stack> */}
                </div>
                
            </div>
        </div>
    );
};

export default Menu;