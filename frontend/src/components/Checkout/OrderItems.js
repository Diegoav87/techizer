import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const OrderItems = (props) => {
    return (
        <Box>
            {props.items.map(item => {
                return (
                    <React.Fragment>
                        <Divider />
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2, mb: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <img height={75} width={75} src={`http://127.0.0.1:8000${item.get_featured_image.image}`} alt={item.get_featured_image.alt_text} />
                                <Box sx={{ pl: 2 }}>
                                    <Typography sx={{ mb: 1 }} component="h6" variant="subtitle1" color="textPrimary">{item.title}</Typography>

                                </Box>
                            </Box>
                            <Box>
                                <Typography component="h6" variant="subtitle2" fontWeight="bold" color="textPrimary">${item.regular_price} x {item.qty}</Typography>
                            </Box>
                        </Box>
                    </React.Fragment>
                )

            })}
        </Box>
    )
}

export default OrderItems;
