import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const AddressDetails = (props) => {
    return (


        <Grid container spacing={2}>
            <Grid item md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Typography sx={{ pr: 1 }} color="textSecondary" component="span" variant="subtitle1">
                        Full Name:
                    </Typography>
                    <Typography fontWeight="bold" component="span" variant="subtitle1" color="textPrimary">{props.address.full_name}</Typography>
                </Box>
            </Grid>
            <Grid item md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Typography sx={{ pr: 1 }} color="textSecondary" component="span" variant="subtitle1">
                        Address:
                    </Typography>
                    <Typography fontWeight="bold" component="span" variant="subtitle1" color="textPrimary">{props.address.address}</Typography>
                </Box>
            </Grid>
            <Grid item md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Typography sx={{ pr: 1 }} color="textSecondary" component="span" variant="subtitle1">
                        Country:
                    </Typography>
                    <Typography fontWeight="bold" component="span" variant="subtitle1" color="textPrimary">{props.address.country}</Typography>
                </Box>
            </Grid>
            <Grid item md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Typography sx={{ pr: 1 }} color="textSecondary" component="span" variant="subtitle1">
                        City:
                    </Typography>
                    <Typography fontWeight="bold" component="span" variant="subtitle1" color="textPrimary">{props.address.city}</Typography>
                </Box>
            </Grid>
            <Grid item md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Typography sx={{ pr: 1 }} color="textSecondary" component="span" variant="subtitle1">
                        Postal Code:
                    </Typography>
                    <Typography fontWeight="bold" component="span" variant="subtitle1" color="textPrimary">{props.address.postal_code}</Typography>
                </Box>
            </Grid>
        </Grid>

    )
}

export default AddressDetails;
