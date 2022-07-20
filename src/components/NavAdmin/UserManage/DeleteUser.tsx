import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../../firebase';

const DeleteUser: React.FC<{item: any}> = ({item}) => {

    const onDeleteUser = () => {
        console.log('item', item);
        // auth().deleteUser(item.id)
        //     .then(() => {
        //     console.log('Successfully deleted user');
        //   })
        //   .catch((error: any) => {
        //     console.log('Error deleting user:', error);
        //   });
        const user = auth.currentUser;
        console.log(user);
        
        
    }

    return (
        <div onClick={onDeleteUser}>
            delete
        </div>
    );
};

export default DeleteUser;