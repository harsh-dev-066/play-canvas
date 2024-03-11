import React from 'react';
import { useSelector } from 'react-redux';
import { GridLoader } from 'react-spinners';
import { RootState } from '../../app/store';

const loadingContainerStyle: React.CSSProperties = {
  display: 'flex',
  position: 'absolute',
  backgroundColor: 'white',
  flexDirection: 'column',
  gap: '50px',
  alignItems: 'center',
  justifyContent: 'center',
  height: `calc(100vh - 120px)`,
  width: '100%', // Set width to 100% of the viewport width
  margin: 0, // Ensure no margin
  padding: 0, // Ensure no padding
};

const loadingMessageStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '20px',

  // Add any additional styling you want for the loading message
};

function ServerLoader() {
  const { checkServerLoading } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {checkServerLoading ? (
        <div style={loadingContainerStyle}>
          <div>
            <div style={loadingMessageStyle}>Connecting to server</div>
            <div style={loadingMessageStyle}>Please wait....</div>
          </div>
          <GridLoader />
        </div>
      ) : null}
    </>
  );
}

export default ServerLoader;
