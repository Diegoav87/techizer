import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Carousel from "react-material-ui-carousel";

import Spinner from '../components/Spinner';
import Navbar from "../components/Navbar";
import QuantitySelect from '../components/QuantitySelect';
import ReviewForm from '../components/Reviews/ReviewForm';
import ReviewList from '../components/Reviews/ReviewList';

import { useParams } from "react-router-dom";
import axiosInstance from '../helpers/axios';
import handleError from '../helpers/axiosErrorHandler';
import useCart from '../hooks/useCart';

import { toast } from "react-toastify";

const ProductDetail = () => {
    const cart = useCart();
    const { slug } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

    const addToCartHandler = () => {
        if (qty > product.stock_available) {
            toast.error("This quantity amount is greater than the stock");
            return;
        }

        cart.addCartItem(product.slug, qty);
    }

    const changeQty = (e) => {
        setQty(e.target.value);
    }

    return (
        <div>
            <Navbar />
            <Box sx={{ backgroundColor: "gray.main" }}>
                <Container sx={{ pt: 10, pb: 20 }} maxWidth="lg">
                    <Box>
                        <Grid container spacing={20}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Carousel>
                                    {product.product_images.map((image, index) => {
                                        return (
                                            <Box key={index}>
                                                <Paper>
                                                    <img className="product-detail-img" alt={image.alt_text} src={`http://127.0.0.1:8000${image.image}`} />
                                                </Paper>
                                            </Box>
                                        )
                                    })}
                                </Carousel>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Box>
                                    <Typography sx={{ mb: 2 }} variant="h4" fontWeight={"bold"} color="textPrimary">
                                        {product.title}
                                    </Typography>
                                    <Box sx={{ display: "flex" }}>
                                        <Typography>Rating</Typography>
                                        <Rating sx={{ mb: 2, ml: 1 }} name="read-only" value={4} readOnly />
                                    </Box>

                                    <Typography component="h1" variant="h5" fontWeight="bold" sx={{ mb: 2 }} color="primary.main">${product.regular_price}</Typography>
                                    <Typography sx={{ mb: 2 }}>
                                        {product.stock_count > 0 ? "In Stock" : "Out of Stock"}
                                    </Typography>
                                    {product.stock_count > 0 && (
                                        <QuantitySelect product={product} qty={qty} qtyChange={changeQty} />
                                    )}


                                    <Button onClick={addToCartHandler} sx={{ mb: 2, display: "block" }} variant="contained">Add to Cart</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ mt: 5 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Description" {...a11yProps(0)} />
                                <Tab label="Reviews" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Typography variant="body1">
                                {product.description}
                            </Typography>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <ReviewList reviews={product.reviews} />
                            <ReviewForm product={product} getProduct={getProduct} />
                        </TabPanel>
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default ProductDetail
