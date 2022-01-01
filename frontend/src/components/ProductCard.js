import React from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';

import { Link } from "react-router-dom";

import useCart from '../hooks/useCart';

const ProductCard = (props) => {
    const cart = useCart();
    const { product, breakpoints } = props;

    const addToCartHandler = (slug) => {
        cart.addCartItem(slug, 1);
    }

    return (
        <Grid item xs={breakpoints.xs} sm={breakpoints.sm} md={breakpoints.md}>
            <Card style={{ minHeight: "100%" }}>
                <Link to={`/products/${product.slug}`}>
                    <CardMedia
                        component="img"
                        alt={product.get_featured_image.alt_text}
                        height="140"
                        image={`http://127.0.0.1:8000${product.get_featured_image.image}`}
                    />
                </Link>
                <CardContent style={{ minHeight: "100%" }}>
                    <Link to={`/products/${product.slug}`} className="link">
                        <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} fontWeight="bold" gutterBottom variant="subtitle1" component="h5">
                            {product.title}
                        </Typography>
                    </Link>
                    <Rating name="read-only" value={product.average_rating} readOnly />
                </CardContent>
                <CardActions sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary" variant="body1">${product.regular_price}</Typography>
                    <Button variant="outlined" size="small" onClick={(e) => addToCartHandler(product.slug)}>Add to cart</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductCard
