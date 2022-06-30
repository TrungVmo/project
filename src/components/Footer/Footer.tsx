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
                <h2> <span>Khởi tạo</span> công thức mới</h2>
                <p>Công thức món ăn của bạn là gì! Bạn đã bao giờ nhìn vào một sản phẩm thực phẩm thương mại
                    và tự hỏi làm thế nào để làm cho nó? Không thành vấn đề. 
                    Sử dụng kỹ thuật chuyên nghiệp này để tạo lại một công thức từ bất kỳ dinh dưỡng nào</p>
            </div>
            <div className='footer__bot '>
                <h3>Về chúng tôi</h3>
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