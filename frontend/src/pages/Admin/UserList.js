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
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
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

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userCount, setUserCount] = useState(0);

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const [currentId, setCurrentId] = useState();

    const changeCurrentId = (id) => {
        setCurrentId(id);
        handleOpen();
    }

    const getUsers = (page = 1) => {
        axiosInstance
            .get("accounts/users/", {
                params: {
                    page: page
                }
            })
            .then(res => {
                console.log(res.data)
                setUsers(res.data.results);
                setUserCount(res.data.count);
                setLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    }

    useEffect(() => {
        getUsers();
    }, [])

    const { currentPage, changePage, pageCount } = usePagination(ITEMS_PER_PAGE, userCount, getUsers);
    const onPageChange = (event, value) => changePage(value);

    const deleteUser = (id) => {
        axiosInstance
            .delete(`accounts/users/delete/${id}/`)
            .then(res => {
                console.log(res.data);
                toast.success("User deleted");
                getUsers();
            })
            .catch(err => {
                handleError(err);
            })

        handleClose();
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (

                            <TableRow
                                className="link"
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.is_staff ? (<CheckIcon color="success" />) : (<CloseIcon color="error" />)}</TableCell>
                                <TableCell>
                                    <Link className="link" to={`edit/${user.id}`}>
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                    <IconButton color="error" onClick={(e) => changeCurrentId(user.id)} >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
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
                            Delete User
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Deleting a user will permamently remove it from the database and all its data.
                        </Typography>
                        <Box sx={{ mt: 2, display: "flex" }}>
                            <Button onClick={(e) => deleteUser(currentId)} fullWidth color="error" variant="contained" sx={{ mr: 2 }}>Delete User</Button>
                            <Button onClick={handleClose} fullWidth color="secondary" variant="contained">Keep User</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    )
}

export default UserList;
