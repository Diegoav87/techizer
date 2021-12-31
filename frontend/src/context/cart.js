import React, { useState, createContext } from "react";

import useProvideCart from "../hooks/useProvideCart";

export const CartContext = createContext();

export const CartProvider = (props) => {
    const cart = useProvideCart();

    return (
        <CartContext.Provider value={cart}>
            {props.children}
        </CartContext.Provider>
    )
}