import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeProvider from "./context/ThemeContext.tsx";
import LocaleContext from "./context/LocaleContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocaleContext>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LocaleContext>
  </React.StrictMode>
);
