import React from 'react';

const ProfileInfor: React.FC<{user: any}> = ({user}) => {

    console.log(user);
    
    return (
        <div>
            <div>
                <span>Name</span>
                <b>{`${user?.lastName} ${user?.firstName}`}</b>
            </div>
            <div>
                <span>Email</span>
                <b>{user?.email}</b>
            </div>
            <div>
                <span>Phone Number</span>
                <b>{user?.phone}</b>
            </div>
            <div>
                <span>Address</span>
                <b>{user?.address}</b>
            </div>
        </div>
    );
};

export default ProfileInfor;