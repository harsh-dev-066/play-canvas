import styled from 'styled-components';

export const StyledSearchBox = styled.div`
  .search-box {
    font-size: 18px;
    padding: 4px 8px;
    border: 1px solid rgb(193, 193, 193);
    background-color: white;
    border-radius: 16px;
    transition: all 0.2s ease 0s;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 250px;
  }

  .search-box:hover {
    border-color: #aaaaaa;
  }

  .search-box:focus-within {
    border-color: #1a1518;
    box-shadow: 0 0 0 5px rgb(63 63 70 / 0.4);
  }

  input {
    letter-spacing: -0.2px;
    border: none;
    color: #323232;
    vertical-align: 4px;
    width: 180px;
  }

  button:hover {
    cursor: pointer;
  }

  input:focus {
    outline: none;
  }

  input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }

  .clear:not(:valid) ~ .search-clear {
    display: none;
  }
`;
