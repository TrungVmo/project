import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { removeFood } from '../../../redux/actions/Food';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteFood: React.FC<{item: any}> = ({item}) => {

    const dispatch = useDispatch<any>();
    const handleRemove = () => {
        dispatch(removeFood(item.id))
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
        
        <DeleteIcon onClick={handleClickOpen} className="icon__delete" />
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