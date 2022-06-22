import React, {useState} from 'react';
import './Slider.css';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import { ArrowLeftRounded } from '@mui/icons-material';

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:'./images/slide1.jpg'
  },
  {
    label: 'Bird',
    imgPath:'./images/slide2.jpg'
  },
  {
    label: 'Bali, Indonesia',
    imgPath:'./images/slide3.jpg'
  },
  
];

const Slider: React.FC = () => {
  

  const [current, setCurrent] = useState<number>(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <section className='section'>
      <ArrowLeftRounded onClick={prevSlide} className='left' />
      <ArrowRightRoundedIcon onClick={nextSlide} className='right' />
      {images.map((item, index) => (
        <div className={index === current ? 'slide active' : 'slide'}
        key={index}>
          {index === current && (
              <img src={item.imgPath} alt='travel image' className='image' />
            )}
        </div>
      ))
      }
    </section>
  );
};

export default Slider;