import React, { useContext } from 'react'
import { cartContext } from '../context/cartContext';
import { ColorRing, Puff } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {


    const { removeCartData, updateCount, cartProducts, totalcartprice, numOfCartItems, deleteProduct } = useContext(cartContext);



    async function deleteElement(id) {
        const res = await deleteProduct(id);
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
    }

    async function deleteCart() {
        await removeCartData();

    }

    async function updateElemenCount(id, count) {
        const res = await updateCount(id, count);
        if (res.status === "success") {
            console.log('updated success');
            toast.success(res.message, {
                duration: 2000,
            })
        }
        else {
            toast.error('error', {
                duration: 2000,
            })
        }

    }





    if (cartProducts === null) {
        return <div className="vh-100 bg-black d-flex justify-content-center align-items-center ">
            <Puff
                height="80"
                width="80"
                radius={1}
                color="#4fa94d"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }
    if (cartProducts.length === 0) {
        return <h1 className=' text-center'>No data</h1>
    }


    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Cart</title>

        </Helmet>


        <div className='container  py-5 cart'  >
            <h2>Shop Cart</h2>
            <h5>Total price : {totalcartprice} </h5>
            <h5>Total Items : {numOfCartItems} </h5>
            <div className="d-flex justify-content-between align-items-center">
                <button onClick={function () {
                    deleteCart()
                }} className='btn  btn-outline-danger'>delete Cart
                </button>
                <Link to='/payment' onClick={function () {

                }} className='btn  btn-outline-primary mt-3'> confirm Payment
                </Link>
            </div>


            {cartProducts.map(function (product, idx) {
                // console.log(product);

                return <div key={idx} className="row align-items-center  my-2 border-bottom border-3 p-2">
                    <div className="col-sm-1">
                        <div className="">
                            <img src={product.product.imageCover} className='w-100' alt="" />
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="">
                            <h6>Title : {product.product.title}</h6>
                            <h5>price : {product.price}</h5>
                            <button onClick={function () {
                                deleteElement(product.product.id)
                            }} className='btn  btn-outline-danger'>Remove</button>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className=" d-flex  align-items-center">
                            <button onClick={function () {
                                updateElemenCount(product.product.id, product.count + 1)
                            }} className='btn  btn-outline-success'>+</button>
                            <span className='mx-2'>{product.count}</span>
                            <button onClick={function () {
                                updateElemenCount(product.product.id, product.count - 1)
                            }} className='btn  btn-outline-success'>-</button>
                        </div>
                    </div>
                </div>
            })}

        </div>
    </>
}
