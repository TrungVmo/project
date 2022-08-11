import React, { useEffect, useState } from 'react';
import FormFilter from '../../components/FormFilter';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterFood, listFoods } from '../../redux/actions/Food';
import { Pagination } from '@mui/material';
import ListFood from '../../components/ListFood/ListFood';
import {ItemFood} from '../../redux/constants';
import usePagination from "../../Commons/Pagination";

const FilterType: React.FC = () => {

    const {type} = useParams();

    const dispatch = useDispatch<any>();
    const filterList = useSelector((state: any) => state.filterList.data);

    useEffect(() => {
        if(type){
            dispatch(getFilterFood(type));
            console.log(filterList);
            
        }
    },[type]);

    const [page, setPage] = useState<number>(1)
    const count = Math.ceil(filterList.length / 4);
    
    const _DATA = usePagination(filterList, 4);
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
                    <FormFilter />
                </div>
                <Pagination count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange} 
                />
                <div className='menu__content-list'>
                    
                    { 
                        filterList && _DATA.currentData().map((item: ItemFood, index: number) => (
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

export default FilterType;