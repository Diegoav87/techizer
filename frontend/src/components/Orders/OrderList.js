import React, { useEffect, useState } from 'react';
import Spinner from "../Spinner";
import Paginator from '../Paginator';

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
import usePagination from '../../hooks/usePagination';

import moment from "moment";

const ITEMS_PER_PAGE = 9;

const OrderList = (props) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderCount, setOrderCount] = useState(0);

    const getOrders = (page = 1) => {
        axiosInstance
            .get(props.url, {
                params: {
                    page: page
                }
            })
            .then(res => {
                console.log(res.data)
                setOrders(res.data.results);
                setOrderCount(res.data.count);
                setLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    }

    useEffect(() => {
        getOrders();
    }, [])

    const { currentPage, changePage, pageCount } = usePagination(ITEMS_PER_PAGE, orderCount, getOrders);
    const onPageChange = (event, value) => changePage(value);

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
            <Box sx={{ mt: 4 }}>
                <Paginator
                    pageCount={pageCount}
                    onPageChange={onPageChange}
                    currentPage={currentPage}
                />
            </Box>
        </Box>
    )
}

export default OrderList;