import React, { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { getCategorys } from '../../redux/actions/Category';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';

const FormFilter: React.FC = () => {

    const dispatch = useDispatch<any>();
    const cateData = useSelector((state: any) => state.cateList.data);

    useEffect(() => {
        dispatch(getCategorys());
    },[])
    const [typeCate, setTypeCate] = React.useState('');
    const [cost, setCost] = React.useState('');
   
    const handleChange = (event: SelectChangeEvent) => {
        setTypeCate(event.target.value);
        
    };
    const handleChangeCost = (event: SelectChangeEvent) => {
        setCost(event.target.value as string);
    };
    return (
        <>
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
            <FormControl style={{width: 200}}>
                <InputLabel id="demo-simple-select-label">Filter with </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cost}
                    label="User"
                    onChange={handleChangeCost}
                >
                    <Link to="/search?keyword=price&max=50">
                        <MenuItem value={0}>Less than 50$</MenuItem>
                    </Link>
                    <Link to="/search?keyword=price&min=50&max=100">
                        <MenuItem value={1}>From 50$ - 100$</MenuItem>
                    </Link>
                    <Link to="/search?keyword=price&min=100">
                        <MenuItem value={2}>Over 100$</MenuItem>
                    </Link>
                    
                </Select>
            </FormControl>
        </>
    );
};

export default FormFilter;