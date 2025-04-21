import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@400;700&display=swap');

  html, body {
    margin: 0;
    padding: 0;
    background: ${theme.colors.gradient};
    font-family: ${theme.fonts.body};
    color: ${theme.colors.gray};
    min-height: 100vh;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    color: ${theme.colors.primary};
    margin: 0 0 0.5em 0;
  }
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: ${theme.colors.accent};
    }
  }
  * {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;
