import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from 'react-query';
import axios from 'axios';
import { Blocks } from 'react-loader-spinner';
export default function CategorySider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false
    };
    function getAllCategorys() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    const { data, isLoading } = useQuery('caregorySlider', getAllCategorys, {
        refetchOnMount: false
    })
    // console.log(data?.data.data);
    if (isLoading) {
        return <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
        />
    }

    return (
    
        <div className='my-5'>
            
            <div>

                <Slider {...settings}>

                    {data?.data.data.map(function (product, idx) {
                        return <div key={idx}>
                            <img style={{ height: '200px' }} src={product.image} className='w-100' alt="img" />
                            <h6 className='mt-2'>{product.name}</h6>
                        </div>
                    })}


                </Slider>
            </div>
        </div>
    )
}
