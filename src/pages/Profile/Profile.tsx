import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAUser } from '../../redux/actions/Auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./Profile.css";
import ProfileOrder from '../../components/Profile/ProfileOrder';
import ProfileInfor from '../../components/Profile/ProfileInfor';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import UpdateProfile from '../../components/Profile/UpdateProfile';
import { getFilterOrder } from '../../redux/actions/Cart';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Profile:React.FC = () => {
    
    const us = localStorage.getItem('user');
    const user = us && JSON.parse(us ? us : "");

    const [border, setBorder] = useState<boolean>(true);
    const dispatch = useDispatch<any>();
    const userData = useSelector((state: any) => state.aUser.data);
    const orderData = useSelector((state: any) => state.filterOrder.data);
    
    console.log('id', user.uid);
    useEffect(() => {
        dispatch(getAUser(user.uid))
        dispatch(getFilterOrder(user.uid)) // filter id Carts of user current
    },[])

    console.log("orderData", orderData);
    
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/signin")
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='profile'>
            <div className='profile__top flex'>
                <div className='profile__top-icon'>
                    <AccountCircleIcon />
                </div>
                <div className='profile__top-info'>
                    <strong>{userData?.lastName && `${userData.lastName}  ${userData.firstName}`}</strong>
                    <ExitToAppIcon onClick={handleClickOpen} />
                    <UpdateProfile />
                </div>
                {/* dialog logout */}
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
                    <Button onClick={handleLogout}>YES</Button>
                    </DialogActions>
                </Dialog>
                {/* dialog update */}
            </div>
            <div className='profile__main flex'>
                <div className={border ? 'border' : ''} onClick={() => setBorder(true)}>
                    <span>Order</span>
                </div>
                <div className={!border ? 'border' : ''} onClick={() => setBorder(false)}>
                    <span>Portfolio</span>
                </div>
            </div>
           {
            border ? (
                <div className='profile__order'> 
                
                    {
                        orderData && orderData.map((item: any) => (
                            <ProfileOrder item={item} />
                        ))
                    }      
                </div>
            ): (
                <div className='profile__portfolio'>
                    <ProfileInfor user={userData} />
                </div>
            )
           }
           
        </div>
    );
};

export default Profile;