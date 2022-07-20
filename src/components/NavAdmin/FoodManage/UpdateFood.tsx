import React, {useState, useEffect} from 'react';
import EditIcon from '@mui/icons-material/Edit';
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
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateFood } from '../../../redux/actions/Food';
import { getCategorys } from '../../../redux/actions/Category';

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
    const updateLoad = useSelector((state: any) => state.foodList)
    
    const handleUpdate = async() => {
        const itemFood = {
            foodImg: foodImg,
            foodImgName: foodImg.name,
            name: nameFood,
            des: desFood,
            price: priceFood,
            type: typeFood,
        }
        await dispatch(updateFood(itemFood, item.id));

    }
    
    const typeList = useSelector((state: any) => state.cateList.data);
    useEffect(() => {
        dispatch(getCategorys());
    },[])

    return (
        <>
            <EditIcon onClick={handleClickOpen} className="icon__edit" />
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
                    <FormControl style={{width: 100}}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Type"
                            value={typeFood}
                            onChange={(e: any) => setTypeFood(e.target.value)}
                            >
                            {
                                typeList && typeList.map((item: any) => (
                                    <MenuItem value={item.type} key={item.id}>{item.type}</MenuItem>
                                ))
                            }
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
                    {
                        updateLoad.updateFoodprog >=0 && updateLoad.updateFoodprog < 100 ? 
                        (<Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>) : (
                            <>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleUpdate}>Update</Button>
                                {
                                    updateLoad.updateFoodprog == 100 && 
                                    <Alert severity="success">This is a success alert — check it out!</Alert>
                                }
                            </>
                        )
                    }
                </DialogActions>
            </Dialog>
            
        </>
    );
};

export default UpdateFood;