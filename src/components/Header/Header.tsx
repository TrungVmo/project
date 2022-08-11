import React, { useState, useCallback, useEffect } from 'react';
import './Header.css';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import logo from '../../assets/logo.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CakeIcon from '@mui/icons-material/Cake';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
}));

type Anchor = 'left' ;

const category = [
    {
        title: 'Food',
        icon: <FastfoodIcon />
    },
    {
        title: 'Drink',
        icon: <LocalDrinkIcon />
    },
    {
        title: 'Cake',
        icon: <CakeIcon />
    }
];

const Header: React.FC = () => {

    // -----header----- mobie-----

    const [state, setState] = React.useState({
        left: false,
      });

    const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
        <Box
          sx={{ width: 300 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
          className='nav__mobile'
        >
          <div>
            
          </div>
          <List >
            {category.map((li) => (
                <Link to={`/menu/${li.title}`}>
                    <li>
                        {li.icon}
                        {li.title}
                    </li>
                </Link>
            ))}
          </List>
          <List>
            <li>
                <SearchIcon onClick={handleClickOpen} />
            </li>
            <li>
                <Link to="/cart"> 
                <StyledBadge badgeContent={count > 0 ? count : ''} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
                </Link>
            </li>
            <li>
                <Link to="/profile">
                    <AccountCircleIcon />
                </Link>
            </li>
          </List>
        </Box>
    );
    // 
    const [count, setCount] = useState<number>(0);
    const [search, setSearch] = useState<any>();

    const countCart = useSelector((state: any) => state.cartList);

    
    // let ca = localStorage.getItem('cart');
    // let cart = ca ? JSON.parse(ca ? ca : "") : 0; 

    // const getCountCart = useCallback(async() => {
    //     let res = await localStorage.getItem('cart');
    //     let result = res ? await JSON.parse(res? res : "") : 0; 

    //     if(result){
    //         setCount(result.length);
    //     }
    // },[]);

    // useEffect(() => {
    //     getCountCart();
    // }, []);

    // search

    const navigate = useNavigate();
    const handleSubmit = (e: any) => {
        e.preventDefault();
        navigate(`/search?name=${search}`);
        setSearch("");
        setOpen(false);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //  event scroll
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);


    return (
        <header className={offset === 0 ? "" : "header__offSet"}>
            <div className='header flex'>
                <div className='header__Nav'>
                    <WidgetsIcon onClick={toggleDrawer('left', true)}>left</WidgetsIcon>
                    <Drawer
                        anchor='left'
                        open={state['left']}
                        onClose={toggleDrawer('left', false)}
                    >
                        {list('left')}
                    </Drawer>
                </div>
                <div className='header__Left'>
                    
                    <div className='header__Left-logo'>
                        <Link to="/">
                            <img src={logo} />
                        </Link>
                    </div>
                    <ul className='flex'>
                    {category.map((li) => (
                        <Link to={`/menu/${li.title}`}>
                            <li>
                                {li.title}
                            </li>
                        </Link>
                    ))}
                    </ul>
                </div>
                
                <div className='header__list flex'>
                    
                    <ul className='flex'>
                        <li>
                            <SearchIcon onClick={handleClickOpen} />
                            <Dialog open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}

                                aria-describedby="alert-dialog-slide-description">
                                <DialogContent>
                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Search Food"
                                            type="text"
                                            onChange={(e:any) => setSearch(e.target.value)}
                                            fullWidth
                                            variant="standard"
                                        />
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </li>
                        <li>
                           <Link to="/cart"> 
                            <StyledBadge badgeContent={countCart?.count ? countCart?.count : 0} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                           </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <AccountCircleIcon />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            
        </header>
    );
};

export default Header;