import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Bars } from 'react-loader-spinner';

export default function AllOrders() {

  const [userOrder, setuserOrder] = useState(null);


  // console.log('all orders');

  async function getUserOrders(id) {

    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      console.log(data);
      setuserOrder(data);

      // console.log('dddd');
    }
    catch (error) {
      console.log('rerror in order');
    }

  }




  useEffect(() => {
    const res = jwtDecode(localStorage.getItem('tkn'));

    getUserOrders(res.id)

  }, [])





  if (userOrder === null) {
    return <Bars
      height="40"
      width="40"
      color="#fff"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />

  }



  return <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>All Orders</title>

    </Helmet>


    <div>

      <div className="container">
        <div className="row g-4">
          {userOrder.map((order, idx) => {
            return <div key={idx} className="col-md-6 ">

              <div className="bg-secondary  rounded-4">
                <div className="container ">
                  <div className="row">
                    {order.cartItems?.map((item, index) => {
                      return <div key={index} className="col-sm-4">
                        <div className="bg-danger  my-2 rounded-3">
                          <img src={item.product.imageCover} className='w-25' alt={item.product.title} />
                          <h4>{item.product.title.split(' ').slice(0,2).join(' ')}</h4>
                          <h5>Count : {item.count}</h5>
                          <h5>Price : {item.price}</h5>
                        </div>
                      </div>


                    })}
                  </div>
                </div>

                <div className="  rounded-4 p-3 order ">
                  {/* {order.cartItems?.map((item, index) => {
                  return <div key={index} className="bg-danger">
                    <img src={item.product.imageCover} className='w-25' alt={item.product.title} />
                    <h4>{item.product.title}</h4>
                    <h5>Count : {item.count}</h5>
                    <h5>Price : {item.price}</h5>
                  </div>


                })} */}
                  <p>Order sent to user with phone {order.shippingAddress.phone}
                    and with details  {order.shippingAddress.details}   at  {order.shippingAddress.city}
                  </p>
                  <h5>Payment methode:  {order.paymentMethodType}</h5>
                  <h5>Total price :  {order.totalOrderPrice}</h5>
                </div>
              </div>
            </div>

          })}
        </div>
      </div>
    </div>
  </>
}
