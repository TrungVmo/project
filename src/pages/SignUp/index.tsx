import React from 'react';
import '../../components/Sign.css' ;
import SignForm from '../../components/SignForm/SignForm';

const SignUp: React.FC = () => {
    return (
        <div className='sign'>
            <div className='sign-img'>
                <img src='./images/register.svg' />
            </div>
            <SignForm />
        </div>
    );
};

export default SignUp;