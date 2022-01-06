import React, { useState, useEffect } from 'react';
import ProductForm from '../../components/Admin/ProductForm';
import Spinner from '../../components/Spinner';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InventoryIcon from '@mui/icons-material/Inventory';
import Typography from '@mui/material/Typography';

import { useParams } from "react-router-dom";

import axiosInstance from "../../helpers/axios";
import handleError from '../../helpers/axiosErrorHandler';

const EditProduct = () => {
    const { slug } = useParams();

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    const getProduct = () => {
        axiosInstance
            .get(`products/${slug}/`)
            .then(res => {
                console.log(res.data);
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    }

    useEffect(() => {
        getProduct();
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <Paper sx={{ p: 3 }}>
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <InventoryIcon color="primary" sx={{ pr: 1 }} />
                    <Typography fontWeight="bold" color="textPrimary" variant="h5" component="h4">
                        Edit Product
                    </Typography>
                </Box>
                <ProductForm editing={true} product={product} />
            </Box>
        </Paper>
    )
}

export default EditProduct;