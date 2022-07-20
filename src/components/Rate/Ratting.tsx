import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Test{
    item: any,
}

const RatingComment:React.FC<Test> = ({item}) => {
    console.log('item', item);
  
    const [userData, setUserData] = useState<any>();
    const getA = async() => {
        try {
            const data: any = await getDoc(doc(db,'users', item.id));
            if(data.exists()){
                setUserData(data.data()) ;
            }   
        } catch (error) {
            console.log('errrr', error);
        }
    } 
    useEffect(() => {
       getA();
    },[])

    console.log('ggg', userData);
    return (
        <div className='rating-main flex'>
            {
                userData && item ? (
                    <>
                        <AccountCircleIcon style={{fontSize: 50}} />
                        <div>
                            <p>
                                <strong>{userData?.firstName} {userData?.lastName}</strong>
                            </p>
                            <Rating
                                name="rate-only"
                                value={parseInt(item.rate)}
                                // defaultValue={parseInt(item.rate)}
                                readOnly
                            />
                            <p>
                                <span>{item.date}</span>
                            </p>
                            <p>Comment: {item.comment}</p>
                        </div>
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    );
};

export default RatingComment;