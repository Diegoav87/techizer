import React, { useState, useEffect } from "react";

import axiosInstance from "../helpers/axios";
import handleError from "../helpers/axiosErrorHandler";

const useProvideCategories = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axiosInstance
            .get("products/categories/")
            .then(res => {
                setCategories(res.data);
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
        getCategories
    }
}

export default useProvideCategories;