import React from 'react';
import '../../components/Sign.css' ;
import SignInForm from '../../components/SignInForm/SignInForm';
import { auth } from '../../firebase';

const SignUp: React.FC = () => {

    return (
        <div className='sign'>
            <div className='sign-img'>
                <img src='./images/log.svg' />
            </div>
            <SignInForm />
        </div>
    );
};

export default SignUp;