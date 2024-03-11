import styled from 'styled-components';

export const ButtonAnimatedStyles = styled.div`
  .create {
    text-align: center;
    width: 120px;
    height: 40px;
    padding: 4px 8px;
    border: 2px solid #000;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
  }

  .create-btn {
    background: #000;
    color: #fff;
    line-height: 42px;
    padding: 0;
    border: none;
  }
  .create-btn:hover {
    background: transparent;
    color: #000;
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9, 7px 7px 20px 0px #0002,
      4px 4px 5px 0px #0001;
  }
  .create-btn:before,
  .create-btn:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: #000;
    transition: 400ms ease all;
  }
  .create-btn:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
  .create-btn:hover:before,
  .create-btn:hover:after {
    width: 100%;
    transition: 800ms ease all;
  }
`;
