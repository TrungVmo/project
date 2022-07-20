import React, { useEffect, useState } from 'react';
import FormFilter from '../../components/FormFilter';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterFood, listFoods } from '../../redux/actions/Food';

import ListFood from '../../components/ListFood/ListFood';
import {ItemFood} from '../../redux/constants';

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
                        filterList && filterList.map((item: ItemFood, index: number) => (
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