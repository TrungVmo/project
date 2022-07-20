import React from 'react';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
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

const AcceptOrder: React.FC<{item: any}> = ({item}) => {

    
    const handleAccept = async() => {
        try{
            const orderDoc = doc(db,"carts",item)
            await updateDoc(orderDoc, {...item, status : true})
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
            <BookmarkAddedIcon onClick={handleClickOpen} style={{color: "green"}} />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Do you want to Accept?"}</DialogTitle>
                <DialogActions>
                <Button onClick={handleClose}>NO</Button>
                <Button onClick={handleAccept}>YES</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AcceptOrder;