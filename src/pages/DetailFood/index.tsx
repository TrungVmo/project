import React, { useEffect, useState } from 'react';
import './DetailFood.css';
import PaidIcon from '@mui/icons-material/Paid';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import RatingComment from '../../components/Rate/Ratting';
import RateComment from '../../components/Rate/RateComment';
import Skeleton from '@mui/material/Skeleton';
import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAFood } from '../../redux/actions/Food';

interface Rate{
    id: number,
    title: string
}

const rate : Rate[]= [
    {
        id:0,
        title: 'Tất cả'
    },
    {
        id:5,
        title: '5 sao'
    },
    {
        id:4,
        title: '4 sao'
    },
    {
        id:3,
        title: '3 sao'
    },
    {
        id:2,
        title: '2 sao'
    },
    {
        id:1,
        title: '1 sao'
    }, 
];

const DetailFood: React.FC = () => {

    const {id} = useParams();
    
    const [count, setCount] = useState(0);

    const increase = () => {
        setCount(count + 1);
    }

    const decrease = () => {
        setCount(count - 1);
    }

    const [active, setActive] = useState(rate[0].id);
    const local: any =  localStorage.getItem('user');
    const user =  JSON.parse(local);
    console.log(user);
    
    const dispatch = useDispatch<any>();
    const data = useSelector((state: any) => state.aFood);
    
    const foodData = useSelector((state: any) => state.aFood.data);
    useEffect(() => {
        dispatch(getAFood(id || ""))
    },[])
    
    return (
        <>
                    <div className='detail flex'>
                        <div className='detail-img flex'>
                            {data.loading ? (
                                 <Skeleton variant="rectangular" width={210} height={118} />
                            ) : ( <img src={foodData.image} />)}
                        </div>
                        <div className='detail-description'>
                            <div>
                                {
                                    data.loading ? (
                                        <>
                                            <Skeleton variant="text" />
                                            <Skeleton variant="text" />
                                            <Skeleton variant="text" />
                                        </>
                                    ) : (
                                        <>
                                            <h3>{foodData.name}</h3>
                                            <p>{foodData.des}</p>
                                            <p className='flex'>
                                                <PaidIcon />
                                                <span>{foodData.price}</span>
                                            </p>
                                        </>
                                    )
                                }
                            </div>
                            <div>
                                <span> Số lượng món: </span>
                                <button onClick={decrease}>-</button>
                                <span>{count}</span>
                                <button onClick={increase}>+</button>
                            </div>
                            <div>
                                <Button variant="contained" color='success'>Thêm vào giỏ hàng</Button>
                                <Button variant="outlined" color='error'>Mua ngay</Button>
                            </div>
                            
                        </div>
                    </div>
              
                    <div className='rating'>
                        <h3>Đánh Giá Sản Phẩm</h3>
                        <div className='rating-top flex'>
                            <div>
                                <p>4.9 trên 5</p>
                                <Rating
                                    name="simple-controlled"
                                    // value={value}
                                    defaultValue={2}
                                />
                            </div>
                            <div className='rating-top__filter flex'>
                                {rate.map((item) => (
                                    <div 
                                    onClick={() => setActive(item.id)} 
                                    key={item.id} 
                                    className={item.id === active ? "rate-active": ""}
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <RatingComment />
                        <RateComment />
                    </div>

        </>
    );
};

export default DetailFood;