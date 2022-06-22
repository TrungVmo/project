import React, { useEffect, useState } from 'react';
import './ProductAdmin.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { storage, db } from '../../../firebase';
import {addDoc, collection} from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import Button from '@mui/material/Button';

const ProductAdmin: React.FC = () => {

    const [foodImg, setFoodImg] = useState<any>(null);
    const [typeFood, setTypeFood] = useState();
    const [nameFood, setNameFood] = useState();
    const [desFood, setDesFood] = useState();
    const [priceFood, setPriceFood] = useState();

    const [preview, setPreview] = useState();

    useEffect(() => {
        if(!foodImg){
            setPreview(undefined)
            return
        }
        const objectUrl:any = URL.createObjectURL(foodImg)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    },[foodImg])

    const handleChooseImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setFoodImg(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setFoodImg(e.target.files[0]);
    }

    const addFood = async () => {
        const storageRef = ref(storage, `files/${foodImg.name}`)
       const uploadTask = uploadBytesResumable(storageRef, foodImg)
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
        }, (err) => console.log(err), () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url);
                
                addDoc(collection(db, "Food-product"), {
                    name: nameFood,
                    des: desFood,
                    price: priceFood,
                    type: typeFood,
                    image: url
                })
            })
        }
        )
    }
    
    return (
        <>
            <div className='text-line'>
                <span>Name</span>
                <TextField id="outlined-basic" label="Name Food" variant="outlined" onChange={(e: any) => setNameFood(e.target.value)} />
            </div>
            <div className='text-line'>
                <span>Description</span>
                <TextField id="outlined-basic" label="Description" variant="outlined" onChange={(e: any) => setDesFood(e.target.value)} />
            </div>
            <div className='text-line'>
                <span>Cost</span>
                <TextField id="outlined-basic" label="Cost" variant="outlined" type='number' onChange={(e: any) => setPriceFood(e.target.value)} />
            </div>
            <div className='text-line'>
                <span>Type</span>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type"
                        value={typeFood}
                        onChange={(e: any) => setTypeFood(e.target.value)}
                        >
                        <MenuItem value='Food'>Food</MenuItem>
                        <MenuItem value='Drink'>Drink</MenuItem>
                        <MenuItem value='Coffee'>Coffee</MenuItem>
                    </Select>
                </FormControl>
                
            </div>
            
            <div className='text-line'>
                <span>Image</span>
                <TextField id="outlined-basic" type='file' onChange={handleChooseImg} />
            </div>
            {
                foodImg && (
                    <img src={preview} />
                )
            }
            <Button variant="contained" onClick={addFood}>Add Food</Button>
        </>
    );
};

export default ProductAdmin;