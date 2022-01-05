import React, { useState, useEffect } from "react";

import axiosInstance from "../helpers/axios";
import handleError from "../helpers/axiosErrorHandler";
import { toast } from "react-toastify";

const useProvideAuth = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const SHIPPING_COST = 9.99;

    const getCartItems = () => {
        if (localStorage.getItem("cartItems")) {
            setCartItems(JSON.parse(localStorage.getItem("cartItems")));
            console.log(JSON.parse(localStorage.getItem("cartItems")));
        }

        setLoading(false);
    };

    const addCartItem = (slug, qty) => {
        axiosInstance
            .get(`products/${slug}/`)
            .then(res => {
                console.log(res.data);

                let newCartItems = [...cartItems];
                const item = {
                    ...res.data,
                    qty: qty
                }

                const itemInCart = cartItems.find(product => product.id === item.id);

                if (itemInCart) {
                    newCartItems = newCartItems.map(product => {
                        return product.id === itemInCart.id ? item : product;
                    })
                } else {
                    newCartItems = [...newCartItems, item]
                }

                setCartItems(newCartItems);
                localStorage.setItem("cartItems", JSON.stringify([...newCartItems]))
                toast.success("Cart updated");
            })
            .catch(err => {
                handleError(err);
            })
    }

    const deleteCartItem = (id) => {
        let newCartItems = [...cartItems];

        newCartItems = newCartItems.filter(item => item.id !== id);
        setCartItems(newCartItems);
        localStorage.setItem("cartItems", JSON.stringify([...newCartItems]))
        toast.success("Item removed");
    }

    const getCartLength = () => {

        if (cartItems.length > 0) {
            const cartLength = cartItems.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.qty;
            }, 0)
            return cartLength
        }

        return 0;
    }

    const getCartSubtotal = () => {
        if (cartItems.length > 0) {
            const cartTotal = cartItems.reduce((previousValue, currentValue) => {
                return (parseFloat(previousValue) + (currentValue.regular_price * currentValue.qty)).toFixed(2);
            }, 0)
            return cartTotal;
        } else {
            return 0;
        }
    }

    const getCartTotal = () => {
        return (parseFloat(getCartSubtotal()) + SHIPPING_COST).toFixed(2);
    }

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cartItems");
    }

    useEffect(() => {
        getCartItems();
    }, []);

    return {
        cartItems,
        getCartItems,
        addCartItem,
        deleteCartItem,
        getCartLength,
        getCartTotal,
        getCartSubtotal,
        clearCart,
        SHIPPING_COST,
        loading
    }
}

export default useProvideAuth;