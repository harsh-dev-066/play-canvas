import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../app/store';

const StyledSpinnerWrapper = styled.div`
  background: ${({ theme }) => theme.colors.backgroundColor};
  width: 100vw;
  height: calc(100vh - 60px);
  position: absolute;
  z-index: 999;
  margin-top: 60px;
`;

const StyledSpinner = styled.div`
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
  position: absolute;
  left: calc(50vw - 25px);
  top: calc(50vh - 20px);
  display: flex;
  gap: 3px;

  div {
    z-index: 999;
    background-color: black;
    height: 100%;
    width: 10px;
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }

  .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.4);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }

  @keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
`;

const Spinner = () => {
  const { isLoading } = useSelector((state: RootState) => state.report);

  return (
    <>
      {isLoading ? (
        <StyledSpinnerWrapper>
          <StyledSpinner>
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </StyledSpinner>
        </StyledSpinnerWrapper>
      ) : null}
    </>
  );
};

export default Spinner;
