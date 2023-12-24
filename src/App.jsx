import React, { Component, Profiler } from 'react'

import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'

import About from './combonents/Login/Login';

import Navbar from './combonents/navbar/Navbar';
import Layout from './combonents/layout/Layout';

import Register from './combonents/Register/Register';
import Login from './combonents/Login/Login';
import Info from './combonents/info/Info';
import AuthenticationContextProvider, { authContext } from './combonents/context/AuthenticationContext';
import Product from './combonents/products/Product';
import Test from './combonents/Test/Test';
import ProtectedRoute from './combonents/Test/Test';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './combonents/productDetails/ProductDetails';
import { CartContextProvider } from './combonents/context/cartContext';
import { Toaster } from 'react-hot-toast';
import Cart from './combonents/cart/cart';
import Payment from './combonents/payment/Pay';
import AllOrders from './combonents/allOrders/AllOrders';
import { Offline } from 'react-detect-offline';



{/* <Cart /> */}
let queryClient = new QueryClient({

})
// QueryClientProvider


// createHashRouter
// createBrowserRouter

const router = createHashRouter([
  {
    path: '', element: <Layout />, children: [

      {
        path: 'payment', element: <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      },
      {
        path: 'login', element: <Login />
      },

      { path: 'register', element: <Register /> },

      {
        path: 'profile', element: <ProtectedRoute>
          <Info />
        </ProtectedRoute>
      },
      {
        path: 'products', element: <ProtectedRoute>
          <Product />
        </ProtectedRoute>
      },
      {
        path: '', element: <ProtectedRoute>
          <Product />
        </ProtectedRoute>
      },

      {
        path: 'cart', element: <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      },
      {
        path: 'productDetails/:id', element: <ProtectedRoute>
          <ProductDetails />

        </ProtectedRoute>
      },
      {
        path: 'allorders', element: <ProtectedRoute>
          <AllOrders />

        </ProtectedRoute>
      },


      {
        path: '*', element: <div className='vh-100 bg-danger text-center'>
          <h1 className='text-center'>not found</h1>
        </div>
      }
    ]
  },



]);

export default class App extends Component {
  render() {
    return <>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <AuthenticationContextProvider>
            <RouterProvider router={router} />
          </AuthenticationContextProvider>
        </CartContextProvider>
        <Toaster />
      </QueryClientProvider>

      <Offline>
        <div className="position-fixed bottom-0 start-0 bg-dark text-white p-3 rounded-3">
          <p>Oops.. you are offline now.</p>
        </div>
      </Offline>
    </>

  }
}
