import styled from "styled-components";

export const ProgressbarStyles = styled.div`
  .loadingContainerStyle {
    display: flex;
    position: absolute;
    background-color: white;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 120px);
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .loadingMessageStyle {
    text-align: center;
    font-size: 20px;
  }

  .progressbarContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    text:center;
    width: 30%;
    margin-top: 20px;
    gap: 16px;
  }

  progress {
    height: 20px;
    width: 100%;
    border-radius: 10px;
    appearance: none;
  }

  progress::-webkit-progress-bar {
    background-color: #f0f0f0;
    border-radius: 10px;
  }

  progress::-webkit-progress-value {
    background-color: black;
    border-radius: 10px;
  }

  .percentageCounter {
    font-size: 20px;
    font-weight: bold;
  }
`;
