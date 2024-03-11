import styled from 'styled-components';

export const StyledDashboard = styled.div`
  .hidden {
    display: none;
  }

  .red {
    color: #990000;
  }

  .half-opacity {
    fill-opacity: 0.5;
  }

  .full-opacity {
    fill-opacity: 1;
  }

  .art {
    max-width: 100%;
    max-height: 100%;
  }

  .wrapper {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .item {
    cursor: pointer;
    background: #fff;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 8px 12px;
    font-size: 14px;
    margin-bottom: 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
  }

  .item-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .delete-icon {
    svg {
      color: red !important;
    }
  }

  .camera {
    position: 'absolute';
    bottom: 10%;
  }
`;
