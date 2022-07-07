import React, { useEffect, useState } from 'react';
import {TextField, Button, Rating} from '@mui/material';
import {onValue, ref, set} from "firebase/database";
import { getDatabase } from "firebase/database";

interface RateFood{
    foodID: string | undefined,
    userID: any
    // rate: number,
    // comment: string
}

const RateComment:React.FC<RateFood> = ({foodID, userID}) => {

    const dbRealtime = getDatabase();
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");

    const handleRate = (e: any) => {
        console.log(e.target.value);
        setRating(e.target.value)
    }

    const handleComment = (e: any) => {
       setComment(e.target.value)
    }

    console.log(foodID);
    const [todos, setTodos] = useState([]);

    console.log('todos',todos);
    
    const writeRating = () => {
        
        let dateNow = new Date().toLocaleString() + "";
        console.log(dateNow);
        
        set(ref(dbRealtime, 'rating/' + `${foodID}/` + userID ), {
            id: userID,
            rate: rating,
            comment: comment,
            date: dateNow
                
        })
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
            onChange={handleComment}
            />
            <Rating name="simple-controlled" onChange={handleRate} />
            <Button variant="contained" onClick={writeRating}>Đánh giá</Button>
        </div>
    );
};

export default RateComment;