import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export default function HomeSlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
    };



    return (
        <div>
            <div>
                
                <Slider {...settings}>
                    <div>
                    <img style={{height:'400px'}} src={require('../../imags/slider-image-1.jpeg')} className='w-100' alt="img" />
                        
                    </div>
                    <div>
                    <img style={{height:'400px'}} src={require('../../imags/slider-image-2.jpeg')} className='w-100' alt="img" />
                    </div>
                    <div>
                    <img style={{height:'400px'}} src={require('../../imags/slider-image-3.jpeg')} className='w-100' alt="img" />
                    </div>
                    <div>
                    <img style={{height:'400px'}} src={require('../../imags/slider-2.jpeg')} className='w-100' alt="img" />
                    </div>
                  
                </Slider>
            </div>
        </div>
    )
}

