import React, { useEffect, useState } from 'react';
import Spinner from "../../components/Spinner";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import axiosInstance from '../../helpers/axios';
import handleError from '../../helpers/axiosErrorHandler';

import { Link } from 'react-router-dom';

import moment from "moment";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const getOrders = () => {
        axiosInstance
            .get("orders/user/")
            .then(res => {
                console.log(res.data)
                setOrders(res.data);
                setLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    }

    useEffect(() => {
        getOrders();
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Date Ordered</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Delivered</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (

                            <TableRow
                                className="link"
                                key={order.id}
                                component={Link}
                                to={`${order.id}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.id}
                                </TableCell>
                                <TableCell>{moment(order.created_at).format("DD/MM/YYYY")}</TableCell>
                                <TableCell>{order.is_paid ? (<CheckIcon color="success" />) : (<CloseIcon color="error" />)}</TableCell>
                                <TableCell>{order.is_delivered ? (<CheckIcon color="success" />) : (<CloseIcon color="error" />)}</TableCell>
                                <TableCell>${order.total_paid}</TableCell>
                                <TableCell><ArrowRightAltIcon /></TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default OrderList;
