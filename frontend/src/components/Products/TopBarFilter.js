import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const TopBarFilter = (props) => {

    const handleSelectChange = (e) => {
        props.setFilters({ ...props.filters, sort: e.target.value })
    }

    return (
        <Container maxWidth="lg" sx={{ pt: 2, pb: 3 }}>
            <Paper sx={{ p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                        {props.heading}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ pr: 1 }} color="textSecondary">Sort By: </Typography>
                        <Select size='small' value={props.filters.sort} onChange={handleSelectChange}>
                            <MenuItem value={"-created_at"}>Date Created</MenuItem>
                            <MenuItem value={"-regular_price"}>Price High to Low</MenuItem>
                            <MenuItem value={"regular_price"}>Price Low to High</MenuItem>
                            <MenuItem value={"-average_rating"}>Rating</MenuItem>
                        </Select>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}

export default TopBarFilter;
