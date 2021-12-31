import React, { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import ProductGrid from '../components/ProductGrid';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axiosInstance from '../helpers/axios';
import handleError from '../helpers/axiosErrorHandler';

import useCategories from '../hooks/useCategories';

const ProductsByCategory = () => {
    const { slug } = useParams();
    const categories = useCategories();
    const [sort, setSort] = useState(10);

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const getProducts = () => {
        axiosInstance
            .get(`products/categories/${slug}/`)
            .then(res => {
                console.log(res.data);
                setProducts(res.data.results);
                setCategory(res.data.category_name);
                setLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    }

    useEffect(() => {
        setLoading(true);
        getProducts();
    }, [slug])

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <Navbar />
            <Box sx={{ backgroundColor: "gray.main" }}>
                <Container maxWidth="lg" sx={{ pt: 5, pb: 5 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography component="h5" variant="subtitle1" color="textPrimary" fontWeight="bold">{category}</Typography>
                                <Typography variant="subtitle2" color="textSecondary">{products.length} results found</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ pr: 1 }} color="textSecondary">Sort By: </Typography>
                                <Select size='small' value={sort}>
                                    <MenuItem value={10}>Date Created</MenuItem>
                                    <MenuItem value={20}>Price High to Low</MenuItem>
                                    <MenuItem value={30}>Price Low to High</MenuItem>
                                    <MenuItem value={40}>Rating</MenuItem>
                                </Select>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
                <Container maxWidth="lg" sx={{ pb: 5 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} md={3}>
                            <Paper sx={{ p: 2 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography component="h6" variant="subtitle2" color="textPrimary" fontWeight="bold">
                                        Categories
                                    </Typography>
                                    <Box>
                                        {categories.categories.map((category) => {
                                            return (
                                                <Link key={category.slug} className="link" to={`/products/categories/${category.slug}`}>
                                                    <Typography sx={{ pt: 1, pb: 2 }} variant="subtitle2" color="textSecondary">{category.name}</Typography>
                                                </Link>
                                            )
                                        })}
                                    </Box>
                                </Box>
                                <Divider variant="middle"></Divider>
                                <Box sx={{ mb: 2, mt: 2 }}>
                                    <Typography component="h6" variant="subtitle2" color="textPrimary" fontWeight="bold">
                                        Price Range
                                    </Typography>
                                    <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", pt: 1, pb: 1 }}>
                                        <TextField sx={{ pr: 1 }} size="small" placeholder="0" variant="outlined" />
                                        <Typography component="h6" variant="body1" color="textSecondary" fontWeight="bold">
                                            -
                                        </Typography>
                                        <TextField sx={{ pl: 1 }} size="small" placeholder="500" variant="outlined" />
                                    </Box>
                                </Box>
                                <Divider variant="middle"></Divider>
                                <Box sx={{ mb: 2, mt: 2 }}>
                                    <Typography component="h6" variant="subtitle2" color="textPrimary" fontWeight="bold">
                                        Rating
                                    </Typography>
                                    <Box sx={{ pt: 1, pb: 1 }}>
                                        {[1, 2, 3, 4, 5].map(number => {
                                            return (
                                                <Box sx={{ pt: 1, pb: 1, display: "flex", alignItems: "center" }}>
                                                    <Checkbox />
                                                    <Rating readOnly value={number} />
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                </Box>

                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>

                            <ProductGrid products={products} breakpoints={{ xs: 12, sm: 12, md: 6 }} />

                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}

export default ProductsByCategory;  
