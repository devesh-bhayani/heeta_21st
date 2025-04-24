import { useEffect } from "react";
import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

function ForceScrollToTop() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Try multiple times to defeat browser quirks
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      // If you have a main scrollable div, also reset its scrollTop
      const main = document.querySelector('#main-scroll');
      if (main) main.scrollTop = 0;
    };
    scrollToTop();
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 100);
    setTimeout(scrollToTop, 300);
  }, []);
  return null;
}

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ForceScrollToTop />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
