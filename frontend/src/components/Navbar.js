import React, { useState, useEffect } from 'react';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputAdornment from '@mui/material/InputAdornment';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Link } from "react-router-dom"
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import useCategories from '../hooks/useCategories';
import Badge from '@mui/material/Badge';

import CartSidebar from './CartSidebar';

import { useNavigate } from 'react-router-dom';
import { createSearchParams } from 'react-router-dom';

const settings = [{ text: "Dashboard", link: "/dashboard/orders" }, { text: "Logout", link: "/logout" }]

const adminSettings = [{ text: "Admin", link: "/admin/users" }, { text: "Dashboard", link: "/dashboard/orders" }, { text: "Logout", link: "/logout" }]

const pages = [{ text: "Home", link: "/" }, { text: "Shop", link: "/shop" }, { text: "Login", link: "/login" }, { text: "Register", link: "/register" }]

const authPages = [{ text: "Home", link: "/" }, { text: "Shop", link: "/shop" }]



const Search = styled('div')(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '31ch',

        },
    },
}));

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <ExpandMoreIcon {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Navbar = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const cart = useCart();
    const categories = useCategories();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }

        setSidebarOpen(open);
    }

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleExpandClick = (event) => {
        setExpandedCategories(!expandedCategories);
        setAnchorEl(event.currentTarget);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setExpandedCategories(!expandedCategories);
    };

    const [keyword, setKeyword] = useState("");

    const onKeywordChange = (e) => {
        setKeyword(e.target.value);
    }

    const onSearch = (e) => {
        e.preventDefault();


        navigate({
            pathname: "/shop",
            search: `?${createSearchParams({ keyword: keyword })}`
        })

    }

    return (
        <AppBar position="static" sx={{ backgroundColor: "secondary.main" }}>
            <Container maxWidth="lg">
                <Toolbar style={{ padding: "0px" }}>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <Link to="/" className="link">
                            TECHIZER
                        </Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {auth.user ? authPages.map((page) => (
                                <Link to={page.link} className="link" key={page.text}>
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.text}</Typography>
                                    </MenuItem>
                                </Link>
                            )) : pages.map((page) => (
                                <Link to={page.link} className="link" key={page.text}>
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.text}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
                        {auth.user ? authPages.map((page) => (
                            <Link to={page.link} className="link" key={page.text}>
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, display: 'block' }}
                                >
                                    <Typography sx={{ color: "white.main", textTransform: "none" }} textAlign="center">{page.text}</Typography>
                                </Button>
                            </Link>
                        )) : pages.map((page) => (
                            <Link to={page.link} className="link" key={page.text}>
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, display: 'block' }}
                                >
                                    <Typography sx={{ color: "white.main", textTransform: "none" }} textAlign="center">{page.text}</Typography>
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {auth.user && (
                        <Box sx={{ mr: 2 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
                                    <AccountCircleIcon />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {auth.user.is_staff ? adminSettings.map((setting, index) => (
                                    <Link to={setting.link} className="link" key={setting.text}>
                                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{setting.text}</Typography>
                                        </MenuItem>
                                    </Link>
                                )) : settings.map((setting, index) => (
                                    <Link to={setting.link} className="link" key={setting.text}>
                                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{setting.text}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>
                    )}

                    <Box>
                        <Tooltip title="Open Cart">
                            <IconButton onClick={toggleSidebar(true)} sx={{ p: 0 }} color="inherit">
                                <Badge badgeContent={cart.getCartLength()} color="primary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </Box>

                </Toolbar>
                <Toolbar style={{ padding: "0px" }}>
                    <Box sx={{ mr: 2, flexGrow: 1 }}>
                        <Button onClick={handleExpandClick} variant="contained" endIcon={
                            <ExpandMore
                                expand={expandedCategories}
                                aria-expanded={expandedCategories}
                                aria-label="show more"
                                color="inherit"
                            />
                        }>
                            Categories</Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {categories.categories.map(category => {
                                return (
                                    <Link to={`/products/categories/${category.slug}`} className="link" key={category.name}>
                                        <MenuItem onClick={handleClose}>{category.name}</MenuItem>
                                    </Link>
                                )
                            })}
                        </Menu>
                    </Box>

                    <Box>
                        <form onSubmit={onSearch}>
                            <Search>
                                <StyledInputBase
                                    onChange={onKeywordChange}
                                    sx={{ pl: 2, pr: 2 }}
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton type='submit' sx={{ color: "white.main" }} edge="end">
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Search>
                        </form>
                    </Box>

                </Toolbar>
            </Container>
            <CartSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        </AppBar>
    );
}

export default Navbar;
