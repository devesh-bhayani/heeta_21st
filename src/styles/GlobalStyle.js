import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@400;700&display=swap');

  html, body {
    margin: 0;
    padding: 0;
    background: linear-gradient(120deg, #ffe1fa 0%, #ffd6eb 55%, #fffbe8 100%) !important;
    font-family: ${theme.fonts.body};
    color: ${theme.colors.gray};
    min-height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    color: ${theme.colors.primary};
    margin: 0 0 0.5em 0;
    letter-spacing: 2px;
    text-shadow: 0 3px 24px #fffbe8, 0 2px 8px #ffd6eb;
  }
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s;
    font-family: ${theme.fonts.heading};
    font-size: 1.6rem;
    letter-spacing: 1px;
    &:hover {
      color: ${theme.colors.accent};
    }
  }
  * {
    box-sizing: inherit;
  }
  ul, ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  nav ul {
    display: flex !important;
    flex-direction: row !important;
    gap: 3.2rem !important;
    align-items: center;
    justify-content: center;
  }
  nav li {
    display: flex;
    align-items: center;
  }
  nav {
    width: 100vw;
  }
`;

export default GlobalStyle;
