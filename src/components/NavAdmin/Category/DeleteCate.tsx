import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useDispatch } from 'react-redux';
import { removeCategory } from '../../../redux/actions/Category';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteCate: React.FC<{item: any}> = ({item}) => {
    
    const dispatch = useDispatch<any>();
    const handleRemove = () => {
        dispatch(removeCategory(item.id))
        setOpen(false);
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        
        <DeleteIcon onClick={handleClickOpen} />
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Do you want to remove this?"}</DialogTitle>
            <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleRemove}>Yes</Button>
            </DialogActions>
        </Dialog>
            
        </>
    );
};

export default DeleteCate;