import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Function to generate the page numbers with ellipsis
  const renderPageNumbers = () => {
    const adjacentPageCount = 2; // Number of pages adjacent to current page before showing ellipsis
    const pagesToShow = 2 * adjacentPageCount + 1; // Total pages shown including current page and ellipsis

    let pages = [];
    let startPage, endPage;

    if (totalPages <= pagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= adjacentPageCount + 1) {
        startPage = 1;
        endPage = pagesToShow - 1;
      } else if (currentPage >= totalPages - adjacentPageCount) {
        startPage = totalPages - pagesToShow + 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - adjacentPageCount;
        endPage = currentPage + adjacentPageCount;
      }
    }

    // Generate the page numbers and ellipsis
    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <li key={page} className={currentPage === page ? 'page-item active' : 'page-item'}>
          <button className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      );
    }

    // Add ellipsis for the beginning
    if (startPage > 1) {
      if (startPage > 2) {
        pages.unshift(
          <li key="page-1" className="page-item">
            <button className="page-link" onClick={() => onPageChange(1)}>
              1
            </button>
          </li>
        );
      }
      pages.unshift(
        <li key="ellipsis-start" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    // Add ellipsis for the end
    if (endPage < totalPages) {
      pages.push(
        <li key="ellipsis-end" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
      if (endPage < totalPages - 1) {
        pages.push(
          <li key={`page-${totalPages}`} className="page-item">
            <button className="page-link" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </button>
          </li>
        );
      }
    }

    return pages;
  };

  return (
    <nav>
      <ul className="pagination">
        {/* Previous button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
        </li>

        {/* Render page numbers and ellipsis */}
        {renderPageNumbers()}

        {/* Next button */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
