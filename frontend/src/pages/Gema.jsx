/**
 * @file Gema.jsx - Página de detalles del proyecto GEMA
 * @description
 * Componente que renderiza la página completa del proyecto GEMA
 * Incluye: descripción general, funcionalidades, tecnologías,
 * caso de uso en producción, información del proyecto y galería
 * 
 * ===== PROYECTO GEMA =====
 * GEMA es una solución empresarial para gestión de flotas de maquinaria pesada
 * - Gestión de flotas completa
 * - Mantenimiento preventivo y correctivo
 * - Registro de horas de operación
 * - Generación de reportes avanzados
 * - Optimización de recursos
 * - En producción con cliente real: Servimacons
 */

import { useEffect, useState } from "react";
import gemaImg from "../assets/image/Ejemplo Gema.png";

export default function Gema() {
  const [atTop, setAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  {/* ===== DETECTOR DE SCROLL ===== */}
  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white text-gray-900">
      {/* ===== HEADER ===== */}
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
              <img src={gemaImg} alt="GEMA" loading="lazy" className="w-32 h-32 md:w-48 md:h-48 object-contain shadow-lg" />
            </div>

            {/* Información principal */}
            <div>
              <div className="inline-block bg-[#fad643]/20 text-[#fad643] px-4 py-1 rounded-full text-sm font-semibold mb-4">
                Gestión Industrial
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                GEMA
                <span className="block text-[#fad643] text-3xl md:text-4xl">
                  Gestor Especializado en Maquinaria Amarilla
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Plataforma integral para gestionar flotas de maquinaria pesada, optimizar mantenimiento y maximizar la vida útil de equipos.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="inline-block bg-[#fad643] text-black px-4 py-2 rounded-lg font-semibold">
                  ✓ Implementado y en funcionamiento
                </div>
                <div className="inline-block bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold">
                  Gestión de Flotas
                </div>
                <a
                  href="https://www.gema-co.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#fad643] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#e8c12c] transition"
                >
                  Ir a GEMA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DESCRIPCIÓN GENERAL ===== */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 border border-gray-200">
            <h2 className="text-3xl font-bold mb-6">¿Qué es GEMA?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              GEMA es una plataforma empresarial integral diseñada específicamente para la gestión profesional de flotas de maquinaria pesada. Proporciona control centralizado sobre equipos, mantenimiento programado, registro de operaciones y generación de reportes detallados para optimizar la eficiencia operativa y prolongar la vida útil de los activos.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Con GEMA, las empresas industriales transforman la gestión de sus flotas: desde el monitoreo en tiempo real del estado de equipos hasta la planificación predictiva del mantenimiento, todo integrado en una única plataforma web segura, escalable y diseñada para la toma de decisiones estratégicas en operaciones complejas.
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
                icon: "🏭",
                title: "Control Total de Flotas",
                desc: "Gestiona múltiples equipos desde una sola plataforma con visibilidad completa de estados y ubicaciones",
              },
              {
                icon: "🔧",
                title: "Mantenimiento Optimizado",
                desc: "Planifica mantenimiento preventivo y correctivo para reducir paros inesperados y costos de reparación",
              },
              {
                icon: "⏱️",
                title: "Registro de Operaciones",
                desc: "Controla horas de operación, productividad y asignación de recursos en tiempo real",
              },
              {
                icon: "📊",
                title: "Reportes Avanzados",
                desc: "Genera análisis detallados sobre rendimiento, costos y proyecciones para mejor toma de decisiones",
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
                "Inventario centralizado de maquinaria pesada con especificaciones técnicas",
                "Sistema de mantenimiento preventivo con alertas automáticas de vencimiento",
                "Registro y seguimiento de mantenimiento correctivo con historial completo",
                "Control preciso de horas de operación y jornadas de trabajo",
                "Asignación de equipos a proyectos y operadores con trazabilidad",
                "Generación automática de reportes por período, equipo o proyecto",
                "Dashboard ejecutivo con métricas de disponibilidad y rendimiento",
                "Sistema de alertas inteligentes para paros prolongados o anomalías",
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
                name: "Frontend Moderno",
                desc: "Interfaz responsiva construida con React y Tailwind CSS para experiencia fluida en cualquier dispositivo",
              },
              {
                name: "Backend Escalable",
                desc: "Servidor robusto con arquitectura modular para manejar múltiples flotas y datos complejos",
              },
              {
                name: "Base de Datos",
                desc: "Sistema de almacenamiento relacional para integridad de datos y consultas de alto rendimiento",
              },
              {
                name: "API REST",
                desc: "Interfaz programática para integraciones externas con sistemas ERP y herramientas de negocio",
              },
              {
                name: "Autenticación Segura",
                desc: "Gestión de accesos con roles y permisos para proteger información sensible de operaciones",
              },
              {
                name: "Reportería Avanzada",
                desc: "Motor de generación de reportes con exportación a PDF, Excel y visualización en tiempo real",
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
                <h3 className="text-2xl font-bold mb-2 text-[#fad643]">Servimacons</h3>
                <p className="text-sm text-gray-400 mb-6">Empresa de servicios a la industria de la construcción y minería.</p>
                <p className="text-gray-200 mb-6 leading-relaxed">
                  Servimacons es una empresa especializada en la provisión de servicios integrales, maquinaria pesada y soluciones tecnológicas para proyectos en los sectores construcción, minería y obra civil. Con operaciones extensas y una flota amplia de equipos, requería un control centralizado y eficiente de sus activos.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  GEMA fue implementada para transformar la gestión de su flota: desde el monitoreo de disponibilidad de equipos hasta la planificación de mantenimiento preventivo. El resultado ha sido una reducción significativa de paros no programados, mejor trazabilidad de operaciones y decisiones estratégicas basadas en datos reales de rendimiento.
                </p>
                <a
                  href="https://www.servimacons.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#fad643] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#e8c12c] transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-6-8h12v2H6z"/>
                  </svg>
                  Conocer Servimacons
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
                    <div className="text-lg font-semibold">Web Empresarial / SaaS</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Tipo de Cliente</div>
                    <div className="text-lg font-semibold">Industrial / Gestión de Flotas</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Desarrollo</div>
                    <div className="text-lg font-semibold">SaaS por suscripción</div>
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
                { label: "Tipo de Proyecto", value: "Gestión de Flotas Empresarial" },
                { label: "Plataforma Principal", value: "Web Empresarial SaaS" },
                { label: "Estado Actual", value: "Implementado y en funcionamiento" },
                { label: "Modelo de Desarrollo", value: "SaaS por suscripción" },
                { label: "Usuarios Actuales", value: "Operadores, Administrativos, Ejecutivos" },
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
          <h2 className="text-3xl font-bold mb-12 text-center">¿Por Qué Elegir GEMA?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📈",
                title: "ROI Comprobado",
                desc: "Reduce costos de mantenimiento y paros no programados con data en tiempo real",
              },
              {
                icon: "🎯",
                title: "Diseñada para la Industria",
                desc: "Construida específicamente para necesidades de gestión de flotas industrial",
              },
              {
                icon: "🔄",
                title: "Procesos Automáticos",
                desc: "Automatiza workflows de mantenimiento y generación de reportes",
              },
              {
                icon: "👥",
                title: "Fácil de Usar",
                desc: "Interfaz intuitiva que no requiere capacitación técnica extensiva",
              },
              {
                icon: "🔐",
                title: "Seguridad Empresarial",
                desc: "Controles de acceso, auditoría completa y protección de datos sensibles",
              },
              {
                icon: "⭐",
                title: "Probado en Producción",
                desc: "Funcionando exitosamente en empresas reales del sector industrial",
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
            ¿Necesitas optimizar la gestión de tu flota?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            GEMA puede transformar tus operaciones industriales. Contacta con nosotros para conocer cómo implementarlo en tu empresa.
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
              alt="Kore-Code logo"
              loading="lazy"
              className="w-15 h-15 object-contain"
            />
          </div>
          <div className="text-left">
            <div className="text-xl font-bold" style={{ color: "#fad643" }}>
              Kore-Code
            </div>
            <div className="text-sm" style={{ color: "#000000" }}>
              DevStudio
            </div>
          </div>
        </div>
        <div>© {new Date().getFullYear()} Kore-Code. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
}
