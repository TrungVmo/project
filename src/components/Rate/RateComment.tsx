import React from 'react';
import {TextField, Button, Rating} from '@mui/material';

const RateComment:React.FC = () => {

    const handleRate = (e: any) => {
        console.log(e.target.value);
        
    }
    return (
        <div>
            <TextField
            id="standard-textarea"
            label="Đánh giá của bạn"
            placeholder="Đánh giá"
            multiline
            variant="standard"
            fullWidth
            />
            <Rating name="simple-controlled" onChange={handleRate} />
            <Button variant="contained">Đánh giá</Button>
        </div>
    );
};

export default RateComment;