import React from 'react';

import Grid from '@mui/material/Grid';

import ProductCard from './ProductCard';

const ProductGrid = (props) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {props.products.map(product => {
                return (
                    <ProductCard key={product.id} product={product} breakpoints={props.breakpoints} />
                )
            })}
        </Grid>
    )
}

export default ProductGrid;
