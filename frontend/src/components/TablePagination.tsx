import React from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { StyledPagination } from '../styles/Pagination.styled';

interface PaginationProps {
  pageCount: number;
  handlePageClick: ReactPaginateProps['onPageChange'];
  selectedPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, handlePageClick, selectedPage }) => {
  return (
    <StyledPagination>
      <div className="paginate">
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName={'pagination__link--active'}
          forcePage={selectedPage - 1}
        />
      </div>
    </StyledPagination>
  );
};

export default Pagination;
