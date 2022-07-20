import React, { useEffect, useState } from 'react';
import FormFilter from '../../components/FormFilter';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterFood, listFoods } from '../../redux/actions/Food';
import { getCategorys } from '../../redux/actions/Category';
import { collection, query, where, getDocs, limit, startAt, orderBy, startAfter, onSnapshot, endAt } from "firebase/firestore";
import { db } from '../../firebase';
import ListFood from '../../components/ListFood/ListFood';
import {ItemFood} from '../../redux/constants';
import { orderByChild } from 'firebase/database';

const SearchFilter: React.FC = () => {

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    let que = useQuery();

    let search = que.get("name");
    let ma = que.get('max');
    let mi = que.get('min');
    let max = ma ? parseInt(ma) : null;
    let min = mi ? parseInt(mi) : null;
    
    const [data, setData] = useState<any>();

    const dispatch = useDispatch<any>();
    const listFood = useSelector((state: any) => state.foodList.data);
    
    useEffect(() => {
        dispatch(getCategorys());
        dispatch(listFoods());
        if(min || max){      
            if(min && max){
                console.log('mm');
                filterCostMM();
            }else{
                console.log('m');
                filterCostM()
            }
        }
    },[max, min]);

    const filterCostM = async() => {

        const qM = max ? query(collection(db, "Food-product"),where("price", '<', max)) : query(collection(db, "Food-product"),where("price", '>', min));
        const querySnapshot =await getDocs(qM);
        const dataList = querySnapshot.docs.map((doc:any) => ({ ...doc.data(), id: doc.id}));
        console.log('dataList',dataList);
        
        setData(dataList)
    }

    const filterCostMM = async() => {

        const q = query(collection(db, "Food-product"),where("price", '>', min), where("price", '<', max));
        const querySnapshot = await getDocs(q);
        const dataList = querySnapshot.docs.map((doc:any) => ({ ...doc.data(), id: doc.id }));
        setData(dataList)
    }
    // 
    useEffect(() => {
        
        dispatch(listFoods())
        
        if(search){
            console.log('chay ko');
            
            onSearch();
        }
    },[search])

    const onSearch = async() => {
        const dataSearch = listFood.filter((data: any) => data.name.toLowerCase().includes(search?.toLowerCase()));
        setData(dataSearch);
        console.log('search', dataSearch);
        
    }

    console.log('data',data);
    

    return (
        <div className='menu'>
            <div className='menu__top'>
                <span>Food Menu</span>
            </div>
            <div className='menu__content'>
                <div className='flex'>
                    <span className='span'>Delcious Food Menu</span>
                    <FormFilter />
                </div>
                <div className='menu__content-list'>
                    
                    { 
                        data && data.map((item: ItemFood, index: number) => (
                        <Link to={`/detail/${item.id}`}>
                            <ListFood key={index} item={item} loading={false} />
                        </Link>  
                        ))
                        
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;