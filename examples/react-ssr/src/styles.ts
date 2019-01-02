import { createGlobalStyle } from 'styled-components';

// tslint:disable: max-line-length
export const GlobalStyle = createGlobalStyle`
  :root {
    color: #444;
    font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    line-height: 1.8;
  }

  body {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.4;
  }

  header {
    margin: 0 0 4rem;
    padding: 5rem 0;
    background: #06292d;
    color: #fff;
    text-align: center;

    & h1 {
      font-size: 2rem;
    }

    & p {
      color: #7e9294;
      font-size: 0.87rem;
    }
  }

  section {
    margin: 4rem 0;
  }

  h2 {
    font-size: 2rem;
  }

  footer {
    margin: 6rem 0 0;
    padding: 2rem 0;
    background: #efefef;
    color: #666;
    text-align: center;
  }
`;
