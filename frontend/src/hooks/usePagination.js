import { useState } from 'react';

const usePagination = (itemsPerPage, itemCount, getData) => {
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        getData(pageNumber);
    }

    const pageCount = Math.ceil(itemCount / itemsPerPage);

    return {
        currentPage, changePage, pageCount
    }
}

export default usePagination;