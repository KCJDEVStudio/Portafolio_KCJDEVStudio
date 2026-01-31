/**
 * @file main.jsx - Entry point de la aplicación React
 * @description
 * Archivo de punto de entrada principal que:
 * - Inicializa la aplicación React con ReactDOM
 * - Configura el routing con BrowserRouter (habilita navegación entre páginas)
 * - Envuelve la app en StrictMode para detectar problemas de desarrollo
 * - Monta la aplicación en el elemento con id="root" del HTML
 */

import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/**
 * React.StrictMode: Modo de desarrollo que activa validaciones adicionales:
 * - Detecta componentes con ciclo de vida inseguro
 * - Advierte sobre strings ref heredadas
 * - Advierte sobre findDOMNode deprecado
 * - Verifica componentes inesperados
 * No tiene efecto en producción
 * 
 * BrowserRouter: Proveedor de enrutamiento que habilita:
 * - Navegación entre rutas (/, /about, /privacy)
 * - Manejo de historial del navegador
 * - Props como location, history, match en componentes
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);