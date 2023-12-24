import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Bars, ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../homeSlider/HomeSlider';
import CategorySider from '../catrgorySlider/CategorySider';
import { Link } from 'react-router-dom';
import { cartContext } from '../context/cartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';


export default function Product() {

  const [sendingLoder, setsendingLoder] = useState(false)

  const { addProductToCart } = useContext(cartContext)
  const [allProducts, setallProducts] = useState(null)
  const { isError, isLoading, isFetching, data, refetch } = useQuery('allProducts', getAllProducts, {
    // refetchOnMount: false,
    // refetchInterval:2000,
    // cacheTime:3000,
    // enabled:false,
  }) // cache data
  //=====================
  function getAllProducts() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }
  // console.log(data?.data.data);
  // async function getAllProducts() {
  //   const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   console.log(data.data);
  //   setallProducts(data.data)
  // }

  // useEffect(function () {
  //   getAllProducts()
  // }, [])

  async function addProduct(id) {
    setsendingLoder(true);

    const res = await addProductToCart(id);
    // console.log(res);
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
    return <><div className="vh-100 bg-black d-flex justify-content-center align-items-center ">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div></>
  }



  return <>



    <Helmet>
      <meta charSet="utf-8" />
      <title>All Products</title>
      
    </Helmet>


    <div className="container py-5">

      <div className="row mb-5 gx-0">
        <div className="col-sm-9">
          <HomeSlider />
        </div>
        <div className="col-sm-3">
          <img style={{ height: '200px' }} src={require('../../imags/grocery-banner-2.jpeg')} className='w-100' alt="img" />
          <img style={{ height: '200px' }} src={require('../../imags/grocery-banner.png')} className='w-100' alt="img" />
        </div>
      </div>
      {/* /////////////////////////////////////////// */}
      <CategorySider />

      {/* ///////////////////////////// */}

      <div className="row gy-3">
        {data?.data.data.map(function (product, idx) {
          return <div key={idx} className="col-md-2">
            <div className="">

              <Link to={`/productDetails/${product.id}`} className="product">
                <img src={product.imageCover} alt="product" className='w-100' />
                <h6 className='main-color'>{product.category.name}</h6>
                <h5 >{product.title.split(' ').slice(0, 2).join(' ')}</h5>
                <div className=" d-flex justify-content-between align-items-center">
                  <p>{product.price} EGP</p>
                  <p className='main-color'><i className="fa-solid fa-star"></i> {product.ratingsAverage}</p>
                </div>
                {/* <p>{product.id}</p> */}
              </Link>
              <button onClick={function () {
                addProduct(product.id);
              }} className='w-100 p-1 rounded-3 border-white text-center main-bg-color'>

                + Add to Card


              </button>
            </div>


          </div>
        })}

      </div>


    </div>

    {/* {allProducts ? <div className="container py-5">

      <div className="row gy-3">


        {allProducts.map(function (product, idx) {
          return <div key={idx} className="col-md-2">

            <div className="product">
              <img src={product.imageCover} alt="product" className='w-100' />
              <h6 className='main-color'>{product.category.name}</h6>
              <h5 >{product.title.split(' ').slice(0,2).join(' ')}</h5>
              <div className=" d-flex justify-content-between align-items-center">
                <p>{product.price} EGP</p>
                <p className='main-color'><i class="fa-solid fa-star"></i> {product.ratingsAverage}</p>
              </div>


            </div>

          </div>
        })}

      </div>


    </div> : <div className="vh-100 bg-black d-flex justify-content-center align-items-center ">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>} */}














  </>
}
