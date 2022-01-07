import React, { useState, useEffect } from "react";

import axiosInstance from "../helpers/axios";
import handleError from "../helpers/axiosErrorHandler";

const useProvideCategories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(true);

    const getCategories = () => {
        axiosInstance
            .get("products/categories/")
            .then(res => {
                setCategories(res.data);
                setCategoryLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    };

    useEffect(() => {
        getCategories();
    }, []);

    return {
        categories,
        getCategories,
        categoryLoading
    }
}

export default useProvideCategories;