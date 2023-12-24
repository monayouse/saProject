import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Bars, FidgetSpinner } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { cartContext } from '../context/cartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {


    const { id } = useParams();
    // console.log(id);
    //=======================
    const [sendingLoder, setsendingLoder] = useState(false)

    const { addProductToCart } = useContext(cartContext)
    const { isError, isLoading, isFetching, data } = useQuery('allProductsdetails', getAllProductsDetails)

    function getAllProductsDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    async function addProduct(id) {
        setsendingLoder(true)
        const res = await addProductToCart(id);
        //    console.log(res);
        if (res.status === "success") {
            console.log('products success');
            toast.success(res.message, {
                duration: 2000,
            })
        }
        else {
            toast.error('error', {
                duration: 2000,
            })
        }
        setsendingLoder(false);

    }

    if (isLoading) {
        return <div  className='vh-100 d-flex justify-content-center align-items-center '>
        <FidgetSpinner
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            ballColors={['#ff0000', '#00ff00', '#0000ff']}
            backgroundColor="#F4442E"
        />
        
        
        </div>
    }







    return <>

        <Helmet>
            <meta charSet="utf-8" />
            <title>Product Details</title>

        </Helmet>
        <div>

            <div className="container py-5 text-center">
                <div className="row align-items-center ">
                    <div className="col-md-3">
                        <div className="">
                            <img className='w-100' src={data.data.data.imageCover} alt={data.data.data.title} />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="">
                            <h1>{data.data.data.title}</h1>
                            <p className='text-muted'>{data.data.data.description}</p>
                            <h5>Price : {data.data.data.price} EGP</h5>
                            <button onClick={function () {
                                addProduct(data.data.data.id)
                            }} className='w-100 p-3 rounded-3 border-white main-bg-color'>   {sendingLoder ? <Bars
                                height="40"
                                width="40"
                                color="#fff"
                                ariaLabel="bars-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            /> : '+ Add to Card'}</button>
                        </div>
                    </div>
                </div>
            </div>







        </div>
    </>
}

