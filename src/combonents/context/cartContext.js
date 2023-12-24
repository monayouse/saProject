import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const cartContext = createContext();

export function CartContextProvider({ children }) {



    const [cartProducts, setcartProducts] = useState(null)
    const [totalcartprice, settotalcartprice] = useState(0)
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [cartid, setcartId] = useState(null)

    //===========

    async function addProductToCart(productId) {

        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                "productId": productId
            },
                {
                    headers: { token: localStorage.getItem('tkn') }
                })
            // console.log(data);

            // setcartProducts(data.data.products)
            // settotalcartprice(data.data.totalCartPrice)
            // setnumOfCartItems(data.numOfCartItems)
            getUserCart();

            return data;

        }
        catch (error) {
            console.log('rerrorrrrrrrrr');
        }
    }


    async function getUserCart() {
        // console.log(cartId);

        try {

            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
                {
                    headers: { token: localStorage.getItem('tkn') }
                })

            // console.log(data);

            setcartProducts(data.data.products)
            setnumOfCartItems(data.numOfCartItems)
            settotalcartprice(data.data.totalCartPrice)
            // setcartId(data.data._id)
            setcartId(data.data._id)
            console.log(data.data._id);

        }
        catch (error) {

            console.log('errror user cart');


        }

    }

    async function deleteProduct(id) {

        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {
                    headers: { token: localStorage.getItem('tkn') }
                })
            setcartProducts(data.data.products)
            setnumOfCartItems(data.numOfCartItems)
            settotalcartprice(data.data.totalCartPrice)
            return data;
        }
        catch (error) {
            console.log('rerrorrrrrrrrr');
        }

    }


    async function removeCartData() {

        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers: { token: localStorage.getItem('tkn') }
                })
            setcartProducts([])
            setnumOfCartItems(0)
            settotalcartprice(0)
            return data;
        }
        catch (error) {
            console.log('rerrorrrrrrrrr');
        }

    }



    async function updateCount(id, count) {

        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                "count": count
            },
                {
                    headers: { token: localStorage.getItem('tkn') }
                })
            setcartProducts(data.data.products)
            setnumOfCartItems(data.numOfCartItems)
            settotalcartprice(data.data.totalCartPrice)
            return data;
        }
        catch (error) {
            console.log('rerrorrrrrrrrr in update');
        }

    }

    useEffect(function () {
        if (cartProducts !== null) {
            getUserCart()

        }

    }, [])







    return <cartContext.Provider value={{
        addProductToCart,
        getUserCart,
        cartProducts
        , totalcartprice,
        numOfCartItems,
        deleteProduct,
        updateCount,
        removeCartData,
        cartid,
        setcartProducts,
        settotalcartprice,
        setnumOfCartItems
    }}>


        {children}

    </cartContext.Provider>
}