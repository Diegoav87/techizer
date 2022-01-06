import React from 'react';
import ProductForm from '../../components/Admin/ProductForm';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InventoryIcon from '@mui/icons-material/Inventory';
import Typography from '@mui/material/Typography';

const AddProduct = () => {
    return (
        <Paper sx={{ p: 3 }}>
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <InventoryIcon color="primary" sx={{ pr: 1 }} />
                    <Typography fontWeight="bold" color="textPrimary" variant="h5" component="h4">
                        Create Product
                    </Typography>
                </Box>
                <ProductForm editing={false} />
            </Box>
        </Paper>
    )
}

export default AddProduct;
