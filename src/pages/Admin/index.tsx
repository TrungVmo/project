import React from 'react';
import './Admin.css';
import NavAdmin from '../../components/NavAdmin/NavAdmin';


const Admin: React.FC<{Elem: any}> = ({Elem}) => {
    return (
        <div>
            <NavAdmin />
            <div className='admin__element'>
                <Elem />
            </div>
        </div>
    );
};

export default Admin;