/**
 * @file AppRouter.jsx - Sistema de enrutamiento de la aplicación
 * @description
 * Define todas las rutas disponibles en la aplicación web de KCJ DevStudio.
 * Utiliza React Router para manejar la navegación entre páginas sin recargar
 * el navegador, lo que proporciona una experiencia más fluida al usuario (SPA).
 */

import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Privacy from "../pages/Privacy";

/**
 * AppRouter - Componente que gestiona todas las rutas de la aplicación
 * 
 * Rutas disponibles:
 * - / → Home: Página principal con hero, servicios, team y formulario de contacto
 * - /about → About: Página acerca de nosotros (actualmente sin contenido completo)
 * - /privacy → Privacy: Políticas de privacidad (Ley 1581 de 2012)
 * 
 * @returns {JSX.Element} Un contenedor de rutas de React Router
 */
function AppRouter() {
  return (
    <Routes>
      {/* Ruta principal - Página de inicio */}
      <Route path="/" element={<Home />} />
      
      {/* Ruta secundaria - Página acerca de nosotros */}
      <Route path="/about" element={<About />} />
      
      {/* Ruta de privacidad - Políticas de privacidad y ARCO */}
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
}

export default AppRouter;
