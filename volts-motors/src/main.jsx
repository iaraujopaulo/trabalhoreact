// Ponto de entrada: liga o React à <div id="root"> do index.html.
// HashRouter: as rotas ficam depois do # (ex.: index.html#/modelos), o que funciona no GitHub Pages sem configuração extra.
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
