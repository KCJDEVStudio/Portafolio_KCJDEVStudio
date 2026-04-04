/**
 * @file Natbot.jsx - Página de detalles del proyecto Natbot
 * @description
 * Componente que renderiza la página completa del proyecto Natbot
 * Incluye: descripción general, funcionalidades, tecnologías,
 * caso de uso en producción, información del proyecto y galería
 * 
 * ===== CAMBIOS REALIZADOS (Febrero 1, 2026) =====
 * NUEVO ARCHIVO CREADO COMPLETAMENTE
 * - Página dedicada al proyecto Natbot con todas las secciones
 * - Header responsive con menú hamburguesa para móviles
 * - Importación de Logo_natbot.PNG para mostrar branding real
 * - Contenido profesional orientado a empresas
 * - Integración con el portafolio de Home.jsx
 * - Ruta: /project/natbot (agregada en AppRouter.jsx)
 */

import { useEffect, useState } from "react";
import natbotImg from "../assets/image/Logo_natbot.png";

export default function Natbot() {
  const [atTop, setAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  {/* ===== DETECTOR DE SCROLL [ACTUALIZADO - 01/02/2026] ===== */}
  {/* 
    useEffect: Detector de scroll para cambiar estilo del header
    - Añade listener al evento scroll
    - Actualiza atTop según posición del scroll (window.scrollY)
    - Limpia el listener cuando el componente se desmonta
    - Se ejecuta solo una vez al montar el componente
    - Performance optimizado para no afectar renderizado
  */}
  // Detector de scroll para cambiar estilo del header
  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white text-gray-900">
      {/* ===== HEADER [ACTUALIZADO - 01/02/2026] ===== */}
      {/* 
        Header sticky con efectos visuales
        - fixed: Se mantiene en la parte superior al hacer scroll
        - z-50: Por encima de todo contenido
        - Glassmorphism: bg-black/30 backdrop-blur-md cuando hay scroll
        - Incluye navegación responsive (desktop/mobile)
        - Logo de KCJ DevStudio con enlace a inicio...
      */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          atTop ? "bg-black" : "bg-black/30 backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img
              className="flex items-center justify-center w-16 h-16 rounded-full border border-[#dbe4ff]"
              style={{ backgroundColor: "#f5f8ff" }}
              className="h-50 w-auto object-contain"
            />
          </a>

                className="w-12 h-12 object-contain"
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-white">
            <a href="/#portfolio" className="hover:text-[#fad643] transition">
              Inicio
            </a>
          </nav>

          {/* Botón Hamburguesa Mobile */}
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

        {/* Navegación Mobile */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-black/95 border-t border-white/10 px-6 py-4 flex flex-col space-y-3">
            <a 
              href="/#portfolio" 
              className="text-white hover:text-[#fad643] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Volver al Portafolio
            </a>
          </nav>
        )}
      </header>

      {/* Espaciador para compensar el header fixed */}
      <div className="h-20" />

      {/* ===== HERO SECTION ===== */}
      <section className="py-12 md:py-20 bg-linear-to-br from-[#1c2f80] to-black text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Logo del proyecto */}
            <div className="shrink-0">
              <img src={natbotImg} alt="Natbot" loading="lazy" className="w-32 h-32 md:w-48 md:h-48 object-contain shadow-lg" />
            </div>

            {/* Información principal */}
            <div>
              <div className="inline-block bg-[#fad643]/20 text-[#fad643] px-4 py-1 rounded-full text-sm font-semibold mb-4">
                Automatización
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                Natbot
                <span className="block text-[#fad643] text-3xl md:text-4xl">
                  Automatización Inteligente en WhatsApp
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Asistente digital 24/7 que automatiza la atención al cliente y optimiza procesos internos mediante WhatsApp.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="inline-block bg-[#fad643] text-black px-4 py-2 rounded-lg font-semibold">
                  ✓ Implementado y en funcionamiento
                </div>
                <div className="inline-block bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold">
                  WhatsApp Business
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DESCRIPCIÓN GENERAL ===== */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 border border-gray-200">
            <h2 className="text-3xl font-bold mb-6">¿Qué es Natbot?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Natbot es un asistente digital inteligente que funciona a través de WhatsApp, automatizando la atención al cliente 24/7 para empresas. Actúa como una secretaria virtual disponible en cualquier momento, respondiendo consultas, proporcionando información y realizando tareas operativas sin necesidad de intervención manual.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Con Natbot, las empresas pueden transformar la forma en que atienden a sus clientes: respuestas inmediatas, disponibilidad continua, y automatización de procesos que generan valor sin incrementar costos operacionales.
            </p>
          </div>
        </div>
      </section>

      {/* ===== VALOR Y BENEFICIOS ===== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">¿Para Qué Sirve?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "⚡",
                title: "Respuestas Inmediatas",
                desc: "Mensajes automáticos 24/7 que resuelven inquietudes sin tiempos de espera",
              },
              {
                icon: "👥",
                title: "Reducción de Carga Operativa",
                desc: "Automatiza procesos repetitivos, liberando al equipo para tareas estratégicas",
              },
              {
                icon: "😊",
                title: "Mejora en Experiencia del Cliente",
                desc: "Atención rápida, consistente y disponible en el canal preferido del usuario",
              },
              {
                icon: "📈",
                title: "Escalabilidad Sin Costos",
                desc: "Atiende múltiples conversaciones simultáneamente sin incremento de personal",
              },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FUNCIONALIDADES PRINCIPALES ===== */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Funcionalidades Principales</h2>
          <div className="bg-linear-to-br from-[#fad643]/5 to-[#1c2f80]/5 rounded-2xl border border-[#fad643]/20 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Respuestas automáticas personalizadas según contexto del negocio",
                "Atención al cliente 24/7 por WhatsApp sin tiempos de espera",
                "Envío automático de información, servicios, precios y catálogos",
                "Agendamiento y gestión de citas de forma autónoma",
                "Envío y recepción de correos electrónicos integrados",
                "Automatización de procesos internos y flujos de trabajo",
                "Clasificación y enrutamiento de conversaciones según prioridad",
                "Sistema escalable y completamente personalizable según necesidades",
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="text-[#fad643] text-2xl shrink-0 pt-1">✓</div>
                  <p className="text-gray-700 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECNOLOGÍAS ===== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Tecnologías Utilizadas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "n8n",
                desc: "Plataforma de automatización sin código para diseñar flujos complejos",
              },
              {
                name: "API de WhatsApp Business",
                desc: "Integración oficial con el servicio de Meta para WhatsApp",
              },
              {
                name: "API de Facebook",
                desc: "Conectividad con ecosistema extendido de Meta",
              },
              {
                name: "API de Gmail",
                desc: "Gestión automática de correos electrónicos integrada",
              },
              {
                name: "Integraciones API Externas",
                desc: "Conexión flexible con múltiples servicios según necesidades",
              },
              {
                name: "Stack Personalizado",
                desc: "Arquitectura adaptada y escalable para producción",
              },
            ].map((tech, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-[#fad643] mb-2">{tech.name}</h3>
                <p className="text-gray-600">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CASO DE USO EN PRODUCCIÓN ===== */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Caso de Uso en Producción</h2>
          <div className="bg-linear-to-br from-[#1c2f80] to-black text-white rounded-2xl shadow-lg p-8 md:p-12 border border-[#fad643]/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-[#fad643]">Centro Educativo Crehana</h3>
                {/* ===== ACLARACIÓN LEGAL [NUEVO - 01/02/2026] ===== */}
                {/* 
                  Línea de aclaración para evitar confusión y problemas legales
                  - Clarifica que es un centro educativo local diferente
                  - No está afiliado a la plataforma internacional Crehana
                  - Importante: ambas organizaciones comparten nombre pero son entidades distintas
                  - Protege legalmente a KCJ DevStudio y al cliente
                */}
                <p className="text-sm text-gray-400 mb-6">Centro educativo local – no afiliado a la plataforma internacional Crehana.</p>
                <p className="text-gray-200 mb-6 leading-relaxed">
                  Centro Educativo Crehana es una institución educativa que ofrece educación por ciclos para jóvenes en extra edad y adultos. Cuenta con aprobación oficial por la Secretaría de Educación del Departamento del Meta, brindando una alternativa flexible y accesible para la culminación de estudios básicos y media.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Natbot fue implementado como un sistema de automatización en WhatsApp para optimizar la atención al estudiante, responder consultas frecuentes sobre horarios, inscripciones, costos y procesos académicos, y mejorar los tiempos de respuesta de manera automática y confiable.
                </p>
                <a
                  href="https://www.instagram.com/crehana_3269/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#fad643] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#e8c12c] transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 2C4.246 2 2 4.246 2 7v10c0 2.754 2.246 5 5 5h10c2.754 0 5-2.246 5-5V7c0-2.754-2.246-5-5-5H7z" />
                  </svg>
                  Ver Instagram
                </a>
              </div>
              <div className="bg-[#fad643]/10 rounded-xl p-6 border border-[#fad643]/30">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Estado del Proyecto</div>
                    <div className="text-lg font-semibold text-[#fad643]">Implementado y en funcionamiento</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Plataforma</div>
                    <div className="text-lg font-semibold">WhatsApp Business</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Tipo de Cliente</div>
                    <div className="text-lg font-semibold">Plataforma Educativa</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Desarrollo</div>
                    <div className="text-lg font-semibold">A la Medida</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INFORMACIÓN DEL PROYECTO ===== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Información del Proyecto</h2>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {[
                { label: "Tipo de Proyecto", value: "Automatización / Chatbot Inteligente" },
                { label: "Plataforma Principal", value: "WhatsApp Business" },
                { label: "Estado Actual", value: "Implementado y en funcionamiento" },
                { label: "Modelo de Desarrollo", value: "SaaS por suscripción" },
                { label: "Disponibilidad", value: "24/7" },
                { label: "Escalabilidad", value: "Completamente Escalable" },
              ].map((item, idx) => (
                <div key={idx} className="p-6">
                  <div className="text-sm font-medium text-gray-600 mb-2 uppercase">
                    {item.label}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CARACTERÍSTICAS DESTACADAS ===== */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">¿Por Qué Elegir Natbot?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔧",
                title: "Totalmente Personalizable",
                desc: "Adaptable a cualquier proceso y flujo de negocio específico",
              },
              {
                icon: "🚀",
                title: "Fácil de Implementar",
                desc: "Integración rápida sin complicaciones técnicas",
              },
              {
                icon: "📊",
                title: "Métricas y Reportes",
                desc: "Seguimiento detallado de conversaciones y rendimiento",
              },
              {
                icon: "🔐",
                title: "Seguridad Garantizada",
                desc: "Integración oficial con APIs de confianza",
              },
              {
                icon: "💼",
                title: "Soporte Profesional",
                desc: "Acompañamiento técnico durante implementación y operación",
              },
              {
                icon: "⭐",
                title: "Probado en Producción",
                desc: "Funcionando exitosamente en empresas reales",
              },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 md:py-24 bg-linear-to-br from-[#1c2f80] to-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Quieres automatizar tu atención al cliente?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Natbot puede transformar la forma en que tu empresa atiende a clientes. Contacta con nosotros para conocer cómo implementarlo en tu negocio.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-[#fad643] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#e8c12c] transition text-lg"
          >
            Solicitar Información
          </a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="text-center py-8 text-sm text-gray-600 border-t">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full"
            style={{ backgroundColor: "#1c2f80" }}
          >
            <img
              src="/logo_vertical.png"
              alt="KCJ logo"
              loading="lazy"
              className="w-15 h-15 object-contain"
            />
          </div>
          <div className="text-left">
            <div className="text-xl font-bold" style={{ color: "#fad643" }}>
              KCJ
            </div>
            <div className="text-sm" style={{ color: "#000000" }}>
              DevStudio
            </div>
          </div>
        </div>
        <div>© {new Date().getFullYear()} KCJ DevStudio. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
}
