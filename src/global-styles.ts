import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  }

  #root {
    min-height: 100vh;
    min-width: 100%;
  }
`;
