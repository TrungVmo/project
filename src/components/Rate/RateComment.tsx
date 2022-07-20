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
    
    const writeRating = (e: any) => {
        e.preventDefault()
        let dateNow = new Date().toLocaleString() + "";
        
        set(ref(dbRealtime, 'rating/' + `${foodID}/` + userID ), {
            id: userID,
            rate: rating,
            comment: comment,
            date: dateNow
                
        })
    }

    return (
        <form onSubmit={writeRating}>
            <TextField
            id="standard-textarea"
            label="Your Comment "
            placeholder="Comment"
            multiline
            required
            variant="standard"
            fullWidth
            onChange={handleComment}
            />
            <Rating name="simple-controlled" onChange={handleRate} />
            <Button variant="contained" type='submit'>Rate</Button>
        </form>
    );
};

export default RateComment;