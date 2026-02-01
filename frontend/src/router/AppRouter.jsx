/**
 * @file AppRouter.jsx - Sistema de enrutamiento de la aplicación
 * @description
 * Define todas las rutas disponibles en la aplicación web de KCJ DevStudio.
 * Utiliza React Router para manejar la navegación entre páginas sin recargar
 * el navegador, lo que proporciona una experiencia más fluida al usuario (SPA).
 * 
 * ===== CAMBIOS REALIZADOS (Febrero 1, 2026) =====
 * AGREGADO: Importación del componente Natbot y ruta para ver detalles del proyecto
 * - Se importó Natbot desde "../pages/Natbot"
 * - Se agregó ruta "/project/natbot" para mostrar la página completa del proyecto
 * - Esto permite que desde Home.jsx se navegue a /project/natbot al hacer clic en el proyecto Natbot
 */

import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Privacy from "../pages/Privacy";
import Natbot from "../pages/Natbot";
import Gema from "../pages/Gema";

/**
 * AppRouter - Componente que gestiona todas las rutas de la aplicación
 * 
 * Rutas disponibles:
 * - / → Home: Página principal con hero, servicios, team y formulario de contacto
 * - /about → About: Página acerca de nosotros (actualmente sin contenido completo)
 * - /privacy → Privacy: Políticas de privacidad (Ley 1581 de 2012)
 * - /project/natbot → Natbot: Página de detalles del proyecto Natbot [NUEVO - 01/02/2026]
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

      {/* ===== RUTAS DE PROYECTOS INDIVIDUALES [NUEVO - 01/02/2026] ===== */}
      {/* 
        Ruta dinámicas para mostrar detalles completos de cada proyecto del portafolio.
        NUEVO: Se agregó la ruta /project/natbot para mostrar la página completa del proyecto Natbot
        con descripción, funcionalidades, tecnologías, caso de uso en producción, información del proyecto
        NUEVO: Se agregó la ruta /project/gema para mostrar la página completa del proyecto GEMA
        con descripción, funcionalidades, tecnologías, caso de uso en producción, información del proyecto
      */}
      <Route path="/project/natbot" element={<Natbot />} />
      <Route path="/project/gema" element={<Gema />} />
    </Routes>
  );
}

export default AppRouter;
