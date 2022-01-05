import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonIcon from '@mui/icons-material/Person';

import { Outlet, Link } from 'react-router-dom';

const Dashboard = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Navbar />
            <Box sx={{ backgroundColor: "gray.main" }} style={{ minHeight: "100vh" }}>
                <Container maxWidth="lg" sx={{ pb: 5, pt: 5 }}>

                    <Box>
                        <Paper sx={{ mb: 2 }}>
                            <Tabs
                                orientation="horizontal"
                                variant="standard"
                                value={value}
                                onChange={handleChange}
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >
                                <Tab component={Link} to="orders" icon={<ShoppingBagOutlinedIcon />} iconPosition="start" label="Orders" {...a11yProps(0)} />
                                <Tab component={Link} to="profile" icon={<PersonIcon />} label="Profile" iconPosition="start" {...a11yProps(1)} />
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
