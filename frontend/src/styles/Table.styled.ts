import styled from 'styled-components';

export const StyledTable = styled.div`
  .table-wrapper {
    display: block;
    min-height: 400px;
  }

  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .table-title {
    margin-top: 12px;
    text-align: unset;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.primaryTextColor};
  }

  .rwd-table {
    margin: auto;
    width: 100%;
    min-width: 300px;
    max-width: 100%;
    border-collapse: collapse;
    text-align: center;
  }

  .rwd-table tr:first-child {
    border-top: none;
    background: ${({ theme }) => theme.colors.backgroundColor};
    color: ${({ theme }) => theme.colors.primaryTextColor};
  }

  .rwd-table tr {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background-color: #fbfbfb;
  }

  .rwd-table tr:nth-child(odd):not(:first-child) {
    background-color: #f4f4f4;
  }

  .rwd-table th {
    display: none;
  }

  .rwd-table td {
    display: block;
  }

  .rwd-table td:first-child {
    margin-top: 0.5em;
  }

  .rwd-table td:last-child {
    margin-bottom: 0.5em;
  }

  .rwd-table td:before {
    content: attr(data-th) ': ';
    font-weight: bold;
    width: 120px;
    display: inline-block;
    color: #000;
  }

  .rwd-table th,
  .rwd-table td {
    text-align: left;
  }

  .rwd-table {
    color: #333;
    border-radius: 0.4em;
    overflow: hidden;
  }

  .rwd-table tr {
    border-color: #bfbfbf;
  }

  .rwd-table th,
  .rwd-table td {
    padding: 0.5em 1em;
  }
  @media screen and (max-width: 601px) {
    .rwd-table tr:nth-child(2) {
      border-top: none;
    }
  }
  @media screen and (min-width: 600px) {
    .rwd-table tr:hover:not(:first-child) {
      background-color: #e4e6e7;
    }
    .rwd-table td:before {
      display: none;
    }
    .rwd-table th,
    .rwd-table td {
      display: table-cell;
      padding: 0.25em 0.5em;
    }
    .rwd-table th:first-child,
    .rwd-table td:first-child {
      padding-left: 0;
    }
    .rwd-table th:last-child,
    .rwd-table td:last-child {
      padding-right: 0;
    }
    .rwd-table th,
    .rwd-table td {
      padding: 1em !important;
    }
  }

  .table-actions {
    display: flex !important;
    align-items: center;
    gap: 10px;
  }

  .action-icon {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.7) !important;
    cursor: pointer;
    border: unset;
    background: transparent;
  }

  .no-results {
    height: calc(100vh - 400px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;
