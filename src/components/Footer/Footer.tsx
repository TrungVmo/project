import React from 'react';
import './Footer.css';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer: React.FC = () => {
    return (
        <footer className='footer'>
            <div className='footer__top flex'>
                <div>
                    <RestaurantMenuIcon />
                    <p>Miễn phí vận chuyển, giao hàng tận nơi, tận tình phục vụ khách hàng</p>
                </div>
                <div>
                    <FastfoodIcon />
                    <p>Miễn phí vận chuyển, giao hàng tận nơi, tận tình phục vụ khách hàng</p>
                </div>
                <div>
                    <BeenhereIcon />
                    <p>Miễn phí vận chuyển, giao hàng tận nơi, tận tình phục vụ khách hàng</p>
                </div>
            </div>
            <div className='footer__main'>
                <h2> <span>Recreate</span> a Recipe</h2>
                <p>Figure out what is in your food! Have you ever looked at a commercial
                    food product and wondered how to make it? Not a problem. Use this professional technique
                    to recreate a recipe from any nutrition label.
                </p>
            </div>
            <div className='footer__bot '>
                <h3>About us</h3>
                <div>
                    <FacebookRoundedIcon />
                    <TwitterIcon />
                    <InstagramIcon />
                </div>
                <p>
                    Tất cả bản quyền được thực hiện bới tôi, tôi yêu 2022
                </p>
            </div>
        </footer>
    );
};

export default Footer;