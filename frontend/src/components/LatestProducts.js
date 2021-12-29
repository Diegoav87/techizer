import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import ProductCard from './ProductCard';
import ProductGrid from './ProductGrid';
import Spinner from './Spinner';

import axiosInstance from '../helpers/axios';

const LatestProducts = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = () => {
        axiosInstance
            .get("products/")
            .then(res => {
                console.log(res.data);
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        getProducts();
    }, [])

    if (loading) {
        return <Spinner />;
    }

    return (
        <Box sx={{ backgroundColor: "gray.main" }}>
            <Container maxWidth="lg">
                <Typography sx={{ pt: 5 }} variant="h5" fontWeight={"bold"} color="textPrimary">
                    Latest Products
                </Typography>
                <Box sx={{ pt: 3, pb: 5 }}>
                    <ProductGrid products={products} breakpoints={{ xs: 12, sm: 4, md: 4 }} />
                </Box>
            </Container>
        </Box>
    )
}

export default LatestProducts;

