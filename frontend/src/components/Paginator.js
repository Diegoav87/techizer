import React from 'react';
import Pagination from '@mui/material/Pagination';

const Paginator = ({ pageCount, onPageChange, currentPage }) => {
    return (
        <Pagination count={pageCount} onChange={onPageChange} page={currentPage} color="primary" showFirstButton showLastButton />
    )
}

export default Paginator;
