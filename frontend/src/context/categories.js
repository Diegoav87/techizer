import React, { createContext } from "react";

import useProvideCategories from "../hooks/useProvideCategories";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
    const categories = useProvideCategories();

    return (
        <CategoryContext.Provider value={categories}>
            {props.children}
        </CategoryContext.Provider>
    )
}