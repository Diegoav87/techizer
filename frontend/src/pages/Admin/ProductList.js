import React, { useEffect, useState } from 'react';
import Spinner from "../../components/Spinner";
import Paginator from '../../components/Paginator';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import axiosInstance from '../../helpers/axios';
import handleError from '../../helpers/axiosErrorHandler';
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';
import usePagination from '../../hooks/usePagination';

const ITEMS_PER_PAGE = 9;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productCount, setProductCount] = useState(0);

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const [currentId, setCurrentId] = useState();

    const changeCurrentId = (id) => {
        setCurrentId(id);
        handleOpen();
    }

    const getProducts = (page = 1) => {
        axiosInstance
            .get("products/", {
                params: {
                    page: page
                }
            })
            .then(res => {
                console.log(res.data)
                setProducts(res.data.results);
                setProductCount(res.data.count);
                setLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    }

    const deleteProduct = (id) => {
        axiosInstance
            .delete(`products/delete/${id}/`)
            .then(res => {
                console.log(res.data);
                toast.success("Product deleted");
                getProducts();
            })
            .catch(err => {
                handleError(err);
            })

        handleClose();
    }

    useEffect(() => {
        getProducts();
    }, [])

    const { currentPage, changePage, pageCount } = usePagination(ITEMS_PER_PAGE, productCount, getProducts);
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
                            <TableCell>Product ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (

                            <TableRow
                                className="link"
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>${product.regular_price}</TableCell>
                                <TableCell>{product.category.name}</TableCell>
                                <TableCell>
                                    <Link className="link" to={`edit/${product.slug}`}>
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                    <IconButton color="error" onClick={(e) => changeCurrentId(product.id)} >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ mt: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Paginator
                        pageCount={pageCount}
                        onPageChange={onPageChange}
                        currentPage={currentPage}
                    />
                    <Link className="link" to="create"><Button variant="contained">Add Product</Button></Link>
                </Box>

            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Delete Product
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Deleting a product will permamently remove it from the database and all its data.
                        </Typography>
                        <Box sx={{ mt: 2, display: "flex" }}>
                            <Button onClick={(e) => deleteProduct(currentId)} fullWidth color="error" variant="contained" sx={{ mr: 2 }}>Delete Product</Button>
                            <Button onClick={handleClose} fullWidth color="secondary" variant="contained">Keep Product</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    )
}

export default ProductList;
