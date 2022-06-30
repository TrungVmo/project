import React from 'react';
import Rating from '@mui/material/Rating';

const RatingComment:React.FC = () => {
    return (
        <div className='rating-main flex'>
            <img src='./logo192.png' />
            <div>
                <p>
                    <strong>trung 2000</strong>
                </p>
                <Rating
                    name="simple-controlled"
                    // value={value}
                    defaultValue={2}
                />
                <p>
                    <span>2022</span>
                </p>
                <p>mon an ngon</p>
            </div>
        </div>
    );
};

export default RatingComment;