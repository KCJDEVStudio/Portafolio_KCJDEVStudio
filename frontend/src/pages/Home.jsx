/**
 * @file Home.jsx - Página principal de KCJ DevStudio
 * @description
 * Componente que renderiza la página de inicio completa incluyendo:
 * - Header sticky con navegación
 * - Hero section con CTA
 * - Sección Sobre nosotros
 * - Servicios ofrecidos
 * - Portafolio de proyectos
 * - Equipo con modales interactivos
 * - Formulario de contacto con validación
 * - Footer
 */

import { useEffect, useState } from "react";
import gemaImg from "../assets/image/Ejemplo Gema.png";
import natbotImg from "../assets/image/Logo_natbot.png";
import crisImg from "../assets/image/Cris.JPG";
import kevinImg from "../assets/image/Kevin.jpg";
import jonathanImg from "../assets/image/Jonathan.jpg";

/**
 * Componente Home - Página principal del sitio web
 *
 * Estados gestionados:
 * - atTop: boolean - Indica si el scroll está en la parte superior (para header styling)
 * - mobileMenuOpen: boolean - Controla si el menú hamburguesa está abierto [NUEVO - 01/02/2026]
 * - selectedMember: object | null - Miembro del equipo seleccionado para mostrar modal
 * - formStatus: object - Estado del formulario {type: 'success'|'error'|null, message: string}
 * - isLoading: boolean - Indica si se está enviando el formulario
 * 
 * ===== CAMBIOS REALIZADOS (Febrero 1, 2026) =====
 * 1. HEADER RESPONSIVE [NUEVO]
 *    - Agregado estado mobileMenuOpen para controlar visibilidad del menú móvil
 *    - Navegación desktop: oculta en móviles (hidden md:flex)
 *    - Navegación mobile: desplegable con botón hamburguesa
 * 
 * 2. PORTAFOLIO - PROYECTO NATBOT [NUEVO]
 *    - Se importó Logo_natbot.PNG del proyecto
 *    - Se agregó tarjeta 2 en la sección Portfolio para mostrar Natbot
 *    - Incluye enlace a /project/natbot para ver detalles completos
 *    - Muestra logo real del proyecto en lugar de ícono genérico
 * 
 * @returns {JSX.Element} Página principal con todas las secciones
 */
