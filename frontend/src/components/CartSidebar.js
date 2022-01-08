import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

import QuantitySelect from './Products/QuantitySelect';

import { Link } from 'react-router-dom';

import useCart from '../hooks/useCart';
import { toast } from "react-toastify";

const CartSidebar = (props) => {
    const cart = useCart();

    const changeItemQty = (e) => {
        const qty = e.target.value;
        const slug = e.target.name;

        cart.addCartItem(slug, qty);
    }

    const deleteItemHandler = (id) => {
        cart.deleteCartItem(id);
    }

    return (
        <Drawer anchor="right" open={props.open} onClose={props.toggleSidebar(false)}>
            <Box
                sx={{ width: 450 }}
                role="presentation"
                onKeyDown={props.toggleSidebar(false)}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <ShoppingBagIcon sx={{ pr: 1 }} />
                        <Typography color="textPrimary">{cart.getCartLength()} Items</Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={props.toggleSidebar(false)}>
                            <ClearIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                {cart.cartItems.map(item => {
                    return (
                        <React.Fragment>
                            <Box sx={{ mb: 2, mt: 2, p: 2 }}>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item md={4} sm={4} xs={4}>
                                        <img className="product-detail-img" src={`http://127.0.0.1:8000${item.get_featured_image.image}`} alt={item.get_featured_image.alt_text} />
                                    </Grid>
                                    <Grid item md={6} sm={6} xs={6}>
                                        <Typography sx={{ mb: 1 }} component="h5" variant="subtitle2" color="textPrimary">{item.title}</Typography>
                                        <Typography sx={{ mb: 1 }} component="h6" variant="subtitle2" color="primary">${item.regular_price} x {item.qty}</Typography>
                                        <QuantitySelect product={item} qty={item.qty} qtyChange={changeItemQty} />
                                    </Grid>
                                    <Grid item md={2} sm={2} xs={2}>
                                        <IconButton>
                                            <ClearIcon onClick={(e) => deleteItemHandler(item.id)} />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Divider />
                        </React.Fragment>
                    )
                })}
                <Box sx={{ p: 2, mt: 2, mb: 2 }}>
                    <Link to="/cart" className="link">
                        <Button fullWidth color="primary" variant="contained">View Cart</Button>
                    </Link>
                </Box>
            </Box>
        </Drawer>
    )
}

export default CartSidebar;
