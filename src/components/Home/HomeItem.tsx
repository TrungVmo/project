import React from 'react';
import './HomeItem.css';
import Button from '@mui/material/Button';
import bg from '../../assets/hamber.png';
import { Link } from 'react-router-dom';

const HomeItem: React.FC = () => {
    return (
        <div className='home__intro flex' >
            <div className='home__intro-left'>
                <div>
                    <h2>Food Made With Love</h2>
                    <p>
                        Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. 
                        In Minus Laudantium Exercitationem Dica.
                    </p>
                    <button>
                        <Link to="/menu" >Order Now</Link>
                    </button>
                </div>
            </div>
            <div className='home__intro-right'>
                <img src={bg} />
            </div>
        </div>
    );
};

export default HomeItem;