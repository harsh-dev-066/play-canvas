import { SyntheticEvent, useState, useCallback, useEffect, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { TableActionArray } from '../types';
import { StyledDashboard } from '../styles/Dashboard.styled';
import { RootState } from '../app/store';
import { deleteReport, getAllReports } from '../redux/report/reportSlice';
import ConfirmMessage from '../utils/confirmModel';
import { ButtonAnimatedStyles } from '../styles/ButtonAnimated.styled';

const Table = lazy(() => import('../components/Table'));
const Pagination = lazy(() => import('../components/TablePagination'));

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reportList, reportPagination, isCreateLoading, isLoading } = useSelector(
    (state: RootState) => state.report
  );

  const [selectedPage, setSelectedPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const onPaginationChange = async (e: Record<string, any>) => {
    setSelectedPage(e.selected + 1);
  };

  const onSearchQueryChange = (search: string) => {
    setSearchQuery(search);
    setSelectedPage(1);
  };

  const getReports = useCallback(() => {
    dispatch(
      getAllReports({
        searchPage: selectedPage,
        searchQuery: searchQuery,
      })
    );
  }, [dispatch, searchQuery, selectedPage]);

  const onCreate = () => {
    navigate('/report/create');
  };

  const onItemDelete = (event: SyntheticEvent, id: string) => {
    event.stopPropagation();
    dispatch(
      deleteReport({
        cb: () => getReports(),
        reportId: id,
      })
    );
  };

  const viewReport = (event: SyntheticEvent, item: Record<string, any>) => {
    event.stopPropagation();
    navigate(`/report/details/${item?.id}`);
  };

  const deleteItem = async (e: SyntheticEvent, item: Record<string, any>) => {
    e.stopPropagation();
    const confirm = await ConfirmMessage('you want to delete?');
    if (confirm.isConfirmed) {
      onItemDelete(e, item?.id);
    }
  };

  const reportActions: TableActionArray = [
    {
      title: 'View Report',
      onClick: (e, item) => viewReport(e, item),
      className: '',
      icon: <FaEye />,
    },
    {
      title: 'Delete Report',
      onClick: (e, item) => deleteItem(e, item),
      className: 'delete-icon',
      icon: <MdDeleteForever />,
    },
  ];

  useEffect(() => {
    getReports();
  }, [getReports, searchQuery, selectedPage]);

  return (
    <StyledDashboard>
      <div className="wrapper">
        {!isCreateLoading && !isLoading ? (
          <ButtonAnimatedStyles>
            <button className="create create-btn" onClick={onCreate}>
              Create
            </button>
          </ButtonAnimatedStyles>
        ) : null}
        <Table
          title="All Reports"
          columnsToShow={['report_name', 'created_at']}
          columns={['Name', 'Created At']}
          rows={reportList}
          actions={reportActions}
          onRowClick={(e, id) => viewReport(e, id)}
          hasSearch={true}
          searchProps={{
            placeholder: 'Search Reports',
            onSearch: onSearchQueryChange,
          }}
        />
      </div>
      {reportList.length > 0 && (
        <Pagination
          pageCount={reportPagination?.total_pages}
          handlePageClick={onPaginationChange}
          selectedPage={selectedPage}
        />
      )}
    </StyledDashboard>
  );
};

export default Dashboard;
