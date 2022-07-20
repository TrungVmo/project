import React, {useState, useEffect} from 'react';
import './HomeItem.css';
import Button from '@mui/material/Button';
import bg from '../../assets/hamber.png';
import cake from '../../assets/cake.png';
import tea from '../../assets/tea.png';
import { Link } from 'react-router-dom';

const HomeItem: React.FC = () => {

    return (
        <>
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
            <div className='home__main'>
                <div>
                    
                </div>
            </div>
            <div className='home__category'>
                <div className='home__category-text'>
                    <h2>Shop by category</h2>
                </div>
                <div className='home__category-shape'>
                    <div className='shape'>
                        <div className='shape__img'>
                            <img src={bg} />
                        </div>
                    </div>
                    <div className='shape'>
                        <div className='shape__img'>
                            <img src={tea} />
                        </div>
                    </div>
                    <div className='shape'>
                        <div className='shape__img'>
                            <img src={cake} />
                        </div>
                    </div>
                </div>

            </div>
            <div className='home__space'>

            </div>
        </>
    );
};

export default HomeItem;