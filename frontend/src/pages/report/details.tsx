import React, { lazy, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReportById, reset } from '../../redux/report/reportSlice';
import { RootState } from '../../app/store';

const ReportPdf = lazy(() => import('../../components/ReportPdf'));

const ReportDetails = () => {
  const dispatch = useDispatch();
  const { reportData } = useSelector((state: RootState) => state.report);
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(getReportById(id));
    return () => {
      dispatch(reset());
    };
  }, [id, dispatch]);

  return (
    <div>
      <ReportPdf name={reportData?.report_name} imageUrl={reportData?.image_url} />
      {/* <ReportLoader /> */}
    </div>
  );
};

export default ReportDetails;
