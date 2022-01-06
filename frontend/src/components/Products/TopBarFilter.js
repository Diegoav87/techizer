import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const TopBarFilter = (props) => {
    const [sort, setSort] = useState(10);

    return (
        <Container maxWidth="lg" sx={{ pt: 5, pb: 5 }}>
            <Paper sx={{ p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                        {props.heading}
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
    )
}

export default TopBarFilter;
