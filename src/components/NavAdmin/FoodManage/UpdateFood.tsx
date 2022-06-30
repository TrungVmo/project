import React, {useState, useEffect} from 'react';
import BuildIcon from '@mui/icons-material/Build';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux';
import { updateFood } from '../../../redux/actions/Food';

const UpdateFood: React.FC<{item: any}> = ({item}) => {

    const [open, setOpen] = React.useState(false);
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
        const objectUrl:any = URL.createObjectURL(foodImg);
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    },[foodImg])

    const handleChooseImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setFoodImg(undefined)
            return
        }

        setFoodImg(e.target.files[0]);
    }

    console.log('item', item);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const dispatch = useDispatch<any>();
    const handleUpdate = async() => {
    
        const itemFood = {
            foodImg: foodImg,
            foodImgName: foodImg.name,
            name: nameFood,
            des: desFood,
            price: priceFood,
            type: typeFood,
        }
        dispatch(updateFood(itemFood, item.id))
   
    }

    return (
        <>
            <BuildIcon onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name Food"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e: any) => setNameFood(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="des"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e: any) => setDesFood(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(e: any) => setPriceFood(e.target.value)}
                    />
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
                    <TextField id="outlined-basic" type='file' onChange={handleChooseImg} />
                    {
                        foodImg && (
                            <div>
                                <img src={preview} />
                            </div>
                        )
                    }
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UpdateFood;