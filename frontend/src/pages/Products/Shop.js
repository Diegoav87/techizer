import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import FilterSidebar from '../../components/Products/FilterSidebar';
import ProductGrid from '../../components/Products/ProductGrid';
import Spinner from '../../components/Spinner';
import Paginator from '../../components/Paginator';
import TopBarFilter from '../../components/Products/TopBarFilter';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import useCategories from '../../hooks/useCategories';
import axiosInstance from '../../helpers/axios';
import handleError from '../../helpers/axiosErrorHandler';

import { Link } from 'react-router-dom';

import usePagination from '../../hooks/usePagination';
import { useSearchParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 9;

const Shop = () => {
    const categories = useCategories();
    const [searchParams] = useSearchParams();
    let keyword = searchParams.get("keyword");

    if (keyword === null) {
        keyword = '';
    }

    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        rating: [],
        sort: "-created_at"
    });

    const getProducts = (page = 1) => {
        console.log(filters);
        axiosInstance
            .get("products/", {
                params: {
                    ...filters,
                    page: page,
                    keyword: keyword
                }
            })
            .then(res => {
                console.log(res.data);
                setProducts(res.data.results);
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
    }, [filters, keyword])

    return (
        <div>
            <Navbar />

            <Box sx={{ backgroundColor: "gray.main" }}>
                <Container maxWidth="lg" sx={{ pt: 5 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className="link" to="/">
                            Home
                        </Link>
                        <Typography color="text.primary">Shop</Typography>
                    </Breadcrumbs>
                </Container>
                <TopBarFilter heading={
                    (
                        <React.Fragment>
                            <Typography component="h5" variant="subtitle1" color="textPrimary" fontWeight="bold">{keyword === "" ? "All Products" : `Showing results for "${keyword}"`}</Typography>
                            <Typography variant="subtitle2" color="textSecondary">{products.length} results found</Typography>
                        </React.Fragment>
                    )
                } filters={filters} setFilters={setFilters} />
                <Container maxWidth="lg" sx={{ pb: 5 }}>
                    <Grid container spacing={2}>
                        <FilterSidebar categories={categories} filters={filters} setFilters={setFilters} setLoading={setLoading} getProducts={getProducts} />
                        <Grid item xs={12} sm={8} md={9}>
                            {loading ? (<Spinner />) : (
                                <Box>
                                    <ProductGrid products={products} breakpoints={{ xs: 12, sm: 12, md: 4 }} />
                                    <Box sx={{ mt: 4 }}>
                                        <Paginator
                                            pageCount={pageCount}
                                            onPageChange={onPageChange}
                                            currentPage={currentPage}
                                        />
                                    </Box>
                                </Box>
                            )}

                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}

export default Shop;
