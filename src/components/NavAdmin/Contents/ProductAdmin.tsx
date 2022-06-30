import React, { useEffect, useState } from 'react';
import './ProductAdmin.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {SelectChangeEvent} from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addFood } from '../../../redux/actions/Food';
import FoodManage from '../FoodManage/FoodManage';

const ProductAdmin: React.FC = () => {

    const [foodImg, setFoodImg] = useState<any>(null);
    const [typeFood, setTypeFood] = useState<string>('');
    const [nameFood, setNameFood] = useState<string>('');
    const [desFood, setDesFood] = useState<string>('');
    const [priceFood, setPriceFood] = useState<number>(0);

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
        console.log(e.target.files[0]);
        
        // I've kept this example simple by using the first image instead of multiple
        setFoodImg(e.target.files[0]);
    }

    const dispatch = useDispatch<any>();
    const test = useSelector((state: any) => state.foodList)
    const addFoods = async(e: any) => {
        e.preventDefault();
        const itemFood = {
            foodImg: foodImg,
            foodImgName: foodImg.name,
            name: nameFood,
            des: desFood,
            price: priceFood,
            type: typeFood,
        }
        console.log(itemFood);
        
        await dispatch(addFood(itemFood));
        console.log(test.loading);

        if(!test.loading){
            alert('success');
        }
    }
    
    return (
        <>
            <form onSubmit={addFoods}>
                <div className='text-line'>
                    <span>Name</span>
                    <TextField 
                        id="outlined-basic" 
                        label="Name Food" 
                        variant="outlined" 
                        style={{width: '50%'}}
                        required
                        onChange={(e: any) => setNameFood(e.target.value)} />
                </div>
                <div className='text-line'>
                    <span>Description</span>
                    <TextField 
                        id="outlined-basic" 
                        label="Description" 
                        variant="outlined" 
                        style={{width: '50%'}}
                        required
                        onChange={(e: any) => setDesFood(e.target.value)} />
                </div>
                <div className='text-line'>
                    <span>Cost</span>
                    <TextField 
                        id="outlined-basic" 
                        label="Cost" 
                        variant="outlined" 
                        style={{width: '50%'}}
                        type='number' 
                        required
                        onChange={(e: any) => setPriceFood(e.target.value)} />
                </div>
                <div className='text-line'>
                    <span>Type</span>
                    <FormControl style={{width: '50%'}}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Type"
                            
                            required
                            value={typeFood}
                            onChange={(event: SelectChangeEvent<string>) => setTypeFood(event.target.value)}
                            >
                            <MenuItem value='Food'>Food</MenuItem>
                            <MenuItem value='Drink'>Drink</MenuItem>
                            <MenuItem value='Coffee'>Coffee</MenuItem>
                        </Select>
                    </FormControl>
                    
                </div>
                
                <div className='text-line'>
                    <span>Image</span>
                    <TextField id="outlined-basic" type='file' style={{width: '50%'}} onChange={handleChooseImg} required />
                </div>
                {
                    foodImg && (
                        <img src={preview} />
                    )
                }
                <Button 
                    variant="contained" 
                    
                    type='submit'
                    >Add Food
                </Button>
            </form>
        </>
    );
};

export default ProductAdmin;