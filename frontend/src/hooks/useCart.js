import { useContext } from "react";

import { CartContext } from "../context/cart";

const useCart = () => {
    return useContext(CartContext);
}

export default useCart;