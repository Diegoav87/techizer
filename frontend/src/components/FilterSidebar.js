import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';

import { Link } from 'react-router-dom';

const FilterSidebar = (props) => {
    const handlePriceRangeChange = (e) => {
        const price = e.target.value;
        props.setFilters({ ...props.filters, [e.target.name]: price });
        props.setLoading(true);
    }

    return (
        <Grid item xs={12} sm={4} md={3}>
            <Paper sx={{ p: 2 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography component="h6" variant="subtitle2" color="textPrimary" fontWeight="bold">
                        Categories
                    </Typography>
                    <Box>
                        {props.categories.categories.map((category) => {
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
                        <TextField type="number" name="min_price" onChange={handlePriceRangeChange} sx={{ pr: 1 }} size="small" placeholder="0" variant="outlined" />
                        <Typography component="h6" variant="body1" color="textSecondary" fontWeight="bold">
                            -
                        </Typography>
                        <TextField onChange={handlePriceRangeChange} name="max_price" type="number" sx={{ pl: 1 }} size="small" placeholder="500" variant="outlined" />
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
    )
}

export default FilterSidebar;
