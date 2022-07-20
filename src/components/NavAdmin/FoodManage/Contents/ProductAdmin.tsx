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
import { addFood } from '../../../../redux/actions/Food';
import { getCategorys } from '../../../../redux/actions/Category';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const ProductAdmin: React.FC = () => {

    const [foodImg, setFoodImg] = useState<any>(null);
    const [typeFood, setTypeFood] = useState<string>('');
    const [nameFood, setNameFood] = useState<string>('');
    const [desFood, setDesFood] = useState<string>('');
    const [priceFood, setPriceFood] = useState<number>(0);

    const [preview, setPreview] = useState();
    const dispatch = useDispatch<any>();

    const handleSetPrice = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const cost = parseInt(e.target.value);
        if(cost < 0){
            setPriceFood(0)
        }else{
            setPriceFood(cost)
        }
    }

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

    const typeList = useSelector((state: any) => state.cateList.data)
    useEffect(() => {
        dispatch(getCategorys())
    },[]);

    console.log(typeList);
    
    const test = useSelector((state: any) => state.foodList);
    // const getDa = useSelector((state: any) => state.testAdd.data)

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

        const data = await dispatch(addFood(itemFood));
        
        setNameFood("");
        setTypeFood("");
        setDesFood("");
        setPriceFood(0);
        setPreview(undefined);
        setFoodImg(null)
    }

    return (
        <>
            <form onSubmit={addFoods}>
                <div className='text__line'>
                    <span>Name</span>
                    <TextField 
                        id="outlined-basic" 
                        name="nameFood"
                        label="Name Food" 
                        variant="outlined" 
                        style={{width: '50%'}}
                        required
                        value={nameFood}
                        onChange={(e: any) => setNameFood(e.target.value)} />
                </div>
                <div className='text__line'>
                    <span>Description</span>
                    <TextField 
                        id="outlined-basic" 
                        name="desFood"
                        label="Description" 
                        variant="outlined" 
                        style={{width: '50%'}}
                        required
                        onChange={(e: any) => setDesFood(e.target.value)} />
                </div>
                <div className='text__line'>
                    <span>Cost</span>
                    <TextField 
                        id="outlined-basic" 
                        name="priceFood"
                        label="Cost" 
                        variant="outlined" 
                        style={{width: '50%'}}
                        type='number' 
                        required
                        onChange={(e: any) => handleSetPrice(e)} />
                </div>
                <div className='text__line'>
                    <span>Type</span>
                    <FormControl style={{width: '50%'}}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Type"
                            name="typeFood"
                            required
                            value={typeFood}
                            onChange={(event: SelectChangeEvent<string>) => setTypeFood(event.target.value)}
                            >
                            {
                                typeList && typeList.map((item: any) => (
                                    <MenuItem value={item.type} key={item.id}>{item.type}</MenuItem>
                                )) 
                            }
                        </Select>
                    </FormControl>
                    
                </div>
                
                <div className='text__line'>
                    <span>Image</span>
                    <TextField id="outlined-basic" type='file' style={{width: '50%'}} onChange={handleChooseImg} required />
                </div>
                {
                    foodImg && (
                        <img src={preview} />
                    )
                }
                <div className='text__endLine'>
                    {test.addFoodprog >= 0 && test.addFoodprog<100 ? 
                        (<Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>) : 
                        (
                            <Button 
                                variant="contained" 
                                type='submit'
                                >Add Food
                            </Button>
                        )
                    }
                </div>
            </form>
            {
                test.addFoodprog == 100 && 
                <Alert severity="success">This is a success alert — check it out!</Alert>
            }
        </>
    );
};

export default ProductAdmin;