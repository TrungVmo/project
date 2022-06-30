import * as React from 'react';
import './ListFood.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import { ItemFood } from '../../redux/constants';
import { useSelector } from 'react-redux';

interface Test{
  item: ItemFood,
  loading: boolean
}

const ListFood: React.FC<Test> = ({item, loading}) => {
  
  console.log(loading);
  
  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea>
        <CardMedia
            component="img"
            height="160"
            image={item.image}
            alt="green iguana"
            className='menu-imgFood'
          />
          <CardContent>
            {loading ? (<span>load</span>) : (<></>)}
          <Typography gutterBottom variant="h5" component="div">
            {item?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='flex'>
            {item?.des}
          </Typography>
          <Typography variant="body2" color="red" className='flex'>
            {item?.price}$
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ListFood;