import React from 'react';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const QuantitySelect = (props) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography sx={{ pr: 1 }}>Qty: </Typography>
            <Select size='small' name={props.product.slug}
                onChange={props.qtyChange} value={props.qty}>
                {[...Array(props.product.stock_count).keys()].map(number => {
                    return (
                        <MenuItem value={number + 1}
                            key={number + 1}>{number + 1}</MenuItem>
                    )
                })}
            </Select>
        </Box>
    )
}

export default QuantitySelect;