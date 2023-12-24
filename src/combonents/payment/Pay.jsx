import axios from 'axios';
import React, { Component, useContext, useEffect } from 'react'
import { cartContext } from '../context/cartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

//  payment


export default function Payment() {

    const { cartid, setcartProducts,
        settotalcartprice,
        setnumOfCartItems } = useContext(cartContext);
    // console.log(cartid);
    async function confirmCashPayment() {

        let phoneValue = document.querySelector('#phone').value;
        let cityValue = document.querySelector('#city').value;
        let detailsValue = document.querySelector('#details').value;
        let shippingAddress = {
            "shippingAddress": {
                "details": detailsValue,
                "phone": phoneValue,
                "city": cityValue
            }
        }

        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`, shippingAddress, {
                headers: { token: localStorage.getItem('tkn') }
            })
            console.log(data);
            if (data.status === "success") {

                toast.success('order successfully added', {
                    duration: 2000,
                })
                setcartProducts([])
                settotalcartprice(0)
                setnumOfCartItems(0)
            }
            else {
                toast.error('error', {
                    duration: 2000,
                })
            }
        } catch (error) {
            console.log('error pay');
        }
    }


    async function confirmOnlinePayment() {

        let phoneValue = document.querySelector('#phone').value;
        let cityValue = document.querySelector('#city').value;
        let detailsValue = document.querySelector('#details').value;
        let shippingAddress = {
            "shippingAddress": {
                "details": detailsValue,
                "phone": phoneValue,
                "city": cityValue
            }
        }

        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}`, shippingAddress, {
                // params: { url: 'http://localhost:3000' }, static
                params: { url: `http://localhost:${window.location.port}` },// => dynamic
                headers: { token: localStorage.getItem('tkn') }
            })
            // console.log(data.session.url);
            window.open(data.session.url, '_blank')






        } catch (error) {
            console.log('error pay');
        }
    }





    return <>


        <Helmet>
            <meta charSet="utf-8" />
            <title>Payment</title>

        </Helmet>
        <div>
            <div className="container">
                <form action="">

                    <label htmlFor="phone" >phone</label>
                    <input id='phone' className='form-control' type="tel" />
                    <label htmlFor="city">city</label>
                    <input id='city' className='form-control' type="text" />
                    <label htmlFor="details">details</label>
                    <textarea id="details" className='form-control' type="text"></textarea>

                    <button type='button' onClick={confirmCashPayment} className='btn btn-primary my-3'>confirm Cash Payment </button>
                    <button type='button' onClick={confirmOnlinePayment} className='btn btn-primary m-3'>Confirm Online Payment </button>


                </form>
            </div>

        </div>
    </>
}