import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { TransitionProps } from '@mui/material/transitions';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateProfile: React.FC = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSendEmail = () => {
        sendPasswordResetEmail(auth, 'lepiu128@gmail.com')
        .then((data) => {
            console.log('mes', data);
            
        }).catch((err) => {
            console.log('err', err);
            
        })
    }

    return (
        <>
            <SettingsIcon onClick={handleClickOpen}></SettingsIcon>
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
                <Button onClick={handleSendEmail}>YES</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UpdateProfile;