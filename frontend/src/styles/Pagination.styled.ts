import styled from 'styled-components';

export const StyledPagination = styled.div`
  .paginate {
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
  }

  .pagination {
    display: flex;
    gap: 10px;
    list-style: none;
    cursor: pointer;
    padding: 2rem;
  }

  .pagination a {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #000000;
    color: #232323;
  }

  .pagination__link {
    font-weight: bold;
  }

  .pagination__link--active a {
    color: #fff;
    background: #000000;
  }

  .pagination__link--disabled a {
    color: rgb(198, 197, 202);
    border: 1px solid rgb(198, 197, 202);
  }
`;
