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

const ProductCard = (props) => {
    const { product } = props;

    return (
        <Grid item xs={12} sm={4} md={4}>
            <Card>
                <Link to={`/products/${product.slug}`}>
                    <CardMedia
                        component="img"
                        alt={product.get_featured_image.alt_text}
                        height="140"
                        image={`http://127.0.0.1:8000${product.get_featured_image.image}`}
                    />
                </Link>
                <CardContent>
                    <Link to={`/products/${product.slug}`} className="link">
                        <Typography gutterBottom variant="h5" component="div">
                            {product.title}
                        </Typography>
                    </Link>
                    <Rating name="read-only" value={4} readOnly />
                </CardContent>
                <CardActions sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary" variant="body1">${product.regular_price}</Typography>
                    <Button variant="outlined" size="small">Add to cart</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductCard
