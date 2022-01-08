import React from 'react';
import Navbar from '../components/Navbar';
import QuantitySelect from '../components/Products/QuantitySelect';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import useCart from '../hooks/useCart';

import { Link } from 'react-router-dom';

const Cart = () => {
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
        <div>
            <Navbar />
            <Box sx={{ backgroundColor: "gray.main" }} style={{ minHeight: "100vh" }}>

                <Container sx={{ pt: 5, pb: 20 }} maxWidth="lg">
                    <Box maxWidth="lg" sx={{ mb: 2 }}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link className="link" to="/">
                                Home
                            </Link>
                            <Typography color="text.primary">Cart</Typography>
                        </Breadcrumbs>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <ShoppingBagIcon color="secondary" sx={{ pr: 1 }} />
                        <Typography component="h5" variant="h6" color="textPrimary" fontWeight="bold">{cart.getCartLength()} Items</Typography>
                    </Box>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item md={8} sm={12} xs={12}>
                                {cart.cartItems.length > 0 ? cart.cartItems.map(item => {
                                    return (
                                        <Box sx={{ mb: 2 }}>
                                            <Paper elevation={3} sx={{ p: 2 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <img height={150} width={150} src={`http://127.0.0.1:8000${item.get_featured_image.image}`} alt={item.get_featured_image.alt_text} />
                                                        <Box sx={{ pl: 2 }}>
                                                            <Typography sx={{ mb: 1 }} component="h4" variant="subtitle1" color="textPrimary">{item.title}</Typography>
                                                            <Typography sx={{ mb: 1 }} component="h6" variant="subtitle2" color="primary">${item.regular_price} x {item.qty}</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box>
                                                        <IconButton sx={{ mb: 2 }}>
                                                            <ClearIcon onClick={(e) => deleteItemHandler(item.id)} />
                                                        </IconButton>
                                                        <QuantitySelect product={item} qty={item.qty} qtyChange={changeItemQty} />
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        </Box>
                                    )
                                }) : (
                                    <Paper elevation={3} sx={{ p: 2 }}>
                                        <Typography variant="body1" color="textPrimary">
                                            You don't have items in your cart. Enter the shop to add some.
                                        </Typography>
                                        <Box sx={{ mt: 2 }}>
                                            <Link to="/shop" className="link">
                                                <Button color="primary" variant="contained">Go to Shop</Button>
                                            </Link>
                                        </Box>
                                    </Paper>
                                )}
                            </Grid>
                            <Grid item md={4} sm={12} xs={12}>
                                <Box>
                                    <Paper elevation={3} sx={{ p: 2 }}>
                                        <Box sx={{ mb: 2 }}>
                                            <Typography fontWeight="bold" color="textPrimary" component="h4" variant="h6">
                                                Cart Details
                                            </Typography>
                                        </Box>
                                        <Divider />
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                                            <Typography color="textSecondary" component="span" variant="subtitle1">
                                                Total:
                                            </Typography>
                                            <Typography component="h6" variant="h6" color="primary">${cart.getCartSubtotal()}</Typography>
                                        </Box>
                                        <Box sx={{ mt: 2 }}>
                                            {cart.cartItems.length === 0 ? (

                                                <Button fullWidth disabled color="primary" variant="contained">Checkout</Button>

                                            ) : (
                                                <Link to="/checkout" className="link">
                                                    <Button fullWidth color="primary" variant="contained">Checkout</Button>
                                                </Link>
                                            )}

                                        </Box>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box >
        </div >
    )
}

export default Cart;
