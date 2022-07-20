import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useDispatch } from 'react-redux';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Item{
    item: any,
    index: number,
    resetCart: any
}

const DeleteFood: React.FC<Item> = ({item, index, resetCart}) => {

    const ca = localStorage.getItem('cart');
    const cart = JSON.parse(ca ? ca : "");

    const dispatch = useDispatch<any>();

    const handleRemove = () => {
        cart.splice(index,1);
        localStorage.setItem('cart', JSON.stringify(cart));
        resetCart();
        dispatch({type: 'REMOVE_COUNT_CART', payload: cart.length})
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

export default DeleteFood;