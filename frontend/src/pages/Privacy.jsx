/**
 * @file Privacy.jsx - Página de Políticas de Privacidad
 * @description
 * Componente que renderiza la página completa de políticas de privacidad
 * cumpliendo con la Ley 1581 de 2012 (Colombia) y su Decreto 1377 de 2013.
 * 
 * Incluye:
 * - 12 secciones legales detalladas
 * - Derechos ARCO (Acceso, Rectificación, Cancelación, Oposición)
 * - Información sobre tratamiento de datos personales
 * - Contacto para solicitudes de privacidad
 * - Header y navegación consistentes con el sitio
 * 
 * Cumplimiento legal:
 * - Ley 1581 de 2012: Protección de datos personales
 * - Decreto 1377 de 2013: Regulación y procedimientos
 * - Resolución 60021 de 2018 (SIC): Guías específicas
 */

import { useEffect, useState } from "react";

/**
 * Componente Privacy - Página de políticas de privacidad
 * 
 * Estados:
 * - atTop: boolean - Controla estilo del header (scroll detection)
 * 
 * @returns {JSX.Element} Página completa con políticas de privacidad
 */
export default function Privacy() {
  /**
   * Estado que detecta si el usuario está en la parte superior de la página
   * Se usa para cambiar el estilo del header (similar a Home.jsx)
   */
  const [atTop, setAtTop] = useState(true);

  /**
   * useEffect: Detector de scroll para cambiar estilo del header
   * 
   * Cuando scrollY > 0:
   * - Header obtiene fondo semi-transparente con blur (glassmorphism)
   * - Proporciona mejor UX al ver contenido detrás del header
   */
  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <div className="min-h-screen font-sans bg-white text-gray-900">
      {/* ===== HEADER CON NAVEGACIÓN ===== */}
      {/* 
        Header sticky con efecto glassmorphism
        Navega de vuelta al inicio (/), permitiendo a usuarios regresar fácilmente
      */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          atTop ? "bg-black" : "bg-black/30 backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo clickeable - Navega a inicio */}
          <a href="/">
            <img
              src="/logo_horizontal.png"
              alt="KCJ DevStudio"
              className="h-50 w-auto object-contain"
            />
          </a>

          {/* Navegación */}
          <nav className="space-x-6 text-sm font-medium text-white">
            <a href="/" className="hover:text-[#5af388] transition">
              Inicio
            </a>
          </nav>
        </div>
      </header>

      {/* Espaciador para compensar header fixed */}
      <div className="h-20" />

      {/* ===== CONTENIDO PRINCIPAL: POLÍTICAS DE PRIVACIDAD ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            {/* Título y metadatos */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Políticas de Privacidad
              </h1>
              <p className="text-gray-600">
                Información sobre cómo tratamos tus datos personales
              </p>
              {/* Fecha de última actualización dinámica */}
              <p className="text-sm text-gray-500 mt-4">
                Última actualización: {new Date().toLocaleDateString('es-CO', {year: 'numeric', month: 'long', day: 'numeric'})}
              </p>
            </div>

            {/* Contenido: 12 secciones legales */}
            <div className="prose prose-sm max-w-none space-y-8 text-gray-700">
              {/* 1. Responsable del Tratamiento */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#5af388]">1.</span> Responsable del Tratamiento de Datos
                </h2>
                <p className="mb-4">
                  <strong>Razón Social:</strong> KCJ DevStudio
                </p>
                <p className="mb-4">
                  <strong>Ubicación:</strong> Colombia
                </p>
                <p className="mb-4">
                  <strong>Correo de contacto:</strong>{" "}
                  <a
                    href="mailto:kcjdevstudio@gmail.com"
                    className="text-[#5af388] hover:underline"
                  >
                    kcjdevstudio@gmail.com
                  </a>
                </p>
                <p>
                  KCJ DevStudio es responsable del tratamiento de tus datos
                  personales de conformidad con la Ley 1581 de 2012 y su
                  Decreto Reglamentario 1377 de 2013.
                </p>
              </section>

              {/* 2. Datos Personales Recopilados */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#5af388]">2.</span> Datos Personales Recopilados
                </h2>
                <p className="mb-4">
                  A través de nuestro formulario de contacto recopilamos los
                  siguientes datos personales:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li>
                    <strong>Nombre Completo:</strong> Identificación de la
                    persona que se contacta
                  </li>
                  <li>
                    <strong>Correo Electrónico:</strong> Para comunicarnos
                    contigo y responder tu consulta
                  </li>
                  <li>
                    <strong>Número de Teléfono:</strong> Para establecer
                    contacto telefónico si es necesario
                  </li>
                  <li>
                    <strong>Tipo de Proyecto:</strong> Categorización del
                    servicio solicitado
                  </li>
                  <li>
                    <strong>Mensaje o Consulta:</strong> Contenido de tu
                    solicitud de servicio
                  </li>
                </ul>
                <p className="text-sm bg-blue-50 border border-blue-200 rounded-md p-4">
                  <strong>Nota:</strong> No recopilamos datos sensibles. Todos
                  los datos son proporcionados voluntariamente por ti.
                </p>
              </section>

              {/* 3. Finalidad del Tratamiento */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#5af388]">3.</span> Finalidad del Tratamiento
                </h2>
                <p className="mb-4">
                  Utilizamos tus datos personales exclusivamente para:
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-[#5af388] shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                    </svg>
                    <span>
                      Responder a tu consulta o solicitud de información sobre
                      nuestros servicios
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-[#5af388] shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                    </svg>
                    <span>
                      Establecer contacto para coordinar reuniones o cotizaciones
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-[#5af388] shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                    </svg>
                    <span>Enviar información sobre nuestros servicios</span>
                  </li>
                  <li className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-[#5af388] shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                    </svg>
                    <span>
                      Cumplir con obligaciones legales y regulatorias
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-[#5af388] shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12L19.6 5.6z" />
                    </svg>
                    <span>
                      Mejorar nuestros servicios y experiencia de usuario
                    </span>
                  </li>
                </ul>
              </section>

              {/* 4. Base Legal del Tratamiento */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#5af388]">4.</span> Base Legal del
                  Tratamiento
                </h2>
                <p className="mb-4">
                  El tratamiento de tus datos se realiza con base en:
                </p>
                <ul className="space-y-2 ml-4 list-disc list-inside">
                  <li>Tu consentimiento previo, informado y expreso</li>
                  <li>
                    La ejecución de relaciones contractuales con tu organización
                  </li>
                  <li>Cumplimiento de obligaciones legales y reglamentarias</li>
                  <li>
                    Intereses legítimos de KCJ DevStudio en responder consultas
                    y ofrecer servicios
                  </li>
                </ul>
              </section>

              {/* 5. Derechos del Titular */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#5af388]">5.</span> Derechos del
                  Titular de los Datos (ARCO)
                </h2>
                <p className="mb-4">
                  De conformidad con la Ley 1581 de 2012, tienes derecho a
                  ejercer los derechos ARCO:
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-[#5af388] pl-4 py-2">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Derecho de Acceso
                    </h3>
                    <p>
                      Puedes solicitar en cualquier momento acceso a tus datos
                      personales que tratamos, información sobre cómo los usamos
                      y a quién se los compartimos.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#5af388] pl-4 py-2">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Derecho de Rectificación
                    </h3>
                    <p>
                      Puedes solicitar la actualización, corrección o
                      rectificación de datos personales inexactos, incompletos o
                      que hayan sido tratados en incumplimiento de la ley.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#5af388] pl-4 py-2">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Derecho de Cancelación
                    </h3>
                    <p>
                      Puedes solicitar la eliminación de tus datos personales
                      cuando ya no sean necesarios, cuando retires tu
                      consentimiento, o cuando existas razones legales válidas.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#5af388] pl-4 py-2">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Derecho de Oposición
                    </h3>
                    <p>
                      Puedes oponerté a que tus datos sean tratados para fines
                      específicos, incluyendo marketing, perfilamiento o análisis
                      de comportamiento.
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm bg-green-50 border border-green-200 rounded-md p-4">
                  <strong>Cómo ejercer tus derechos:</strong> Para ejercer
                  cualquiera de estos derechos, envía un correo a{" "}
                  <a
                    href="mailto:kcjdevstudio@gmail.com"
                    className="text-[#5af388] hover:underline"
                  >
                    kcjdevstudio@gmail.com
                  </a>
                  {" "}con tu solicitud. Responderemos en un plazo de 10 días hábiles.
                </p>
              </section>

              {/* 6. Almacenamiento y Seguridad */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#5af388]">6.</span> Almacenamiento y
                  Seguridad de la Información
                </h2>
                <p className="mb-4">
                  Implementamos medidas técnicas, administrativas y físicas para
                  proteger tus datos personales contra acceso no autorizado,
                  alteración, pérdida o divulgación:
                </p>
                <ul className="space-y-2 ml-4 list-disc list-inside">
                  <li>Encriptación de datos en tránsito (HTTPS/SSL)</li>
                  <li>Acceso restringido a personal autorizado</li>
                  <li>
                    Servidores alojados en infraestructura segura y confiable
                  </li>
                  <li>Cumplimiento de estándares de seguridad de la industria</li>
                  <li>
                    Auditorías periódicas de seguridad de datos y privacidad
                  </li>
                </ul>

                <p className="mt-4 text-sm bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <strong>Responsabilidad:</strong> Aunque implementamos
                  medidas rigurosas de seguridad, no podemos garantizar
                  seguridad absoluta. Cualquier transmisión de datos es bajo tu
                  propio riesgo.
                </p>
              </section>

              {/* 7. Tiempo de Retención */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#5af388]">7.</span> Tiempo de
                  Retención de Datos
                </h2>
                <p className="mb-4">
                  Conservaremos tus datos personales durante el tiempo
                  necesario para:
                </p>
                <ul className="space-y-2 ml-4 list-disc list-inside">
                  <li>
                    Cumplir con el propósito para el cual fueron recopilados
                  </li>
                  <li>Cumplir con obligaciones legales y fiscales</li>
                  <li>Resolver conflictos o reclamaciones</li>
                  <li>
                    Mantener relaciones comerciales contigo (si aplica)
                  </li>
                </ul>
                <p className="mt-4">
                  Una vez cumplido el propósito, procederemos a eliminar tus
                  datos o anonimizarlos, a menos que la ley requiera conservarlos
                  por mayor tiempo.
                </p>
              </section>

              {/* 8. Compartición de Datos */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#5af388]">8.</span> Compartición de
                  Datos con Terceros
                </h2>
                <p className="mb-4">
                  Normalmente, no compartimos tus datos con terceros. Sin embargo,
                  podemos hacerlo en estos casos:
                </p>
                <ul className="space-y-2 ml-4 list-disc list-inside">
                  <li>
                    Cuando sea necesario para proporcionar los servicios que
                    solicitaste
                  </li>
                  <li>
                    Cuando la ley lo requiera (órdenes judiciales, autoridades)
                  </li>
                  <li>
                    Con proveedores de servicios que trabajan bajo acuerdos de
                    confidencialidad
                  </li>
                  <li>
                    Para proteger nuestros derechos, privacidad o seguridad
                  </li>
                </ul>
              </section>

              {/* 9. Consentimiento */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#5af388]">9.</span> Tu Consentimiento
                </h2>
                <p className="mb-4">
                  Al completar nuestro formulario de contacto y aceptar estas
                  políticas de privacidad, das tu consentimiento informado,
                  previo y expreso para:
                </p>
                <ul className="space-y-2 ml-4 list-disc list-inside">
                  <li>
                    El tratamiento de tus datos personales conforme a lo
                    descrito en esta política
                  </li>
                  <li>
                    Recibir comunicaciones de KCJ DevStudio sobre nuestros
                    servicios
                  </li>
                  <li>
                    El registro y procesamiento de tu solicitud en nuestros
                    sistemas
                  </li>
                </ul>

                <p className="mt-4 text-sm bg-purple-50 border border-purple-200 rounded-md p-4">
                  <strong>Nota sobre el consentimiento:</strong> Este
                  consentimiento es completamente voluntario. Puedes retirarlo
                  en cualquier momento contactándonos al email indicado. Sin
                  embargo, la retención del consentimiento puede impedir que
                  podamos procesar tu solicitud.
                </p>
              </section>

              {/* 10. Cambios a esta Política */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#5af388]">10.</span> Cambios a esta
                  Política
                </h2>
                <p className="mb-4">
                  Podemos actualizar esta política de privacidad en cualquier
                  momento. Los cambios serán efectivos inmediatamente después de
                  su publicación en nuestro sitio web. Te recomendamos revisar
                  periódicamente esta política para estar informado de cómo
                  protegemos tus datos.
                </p>
              </section>

              {/* 11. Información Legal */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#5af388]">11.</span> Marco Legal
                </h2>
                <p className="mb-4">
                  Esta política de privacidad se rige por:
                </p>
                <ul className="space-y-2 ml-4 list-disc list-inside">
                  <li>
                    <strong>Ley 1581 de 2012:</strong> Ley General de Protección
                    de Datos Personales
                  </li>
                  <li>
                    <strong>Decreto 1377 de 2013:</strong> Reglamentación de la
                    Ley 1581
                  </li>
                  <li>
                    <strong>Resolución 60021 de 2018:</strong> Guías de protección
                    de datos de la Superintendencia de Industria y Comercio (SIC)
                  </li>
                  <li>
                    <strong>Leyes de telecomunicaciones de Colombia:</strong> Para
                    comunicaciones comerciales
                  </li>
                </ul>
              </section>

              {/* 12. Contacto */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#5af388]">12.</span> Información de
                  Contacto
                </h2>
                <p className="mb-4">
                  Si tienes preguntas, comentarios, o deseas ejercer tus derechos
                  ARCO, contacta a:
                </p>

                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <p>
                    <strong>Nombre de la Empresa:</strong> KCJ DevStudio
                  </p>
                  <p>
                    <strong>País:</strong> Colombia
                  </p>
                  <p>
                    <strong>Correo Electrónico:</strong>{" "}
                    <a
                      href="mailto:kcjdevstudio@gmail.com"
                      className="text-[#5af388] hover:underline font-semibold"
                    >
                      kcjdevstudio@gmail.com
                    </a>
                  </p>
                  <p>
                    <strong>Tiempo de Respuesta:</strong> Responderemos a tus
                    solicitudes dentro de 10 días hábiles
                  </p>
                </div>
              </section>

              {/* Disclaimer */}
              <section>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-bold text-red-900 mb-2">
                    IMPORTANTE - Exención de Responsabilidad
                  </h3>
                  <p className="text-red-800 text-sm">
                    Esta política de privacidad es de carácter informativo y no
                    constituye asesoramiento legal. Si requieres asesoramiento
                    legal específico sobre la protección de datos personales,
                    por favor consulta a un abogado especializado en derecho de
                    protección de datos en Colombia.
                  </p>
                </div>
              </section>
            </div>

            {/* Footer CTA */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-600 mb-4">
                ¿Tienes dudas? Estamos aquí para ayudarte
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  className="inline-block bg-[#5af388] text-black px-6 py-2 rounded-md font-semibold hover:bg-[#45d97a] transition text-center"
                >
                  Volver al Inicio
                </a>
                <a
                  href="/#contact"
                  className="inline-block border-2 border-[#5af388] text-[#5af388] px-6 py-2 rounded-md font-semibold hover:bg-[#5af388] hover:text-black transition text-center"
                >
                  Contactar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-sm text-gray-600 border-t mt-12">
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

        <div>
          © {new Date().getFullYear()} KCJ DevStudio. Todos los derechos
          reservados.
        </div>
      </footer>
    </div>
  );
}
