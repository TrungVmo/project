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

const MenuLi: React.FC<{item: string}> = ({item}) => {

    const [show, setShow] = useState<boolean>(false);
    const handleShow = () => {
        if(!show){
            setShow(true)
        }
    }
    return(
        <li onClick={handleShow}>
            <span>{item}</span>
            {/* {show && <ArrowDropDownIcon />} */}
        </li>
    )
}

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
    const [page, setPage] = useState<object[]>([]);
    const [onTest, setOnTest] = useState<any>();

    const oneTest = async() => {
        const first = query(collection(db, "Food-product"), limit(2));
        const documentSnapshots = await getDocs(first);
        setPage(documentSnapshots.docs.map((doc) => ({...doc.data()})));
        
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1] ;
        setOnTest(lastVisible);
        
    }

    useEffect(() => {
        oneTest()
    },[]);

    // ----------------------------------------------------
    const nextPage = async() => {

        const next = query(collection(db, "Food-product"),
        startAfter(onTest),
        limit(2));
        
        const ccccS= await getDocs(next);
        setOnTest(ccccS.docs[ccccS.docs.length-1])
        setPage(ccccS.docs.map((doc) => ({...doc.data()})));
    }
    
    const prevPage = async() => {

        const next = query(collection(db, "Food-product"),
        // endBefore(onTest),
        limit(2));        
        const ccccS= await getDocs(next);
        setOnTest(ccccS.docs[0])
        setPage(ccccS.docs.map((doc) => ({...doc.data()})));
    }
    // ------------------------------------------
    const [typeCate, setTypeCate] = React.useState('');
   
    const handleChange = (event: SelectChangeEvent) => {
        setTypeCate(event.target.value);
        
    };
    // 

    // const [list, setList] = useState([]);
    // const [page, setPage] = useState(1);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await query(collection(db, "Food-product"),
    //             limit(2))
    //             .onSnapshot(function(querySnapshot) { 
    //                 var items = [];
    //                 querySnapshot.forEach(function(doc) {
    //                     items.push({ key: doc.id, ...doc.data() });
    //                 });
    //                 console.log('first item ', items[0])
    //                 setList(items);
    //             })
    //     };
    //     fetchData();
    // }, []);

    // const showNext = ({ item }) => {
    //     if(list.length === 0) {
    //         alert("Thats all we have for now !")
    //     } else {
    //         const fetchNextData = async () => {
    //             await firebase.firestore().collection('users')
    //                 .orderBy('created', 'desc')
    //                 .limit(5)
    //                 .startAfter(item.created)
    //                 .onSnapshot(function(querySnapshot) {
    //                     const items = [];
    //                     querySnapshot.forEach(function(doc) {
    //                         items.push({ key: doc.id, ...doc.data() });
    //                     });
    //                     setList(items);
    //                     setPage(page + 1)
    //                 })
    //         };
    //         fetchNextData();
    //     }
    // };
    
    
    
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
                            onChange={handleChange}
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
                    
                </div>
                <div className='menu__content-list'>
                    
                    { !loading ?(listFood && listFood.map((item: ItemFood, index: number) => (
                        <Link to={`/detail/${item.id}`}>
                             <ListFood key={index} item={item} loading={loading} />
                         </Link>  
                        ))): testArr.map(() => (<SkeletonItem />) )
                    }
                    {
                        !loading && (
                            <div>
                                <ArrowCircleLeftIcon onClick={prevPage} />
                                <ArrowCircleRightIcon onClick={nextPage} />
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