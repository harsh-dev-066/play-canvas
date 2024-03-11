import styled from "styled-components";

export const ImageContainer = styled.div`
  border: 10px solid;
  width: 80%;
  flex: 1;

  /* Tablet */
  @media (max-width: 820px) {
    flex: 1;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover; /* This makes sure the image covers the entire container */
    min-width: 100px; /* Set your desired minimum width */
    min-height: 600px; /* Set your desired minimum height */
  }
`;