export default function Home() {
  // ==================== ESTADO DEL HEADER ====================
  /**
   * Estado que controla el estilo del header
   * Se usa para aplicar glassmorphism cuando el usuario hace scroll
   */
  const [atTop, setAtTop] = useState(true);

  // Base de la API: configurable por Vite, fallback a "/api" para producción detrás de Nginx
  const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";

  /**
   * Estado que controla si el menú móvil está abierto [NUEVO - 01/02/2026]
   * Se usa para mostrar/ocultar navegación en dispositivos pequeños (<768px)
   * - true: Menú móvil visible (abierto)
   * - false: Menú móvil oculto (cerrado)
   */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * useEffect: Detector de scroll para cambiar estilo del header
   *
   * Functionality:
   * - Añade listener al evento scroll
   * - Actualiza atTop según posición del scroll (window.scrollY)
   * - Limpia el listener cuando el componente se desmonta
   *
   * Performance: Se ejecuta solo una vez al montar el componente
   */
  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", onScroll);
    // Cleanup: Remover listener para evitar memory leaks
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ==================== ESTADO DEL EQUIPO Y FORMULARIO ====================
  /**
   * Miembro del equipo seleccionado actualmente
   * Cuando no es null, muestra un modal con detalles del miembro
   */
  const [selectedMember, setSelectedMember] = useState(null);

  /**
   * Estado del formulario de contacto
   * - type: 'success' | 'error' | null - Tipo de mensaje a mostrar
   * - message: string - Texto del mensaje
   */
  const [formStatus, setFormStatus] = useState({ type: null, message: "" });

  /**
   * Indica si se está procesando el envío del formulario
   * Se usa para deshabilitar inputs y botón, mostrar "Enviando..."
   */
  const [isLoading, setIsLoading] = useState(false);

  // ==================== DATOS DEL EQUIPO ====================
  /**
   * Array de objetos que contiene información del equipo de KCJ DevStudio
   * Usado para renderizar tarjetas del equipo y modales
   *
   * Propiedades de cada miembro:
   * - name: string - Nombre completo
   * - role: string - Puesto/rol en la empresa
   * - image: string - Ruta de la imagen
   * - portfolioLink: string - URL del portafolio/GitHub
   * - description: string - Descripción profesional del miembro
   */
  const team = [
    {
      name: "Cristian Morales",
      role: "Co-fundador / Full Stack Developer",
      image: crisImg,
      portfolioLink: "https://github.com/ZilonZ",
      description:
        "Desarrollador Full Stack con enfoque en Frontend y experiencia de usuario. Especializado en React, diseño de interfaces modernas y maquetación responsive. Se encarga de transformar ideas en experiencias digitales claras, intuitivas y atractivas.",
    },
    {
      name: "Kevin Rey",
      role: "Co-fundador / Full Stack Developer",
      image: kevinImg,
      portfolioLink: "https://github.com/kvinjr9",
      description:
        "Desarrollador Full Stack enfocado en Backend y arquitectura de software. Trabaja en la lógica del sistema, bases de datos, APIs y seguridad, asegurando que las aplicaciones sean escalables, estables y eficientes.",
    },
    {
      name: "Jonathan Morales",
      role: "Co-fundador / Full Stack Developer",
      image: jonathanImg,
      portfolioLink: "https://github.com/jonmor-bot",
      description:
        "Desarrollador Full Stack con enfoque en diseño visual y comunicación digital. Encargado del diseño gráfico, identidad visual, imágenes y material publicitario, aportando coherencia estética y valor visual a cada proyecto.",
    },
  ];

  // ==================== CERRAR MODAL CON ESCAPE ====================
  /**
   * useEffect: Listener para cerrar modal al presionar ESC
   *
   * Functionality:
   * - Detecta evento keydown en el documento
   * - Si la tecla es Escape, cierra el modal (selectedMember = null)
   * - Proporciona mejor UX permitiendo cerrar modal con ESC
   */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ==================== MANEJADOR DE ENVÍO DE FORMULARIO ====================
  /**
   * handleContactFormSubmit - Procesa el envío del formulario de contacto
   *
   * Flujo:
   * 1. Previene comportamiento por defecto del formulario
   * 2. Limpia mensajes anteriores
   * 3. Extrae datos del formulario usando FormData
   * 4. Valida que el checkbox de privacidad esté marcado (privacyConsent)
   * 5. Envía POST request al backend
   * 6. Procesa respuesta y muestra mensaje de éxito/error
   * 7. Limpia el formulario si es exitoso
   *
   * @param {Event} e - Evento del formulario
   * @returns {Promise<void>}
   *
   * Validaciones cliente:
   * - El checkbox de privacidad debe estar marcado (formData.get('privacy') === 'on')
   * - Backend valida: nombre, email, teléfono, tipo de proyecto, mensaje
   *
   * Errores manejados:
   * - Respuesta del servidor no OK
   * - Errores de conexión (backend no disponible)
   * - Errores de red
   */
  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: null, message: "" });
    setIsLoading(true);

    try {
      const form = document.getElementById("contact-form");
      const formData = new FormData(form);

      // Extraer datos del formulario
      const name = formData.get("name");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const projectType = formData.get("projectType");
      const message = formData.get("message");

      // ===== VALIDACIONES FRONTEND =====
      // Validar que los campos requeridos no estén vacíos
      if (!name || !email || !phone || !projectType || !message) {
        setFormStatus({
          type: "error",
          message: "Por favor completa todos los campos requeridos",
        });
        setIsLoading(false);
        return;
      }

      // Validar formato de email con regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setFormStatus({
          type: "error",
          message: "Por favor ingresa un email válido",
        });
        setIsLoading(false);
        return;
      }

      // Validar formato de teléfono (al menos 10 dígitos)
      const phoneRegex = /^\d{10,}$/;
      if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
        setFormStatus({
          type: "error",
          message: "Por favor ingresa un teléfono válido (mínimo 10 dígitos)",
        });
        setIsLoading(false);
        return;
      }

      // Validar que el mensaje tenga al menos 10 caracteres
      if (message.trim().length < 10) {
        setFormStatus({
          type: "error",
          message: "El mensaje debe tener al menos 10 caracteres",
        });
        setIsLoading(false);
        return;
      }

      // Validar privacyConsent
      const privacyConsent = formData.get("privacy") === "on";
      if (!privacyConsent) {
        setFormStatus({
          type: "error",
          message: "Debes aceptar los términos de privacidad",
        });
        setIsLoading(false);
        return;
      }

      // Construir payload con datos validados
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        projectType: projectType.trim(),
        message: message.trim(),
        privacyConsent: true,
      };

      // Realizar petición POST al backend (misma-origin vía Nginx proxy)
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Verificar si la respuesta fue exitosa
      if (response.ok && data.success) {
        // Mostrar mensaje de éxito y limpiar formulario
        setFormStatus({
          type: "success",
          message:
            data.message ||
            "Mensaje enviado exitosamente. Nos contactaremos pronto.",
        });
        form.reset();
      } else {
        // Mostrar error desde el servidor
        setFormStatus({
          type: "error",
          message: data.message || "Error al enviar el mensaje",
        });
      }
    } catch (error) {
      // Error de conexión (backend no disponible o problema de red)
      setFormStatus({
        type: "error",
        message:
          "Error de conexión. Verifica que el backend responda en /api/contact",
      });
    } finally {
      // Siempre desactivar el estado de carga
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-white text-gray-900">
      {/* ===== HEADER: NAVEGACIÓN STICKY CON EFECTO GLASSMORPHISM ===== */}
      {/* 
        Header que se fija en la parte superior (fixed z-50)
        Cambio dinámico de estilos según scroll:
        - En la parte superior: fondo negro sólido (bg-black)
        - Después de scroll: fondo semi-transparente con blur (bg-black/30 backdrop-blur-md)
        Proporciona mejor UX al ver contenido debajo cuando haces scroll
      */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          atTop ? "bg-black" : "bg-black/30 backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <img
            src="/logo_horizontal.png"
            alt="KCJ DevStudio"
            className="h-50 w-auto object-contain"
          />

          {/* ===== NAVEGACIÓN DESKTOP [ACTUALIZADO - 01/02/2026] ===== */}
          {/* 
            Navegación visible solo en pantallas ≥ 768px (md breakpoint)
            Oculta en móviles con "hidden md:flex"
            Enlaces a secciones del mismo componente usando #id
            Parámetros hash (#) permiten scroll suave a secciones
          */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-white">
            <a href="#about" className="hover:text-[#5af388] transition">Nosotros</a>
            <a href="#services" className="hover:text-[#5af388] transition">Servicios</a>
            <a href="#portfolio" className="hover:text-[#5af388] transition">Portafolio</a>
            <a href="#contact" className="hover:text-[#5af388] transition">Contacto</a>
          </nav>

          {/* ===== BOTÓN HAMBURGUESA MOBILE [NUEVO - 01/02/2026] ===== */}
          {/* 
            Botón que abre/cierra el menú móvil
            - Visible solo en pantallas < 768px (md:hidden)
            - El ícono cambia entre hamburguesa (☰) y equis (✕)
            - Alternar mobileMenuOpen entre true/false...
          */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* ===== NAVEGACIÓN MOBILE [NUEVO - 01/02/2026] ===== */}
        {/* 
          Menú desplegable para dispositivos móviles
          - Solo se renderiza cuando mobileMenuOpen === true
          - Se cierra automáticamente al hacer clic en un enlace
          - Estilo: fondo negro semi-transparente (bg-black/95) con borde superior
          - Enlaces apilados verticalmente con iconos hover verde (#5af388)
        */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-black/95 border-t border-white/10 px-6 py-4 flex flex-col space-y-3">
            <a 
              href="#about" 
              className="text-white hover:text-[#5af388] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nosotros
            </a>
            <a 
              href="#services" 
              className="text-white hover:text-[#5af388] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Servicios
            </a>
            <a 
              href="#portfolio" 
              className="text-white hover:text-[#5af388] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portafolio
            </a>
            <a 
              href="#contact" 
              className="text-white hover:text-[#5af388] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </a>
          </nav>
        )}
      </header>

      {/* Espaciador para compensar el header fixed */}
      <div className="h-20" />

      {/* ===== HERO SECTION: PRESENTACIÓN PRINCIPAL ===== */}
      {/* 
        Sección de introducción con propuesta de valor
        - Título destacado con color de marca (#5af388)
        - Descripción clara de servicios
        - CTA (Call-To-Action) que navega a formulario de contacto
      */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Soluciones digitales{" "}
            <span className="text-[#5af388]">a la medida</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Creamos páginas web, aplicaciones y sistemas modernos para personas,
            emprendedores y empresas que quieren crecer digitalmente.
          </p>
          <a
            href="#contact"
            className="inline-block bg-[#5af388] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#fce38a] transition"
          >
            Iniciar proyecto
          </a>
        </div>
      </section>

      {/* ===== ABOUT SECTION: INFORMACIÓN DE LA EMPRESA ===== */}
      {/* 
        Sección "Sobre Nosotros"
        id="about" permite navegación desde header
        Contiene descripción de la empresa y valores clave
      */}
      <section id="about" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Sobre nosotros
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">
                  En KCJ DevStudio desarrollamos soluciones de programación a la
                  medida para personas, emprendedores y empresas que buscan
                  llevar sus ideas al mundo digital. Diseñamos y entregamos
                  páginas web, aplicaciones, sistemas y automatizaciones
                  funcionales, modernas y seguras, adaptadas a cada necesidad.
                </p>
                <p className="text-gray-600 mb-4">
                  Nos especializamos en desarrollo web y de aplicaciones, bases
                  de datos, sistemas de información y automatización de
                  procesos. También ofrecemos soporte y mantenimiento técnico
                  continuo para que tus soluciones sigan aportando valor con el
                  tiempo.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 mt-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#5af388] shrink-0 mt-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12l4 4L19 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <div className="font-semibold">
                        Diseño centrado en el usuario
                      </div>
                      <div className="text-sm text-gray-600">
                        Interfaces claras y usables que facilitan la conversión.
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#5af388] shrink-0 mt-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12l4 4L19 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <div className="font-semibold">Performance y SEO</div>
                      <div className="text-sm text-gray-600">
                        Optimización de velocidad y estructura para mejor
                        visibilidad en buscadores.
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#5af388] shrink-0 mt-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12l4 4L19 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <div className="font-semibold">Integraciones seguras</div>
                      <div className="text-sm text-gray-600">
                        Conexiones fiables con pagos, CRMs y APIs externas.
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#5af388] shrink-0 mt-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12l4 4L19 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <div className="font-semibold">Soporte y evolución</div>
                      <div className="text-sm text-gray-600">
                        Mantenimiento y mejoras continuas para que tu producto
                        crezca seguro.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-linear-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                <div
                  className="h-44 rounded-md flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#1b3012" }}
                >
                  <img
                    src="/logo_horizontal.png"
                    alt="KCJ logo"
                    className="max-h-28 md:max-h-75 w-auto object-contain mx-auto"
                  />
                </div>
                <p className="text-gray-600 mb-4">
                  Creemos en el trato cercano, la comunicación clara y el
                  acompañamiento constante durante cada proyecto. Estamos
                  contigo desde la idea hasta el mantenimiento.
                </p>
                <a
                  href="#contact"
                  className="inline-block w-full text-center bg-[#5af388] text-black py-2 rounded-lg font-semibold hover:bg-[#45d97a] transition"
                >
                  Contactar y cotizar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION: SERVICIOS OFRECIDOS ===== */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-4xl font-bold mb-4">Nuestros servicios</h3>
            <p className="text-gray-600">
              Soluciones digitales completas para impulsar tu negocio
            </p>
          </div>

          {/* Servicio 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h4 className="text-3xl font-bold mb-4">
                Web Profesional para Microempresas
              </h4>
              <p className="text-gray-600 mb-6">
                Sitios web modernos diseñados para empresas que buscan una
                presencia digital sólida y profesional. Entregamos diseños
                centrados en el usuario, estructura optimizada para SEO, páginas
                de servicios y contacto completas, y un panel administrativo
                para que puedas actualizar contenidos sin depender de soporte.
                Además optimizamos tiempos de carga y compatibilidad entre
                dispositivos para mejorar la conversión.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Diseños responsivos para todos los dispositivos
                </li>
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Optimización SEO para tener mayor visibilidad en buscadores
                </li>
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Formularios de contacto
                </li>
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Panel administrativo
                </li>
              </ul>
            </div>

            <div className="h-72 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src="/Img_Web.png"
                alt="Web Profesional"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Servicio 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="md:order-2">
              <h4 className="text-3xl font-bold mb-4">
                Aplicaciones Web y Móviles
              </h4>
              <p className="text-gray-600 mb-6">
                Aplicaciones a la medida para optimizar procesos internos y
                ofrecer experiencias rápidas y accesibles a tus usuarios.
                Desarrollamos frontends responsivos, backends escalables e
                integraciones con APIs y servicios externos (pagos, pasarelas,
                CRMs). Incluimos buenas prácticas de seguridad, autenticación y
                mantenimiento para crecer sin fricciones.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Aplicaciones web modernas
                </li>
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Sistemas internos
                </li>
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Integraciones API
                </li>
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Seguridad y escalabilidad
                </li>
              </ul>
            </div>

            <div className="h-72 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src="/Img_Movil.png"
                alt="Web Profesional"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Servicio 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h4 className="text-3xl font-bold mb-4">Tiendas Online</h4>
              <p className="text-gray-600 mb-6">
                E-commerce completos preparados para vender desde el primer día:
                catálogos, gestión de inventario, variantes de producto y flujos
                de compra optimizados. Integramos pasarelas de pago, opciones de
                envío, y paneles de administración para pedidos y clientes;
                además aplicamos técnicas de conversión y analítica para
                maximizar ventas.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Catálogo de productos
                </li>
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Pagos online
                </li>
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Gestión de pedidos e inventarios
                </li>
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Panel administrativo
                </li>
              </ul>
            </div>

            <div className="h-72 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src="/Img_Ecommerce.png"
                alt="Web Profesional"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Servicio 4 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <h4 className="text-3xl font-bold mb-4">
                Automatizaciones y Chatbots
              </h4>
              <p className="text-gray-600 mb-6">
                Sistemas inteligentes que automatizan tareas repetitivas y
                mejoran la atención al cliente. Diseñamos flujos de
                automatización, bots conversacionales y conectores a
                WhatsApp/Telegram o servicios internos para reducir tiempos de
                respuesta y errores manuales. Incluimos métricas y ajustes para
                que las automatizaciones evolucionen con tu negocio.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Automatización de procesos
                </li>
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Chatbots personalizados
                </li>
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Integración con WhatsApp
                </li>
                <li>
                  <svg
                    className="w-4 h-4 inline-block mr-2 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                  </svg>
                  Sistemas a la medida
                </li>
              </ul>
            </div>

            <div className="h-72 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src="/Img_Ia.png"
                alt="Web Profesional"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-10">Portafolio</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) =>
              n === 1 ? (
                <div key={n} className="bg-white rounded-xl shadow p-6">
                  <a
                    href="/project/gema"
                    className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full"
                  >
                    <img
                      src={gemaImg}
                      alt="GEMA"
                      loading="lazy"
                      className="h-20 md:h-28 w-auto object-contain shrink-0"
                    />
                    <div className="text-left flex-1">
                      <h4 className="font-semibold text-lg mb-1">GEMA</h4>
                      <p className="text-sm text-gray-600 wrap-break-word">
                        Solución para gestión de flotas de maquinaria pesada,
                        mantenimiento preventivo y correctivo, registro de horas
                        y reportes para optimizar la vida útil de equipos, entre
                        otras.
                      </p>
                    </div>
                  </a>
                </div>
              ) : n === 2 ? (
                <div key={n} className="bg-white rounded-xl shadow p-6">
                  <a href="/project/natbot" className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full">
                    <img src={natbotImg} alt="Natbot" loading="lazy" className="h-20 md:h-28 w-auto object-contain shrink-0" />
                    <div className="text-left flex-1">
                      <h4 className="font-semibold text-lg mb-1">Natbot</h4>
                      <p className="text-sm text-gray-600 wrap-break-word">Chatbot inteligente para WhatsApp que automatiza atención al cliente 24/7 y gestiona procesos operativos.</p>
                    </div>
                  </a>
                </div>
              ) : (
                <div
                  key={n}
                  className="bg-white rounded-xl shadow p-6 h-48 flex items-center justify-center"
                >
                  <span className="text-gray-600">Se nuestro proyecto # {n}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">
            Nuestro equipo
          </h3>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-center">
            {team.map((member) => (
              <button
                key={member.name}
                onClick={() => setSelectedMember(member)}
                className="bg-white p-6 rounded-xl w-64 shadow text-left focus:outline-none"
              >
                <div className="mx-auto mb-4">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-20 h-20 rounded-full object-cover mx-auto"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-[#5af388] rounded-full mx-auto mb-0 flex items-center justify-center text-sm text-white">
                      Próx.
                    </div>
                  )}
                </div>
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
              </button>
            ))}
          </div>
        </div>

        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSelectedMember(null)}
            />
            <div className="relative bg-white rounded-xl shadow-lg max-w-xl w-full mx-4 p-6">
              <button
                className="absolute top-3 right-3 text-gray-500"
                onClick={() => setSelectedMember(null)}
              >
                Cerrar
              </button>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="shrink-0">
                  {selectedMember.image ? (
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-40 h-40 md:w-56 md:h-56 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                      Imagen próximamente
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-2">
                    {selectedMember.name}
                  </h4>
                  <div className="text-sm text-gray-600 mb-4">
                    {selectedMember.role}
                  </div>
                  <p className="text-gray-700">{selectedMember.description}</p>
                  <a
                    href={selectedMember.portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 bg-[#5af388] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#45d97a] transition"
                  >
                    Ver portafolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== CONTACT SECTION: FORMULARIO DE CONTACTO ===== */}
      {/* 
        Sección de contacto con formulario completo
        id="contact" permite navegación desde header
        Integración completa con backend:
        - Validación cliente (HTML5 + JavaScript)
        - Validación servidor (backend en /api/contact)
        - Manejo de privacidad (GDPR - Ley 1581 de 2012)
      */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-6 text-center">
            ¿Listo para tu proyecto?
          </h3>
          <p className="text-gray-700 mb-6 text-center">
            Escríbenos y hagamos realidad tu idea digital.
          </p>

          {/* 
            Formulario de contacto
            id="contact-form" permite acceso desde JavaScript
            onSubmit={handleContactFormSubmit} procesa envío de forma asíncrona
            
            Validaciones:
            1. Cliente: HTML5 required + validación de email/teléfono
            2. Servidor: Backend valida todos los campos + privacyConsent
            3. Seguridad: Backend siempre valida privacyConsent (imposible evadir)
          */}
          <form
            className="bg-white rounded-xl shadow p-6 md:p-8"
            onSubmit={handleContactFormSubmit}
            id="contact-form"
          >
            {/* Grid 2 columnas en desktop, 1 en móvil */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Campo: Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Nombre Completo"
                  required
                  disabled={isLoading}
                  className="block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5af388] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Campo: Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@ejemplo.com"
                  required
                  disabled={isLoading}
                  className="block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5af388] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Campo: Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+57 312 3456789"
                  required
                  disabled={isLoading}
                  className="block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5af388] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Campo: Tipo de proyecto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de proyecto
                </label>
                <select
                  name="projectType"
                  defaultValue="Web"
                  disabled={isLoading}
                  className="block w-full border border-gray-200 rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="Web">
                    Web Profesional para Microempresas
                  </option>
                  <option value="App">Aplicaciones Web y Móviles</option>
                  <option value="Ecommerce">Tiendas Online</option>
                  <option value="Automatizacion">
                    Automatizaciones y Chatbots
                  </option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            {/* Campo: Mensaje */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Dinos que idea tienes en mente y la hacemos realidad!!!"
                required
                disabled={isLoading}
                className="block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5af388] disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* 
              Campo: Checkbox de Privacidad (CRÍTICO - GDPR)
              IMPORTANTE:
              - required: El usuario DEBE marcar este checkbox para enviar
              - Cuando está marcado, formData.get('privacy') === 'on'
              - Backend también valida este campo (imposible evadir por API)
              - Link abre políticas en nueva pestaña sin interrumpir el formulario
              - Cumple con Ley 1581 de 2012 (Colombia)
            */}
            <div className="mt-4 flex items-start gap-3">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                required
                disabled={isLoading}
                className="mt-1 h-4 w-4 text-[#5af388] border-gray-300 rounded disabled:cursor-not-allowed cursor-pointer"
              />
              <label
                htmlFor="privacy"
                className="text-sm text-gray-700 cursor-pointer"
              >
                He leído y acepto las{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5af388] underline hover:text-[#45d97a] transition"
                >
                  políticas de privacidad
                </a>
              </label>
            </div>

            {/* 
              Mensaje de estado del formulario
              - Tipo 'success': Mensaje de envío exitoso (verde)
              - Tipo 'error': Mensaje de error (rojo)
              - Desaparece cuando el usuario intenta enviar de nuevo
            */}
            {formStatus.message && (
              <div
                className={`mt-4 p-4 rounded-md ${
                  formStatus.type === "success"
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                {formStatus.message}
              </div>
            )}

            {/* Botón de envío */}
            <div className="mt-6 text-right">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center bg-[#5af388] text-black px-6 py-2 rounded-md font-semibold hover:bg-[#45d97a] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-sm text-gray-600 border-t">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full"
            style={{ backgroundColor: "#1b3012" }}
          >
            <img
              src="/logo_vertical.png"
              alt="KCJ logo"
              className="w-15 h-15 object-contain"
            />
          </div>
          <div className="text-left">
            <div className="text-xl font-bold" style={{ color: "#5af388" }}>
              KCJ
            </div>
            <div className="text-sm" style={{ color: "#000000" }}>
              DevStudio
            </div>
          </div>
        </div>

        <div className="mt-2">
          <a
            href="https://www.instagram.com/kcj__dev_studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-medium"
            style={{ color: "#1b3012" }}
            aria-label="Instagram"
          >
            <span className="text-sm">Instagram</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7 2C4.246 2 2 4.246 2 7v10c0 2.754 2.246 5 5 5h10c2.754 0 5-2.246 5-5V7c0-2.754-2.246-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10z" />
              <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
              <circle cx="18.5" cy="5.5" r="1.25" />
            </svg>
          </a>
        </div>

        <div>
          © {new Date().getFullYear()} KCJ DevStudio. Todos los derechos
          reservados.
        </div>
      </footer>
    </div>
  );
}
