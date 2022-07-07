import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ListFood from '../../components/ListFood/ListFood';
import { getFilterFood } from '../../redux/actions/Food';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const Filter: React.FC = () => {

    const {type} = useParams();

    const dispatch = useDispatch<any>();
    const data = useSelector((state: any) => state.filterList)

    const cateData = useSelector((state: any) => state.cateList.data);

    useEffect(() => {
        if(type){
            dispatch(getFilterFood(type))
        }
    },[type])

    const [typeCate, setTypeCate] = React.useState('');
   
    const handleChange = (event: SelectChangeEvent) => {
        setTypeCate(event.target.value);
        
    };
    console.log('dattttttt', data.data);
    
    
    return (
        <div className='menu'>
            <div className='menu__top'>
                <span>Food Menu</span>
            </div>
            <div className='menu__content'>
                <div className='flex'>
                    <span className='span'>Delcious Food Menu</span>
                    <FormControl style={{width: 200}}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeCate}
                            label="User"
                            onChange={handleChange}
                        >
                            {cateData && cateData.map((item: any) => (
                                <Link to={`/menu/${item.type}`}>
                                    <MenuItem value={item.type}>
                                            {item.type}
                                    </MenuItem>
                                </Link>
                            ))}
                        </Select>
                    </FormControl>
                    
                </div>
                <div className='menu__content-list'>
                    
                    { data && data.data.map((item: any, index: number) => (
                        <Link to={`/detail/${item.id}`}>
                             <ListFood key={index} item={item} loading={data.loading} />
                         </Link>  
                        ))
                    }
                   
                     
                </div>
            </div>
        </div>
        // <div className='flex'>
        //     {
        //         data && data.data.map((item: any, index: number) => (
        //             <Link to={`/detail/${item.id}`}>
        //                 <ListFood item={item} loading={data.loading} />
        //             </Link>
        //         ))
        //     }
        // </div>
    );
};

export default Filter;