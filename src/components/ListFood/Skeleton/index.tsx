import { Skeleton, Box } from '@mui/material';
import React from 'react';


const SkeletonItem: React.FC = () => {
    
    return (
        <Box sx={{ pt: 0.5 }}>
             <Skeleton variant="rectangular" width={210} height={118} />
             <Skeleton />
             <Skeleton />
        </Box>
    );
};

export default SkeletonItem;