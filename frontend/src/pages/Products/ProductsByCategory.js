import React, { useState, useEffect } from 'react';

import Navbar from '../../components/Navbar';
import Spinner from '../../components/Spinner';
import ProductGrid from '../../components/Products/ProductGrid';
import FilterSidebar from '../../components/Products/FilterSidebar';
import Paginator from '../../components/Paginator';
import TopBarFilter from '../../components/Products/TopBarFilter';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import axiosInstance from '../../helpers/axios';
import handleError from '../../helpers/axiosErrorHandler';

import useCategories from '../../hooks/useCategories';
import usePagination from '../../hooks/usePagination';

const ITEMS_PER_PAGE = 9;

const ProductsByCategory = () => {
    const { slug } = useParams();
    const categories = useCategories();

    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        rating: [],
        sort: "-created_at"
    });

    const getProducts = (page = 1) => {
        axiosInstance
            .get(`products/categories/${slug}/`, {
                params: {
                    ...filters,
                    page: page
                }
            })
            .then(res => {
                console.log(res.data);
                setProducts(res.data.results);
                setCategory(res.data.category_name);
                setProductCount(res.data.count);
                setLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    }

    const { currentPage, changePage, pageCount } = usePagination(ITEMS_PER_PAGE, productCount, getProducts);
    const onPageChange = (event, value) => changePage(value);

    useEffect(() => {
        getProducts();
    }, [slug, filters])

    return (
        <div>
            <Navbar />
            <Box sx={{ backgroundColor: "gray.main" }}>
                <Container maxWidth="lg" sx={{ pt: 5 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className="link" to="/">
                            Home
                        </Link>
                        <Link className="link" to="/shop">
                            Shop
                        </Link>
                        <Typography color="text.primary">{category}</Typography>
                    </Breadcrumbs>
                </Container>
                <TopBarFilter heading={
                    (
                        <React.Fragment>
                            <Typography component="h5" variant="subtitle1" color="textPrimary" fontWeight="bold">{category}</Typography>
                            <Typography variant="subtitle2" color="textSecondary">{productCount} results found</Typography>
                        </React.Fragment>
                    )
                } filters={filters} setFilters={setFilters} />
                <Container maxWidth="lg" sx={{ pb: 5 }}>
                    <Grid container spacing={2}>
                        <FilterSidebar categories={categories} filters={filters} setFilters={setFilters} setLoading={setLoading} getProducts={getProducts} />
                        <Grid item xs={12} sm={8} md={9}>
                            {loading ? (<Spinner />) : (
                                <Box>
                                    {products.length > 0 ? (
                                        <React.Fragment>
                                            <ProductGrid products={products} breakpoints={{ xs: 12, sm: 12, md: 4 }} />
                                            <Box sx={{ mt: 4 }}>
                                                <Paginator
                                                    pageCount={pageCount}
                                                    onPageChange={onPageChange}
                                                    currentPage={currentPage}
                                                />
                                            </Box>
                                        </React.Fragment>
                                    ) : (
                                        <Paper sx={{ p: 3 }}>
                                            <Typography color="textPrimary">No results found</Typography>
                                        </Paper>
                                    )}
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}

export default ProductsByCategory;  
