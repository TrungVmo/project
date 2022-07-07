import React, {useState, useEffect} from 'react';
import BuildIcon from '@mui/icons-material/Build';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { updateCate } from '../../../redux/actions/Category';

const UpdateCate: React.FC<{item: any}> = ({item}) => {

    const [open, setOpen] = React.useState(false);
    const [typeFood, setTypeFood] = useState<string>('');
    
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const dispatch = useDispatch<any>();
    const loading = useSelector((state: any) => state.cateList.loading);

    const handleUpdate = async() => {
    
        const itemCate = {
            type: typeFood,
        }
        dispatch(updateCate(itemCate, item.id))
        setOpen(false)
        if(!loading){
            alert('success');
        }
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
                            required
                            onChange={(e: any) => setTypeFood(e.target.value)}
                        />
                        
                    </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UpdateCate;