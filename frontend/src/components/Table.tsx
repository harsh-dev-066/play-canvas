import React, { SyntheticEvent } from 'react';
import { StyledTable } from '../styles/Table.styled';
import convertUtcToIst from '../utils/convertUtcToIst';
import SearchBox from './SearchBox';
import { TableActionArray } from '../types';
interface TableRow {
  id: string;
  name: string;
  createdAt: string;
}

interface SearchProps {
  placeholder?: string;
  onChange?: () => void;
  onSearch: (search: string) => void;
}

interface TableProps {
  title: string;
  columns: string[];
  columnsToShow: string[];
  rows: TableRow[];
  actions?: TableActionArray;
  onRowClick: (event: SyntheticEvent, item: Record<string, any>) => void;
  hasSearch?: boolean;
  searchProps?: SearchProps;
}

function isValidDateString(dateString: string): boolean {
  const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return dateFormat.test(dateString);
}

const Table: React.FC<TableProps> = (props) => {
  const {
    title,
    columns,
    columnsToShow,
    rows,
    actions,
    onRowClick,
    hasSearch = false,
    searchProps,
  } = props;

  return (
    <StyledTable>
      <div className="table-wrapper">
        <div className="table-header">
          <div className="table-title">{title}</div>
          {hasSearch && <SearchBox {...searchProps} />}
        </div>
        {rows?.length > 0 ? (
          <table className="rwd-table">
            <tbody>
              <tr>
                {columns?.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
                {actions?.length > 0 && <th>Actions</th>}
              </tr>
              {rows?.map((row, index) => (
                <tr
                  key={index}
                  onClick={(event) => onRowClick(event, row)}
                  className="cursor-pointer"
                >
                  {Object.keys(row)?.map(
                    (item, itemIndex) =>
                      columnsToShow?.includes(item) && (
                        <td key={itemIndex} data-th={item}>
                          {isValidDateString(row[item]) ? convertUtcToIst(row[item]) : row[item]}
                        </td>
                      )
                  )}
                  <td key={index} data-th="Action" className="table-actions">
                    {actions?.map((action, index) => (
                      <button
                        onClick={(event) => action?.onClick(event, row)}
                        className={`action-icon ${action?.className}`}
                        title={action.title}
                      >
                        {action?.icon}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">
            <img width="96" height="96" alt="no-results" src="/no-results.png" />
            <div className="font-bold italic text-xl mt-6">No reports to display, create them!</div>
          </div>
        )}
      </div>
    </StyledTable>
  );
};

export default Table;
