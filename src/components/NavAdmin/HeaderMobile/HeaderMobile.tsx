import React, {useState, useEffect} from 'react';
import './HeaderMobile.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import NavItem from '../../../Commons/DataNav';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';

type Anchor = 'left' ;

export default function HeaderMobile() {
  const [state, setState] = React.useState({
    left: false,
  });

  const [active, setActive] = useState(0);
    const location: any = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/admin/order':
                setActive(3);
                break
            case '/admin/category':
                setActive(2);
                break
            case '/admin/user':
                setActive(1);
                break
            case '/admin/food':
                setActive(0);
                break
            default:
                break;
        }
    },[]);


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
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      {NavItem.map((item) => (     
        <div 
        className={item.id === active ? 'box-active flex mobile__item': "flex mobile__item"}
        onClick={() => setActive(item.id)}
        key={item.id}
        >
            <Link to={`${item.url}`} className="flex" style={{alignItems: "center"}} >
                {item.icon}
                {item.title}
            </Link>
        </div>
        
    ))}
      </List>
    </Box>
  );

  return (
    <div className='mobile__header'>
        
          <WidgetsIcon onClick={toggleDrawer('left', true)}>left</WidgetsIcon>
          <Drawer
            anchor='left'
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        <div className='mobile__header-logo'>
            <Link to="/">
              <img src={logo} />
            </Link>
        </div>
    </div>
  );
}
