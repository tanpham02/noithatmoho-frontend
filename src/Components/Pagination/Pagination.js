import { useState } from "react";
import { PAGE_SIZE } from "../AllProducts/AllProducts";
import './Pagination.css'

function Pagination({ total, onPageChange }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(total / PAGE_SIZE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        onPageChange(page);
    };


    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className='pagination-number'>
                    <button className={`${currentPage === i && 'active'}`} onClick={() => handlePageChange(i)}>{i}</button>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <ul className="pagination" style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
            <li className="pagination-prev">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    style={{ display: currentPage === 1 ? 'none' : ''}}
                >
                    <i className="fa-sharp fa-solid fa-arrow-left-long"></i>
                </button>
            </li>
            {renderPageNumbers()}
            <li className="pagination-right">
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{display: currentPage === totalPages ? 'none' : ''}}
                >
                    <i className="fa-sharp fa-solid fa-arrow-right-long"></i>
                </button>
            </li>
        </ul>
    );
}

export default Pagination