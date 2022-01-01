import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProfileForm from '../components/Dashboard/ProfileForm';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonIcon from '@mui/icons-material/Person';

const Dashboard = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Navbar />
            <Box sx={{ backgroundColor: "gray.main" }}>
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
                                <Tab icon={<ShoppingBagOutlinedIcon />} iconPosition="start" label="Orders" {...a11yProps(0)} />
                                <Tab icon={<PersonIcon />} label="Profile" iconPosition="start" {...a11yProps(1)} />
                            </Tabs>
                        </Paper>
                        <TabPanel value={value} index={0}>
                            Orders
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <ProfileForm />
                        </TabPanel>
                    </Box>

                </Container>
            </Box>
        </div>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default Dashboard;
