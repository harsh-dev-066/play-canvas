import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ProgressbarStyles } from '../../styles/Progressbar.styles';

function ReportLoader() {
  const { isCreateLoading } = useSelector((state: RootState) => state.report);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (isCreateLoading) {
      const interval = setInterval(() => {
        setProgressValue((prevValue) => {
          const newValue = prevValue + 1;
          return newValue <= 100 ? newValue : 100;
        });
      }, 600);

      return () => clearInterval(interval);
    }
  }, [isCreateLoading]);

  return (
    <ProgressbarStyles>
      {isCreateLoading ? (
        <div className="loadingContainerStyle">
          <div>
            <div className="loadingMessageStyle">Creating Report</div>
            <div className="loadingMessageStyle">Please wait...</div>
          </div>
          {/* <PropagateLoader /> */}

          <div className="progressbarContainer">
            <progress className="progressbar" value={progressValue} max={100}></progress>
            <div className="percentageCounter">{progressValue}%</div>
          </div>
        </div>
      ) : null}
    </ProgressbarStyles>
  );
}

export default ReportLoader;
