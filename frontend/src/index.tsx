import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";

import "react-dates/initialize";

import { Helmet } from "react-helmet";

import { APP_NAME } from "./constants";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Helmet titleTemplate={`${APP_NAME} | %s`} />
      <CSSReset />
      <Global
        styles={css`
          * {
            font-family: Muli, sans-serif;
          }
        `}
      />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
