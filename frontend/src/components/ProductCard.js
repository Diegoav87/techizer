import React from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';

import reptileImg from '../assets/img/contemplative-reptile.jpg';

const ProductCard = (props) => {
    return (
        <Grid item xs={12} sm={4} md={4}>
            <Card>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={reptileImg}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Rating name="read-only" value={4} readOnly />
                </CardContent>
                <CardActions sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary" variant="body1">$108.99</Typography>
                    <Button variant="outlined" color="secondary" size="small">Add to cart</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductCard
