import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { Outlet, Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
    let location = useLocation();

    return (
        <div>
            <Navbar />
            <Box sx={{ backgroundColor: "gray.main" }} style={{ minHeight: "100vh" }}>
                <Container maxWidth="lg" sx={{ pb: 5, pt: 5 }}>
                    <Box maxWidth="lg" sx={{ mb: 2 }}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link className="link" to="/">
                                Home
                            </Link>
                            <Typography color="text.primary">Dashboard</Typography>
                        </Breadcrumbs>
                    </Box>
                    <Box>
                        <Paper sx={{ mb: 2 }}>
                            <Tabs
                                orientation="horizontal"
                                variant="standard"
                                value={location.pathname}
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >
                                <Tab component={Link} to="orders" value="/dashboard/orders" icon={<ShoppingBagOutlinedIcon />} iconPosition="start" label="Orders" {...a11yProps(0)} />
                                <Tab component={Link} to="profile" value="/dashboard/profile" icon={<PersonIcon />} label="Profile" iconPosition="start" {...a11yProps(1)} />
                            </Tabs>
                        </Paper>
                        <Outlet />
                    </Box>

                </Container>
            </Box>
        </div>
    )
}


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default Dashboard;
