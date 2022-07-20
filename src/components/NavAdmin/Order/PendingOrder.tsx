import React from 'react';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { TransitionProps } from '@mui/material/transitions';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PendingOrder: React.FC<{item: any}> = ({item}) => {

    console.log("id", item);
    
    const handlePending = async() => {
        try{
            const orderDoc = doc(db,"carts",item)
            await updateDoc(orderDoc, {...item, status : false})
            setOpen(false);
        }catch(err){
            alert(err)
        }
        
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
            <BookmarkRemoveIcon onClick={handleClickOpen} style={{color: 'brown'}} />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Do you want to Deny?"}</DialogTitle>
                <DialogActions>
                <Button onClick={handleClose}>NO</Button>
                <Button onClick={handlePending}>YES</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PendingOrder;