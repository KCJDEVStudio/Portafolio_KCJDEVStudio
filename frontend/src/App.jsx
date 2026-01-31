/**
 * @file App.jsx - Componente raíz de la aplicación
 * @description
 * Componente principal que actúa como contenedor para toda la aplicación.
 * Su único propósito es renderizar el sistema de enrutamiento (AppRouter),
 * que a su vez renderiza los diferentes componentes según la ruta actual.
 * 
 * Estructura de la aplicación:
 * App (este archivo)
 *   └─ AppRouter (router/AppRouter.jsx)
 *       ├─ Home (/)
 *       ├─ About (/about)
 *       └─ Privacy (/privacy)
 */

import AppRouter from "./router/AppRouter";

/**
 * Componente App - Componente raíz de la aplicación
 * 
 * @returns {JSX.Element} El sistema de enrutamiento que contiene todas las páginas
 */
function App() {
  return <AppRouter />;
}

export default App;
