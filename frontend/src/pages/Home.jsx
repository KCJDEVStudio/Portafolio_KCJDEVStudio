import { useEffect, useState } from "react";

export default function Home() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white text-gray-900">

      {/* HEADER */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          atTop
            ? "bg-black"
            : "bg-black/30 backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <img
            src="/logo_horizontal.png"
            alt="KCJ DevStudio"
            className="h-50 w-auto object-contain"
          />

          {/* Navigation */}
          <nav className="space-x-6 text-sm font-medium text-white">
            <a href="#about" className="hover:text-[#5af388] transition">Nosotros</a>
            <a href="#services" className="hover:text-[#5af388] transition">Servicios</a>
            <a href="#portfolio" className="hover:text-[#5af388] transition">Portafolio</a>
            <a href="#contact" className="hover:text-[#5af388] transition">Contacto</a>
          </nav>

        </div>
      </header>

      {/* ESPACIO PARA HEADER FIXED */}
      <div className="h-20" />

      {/* HERO */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Soluciones digitales <span className="text-[#5af388]">a la medida</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Desarrollamos páginas web, aplicaciones y sistemas modernos para personas, emprendedores y empresas que quieren crecer digitalmente.
          </p>
          <a
            href="#contact"
            className="inline-block bg-[#5af388] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#fce38a] transition"
          >
            Iniciar proyecto
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-10">
            <h3 className="text-3xl font-bold mb-4">Sobre nosotros</h3>
            <p className="text-gray-700 leading-relaxed">
              En KCJ DevStudio desarrollamos soluciones de programación a la medida,
              funcionales, modernas y seguras. Trabajamos con tecnologías actuales
              para garantizar rendimiento, escalabilidad y una excelente experiencia
              de usuario, manteniendo siempre un trato cercano y comunicación clara.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">¿Qué hacemos?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Páginas web profesionales",
                desc: "Soluciones personalizadas enfocadas en crecimiento, eficiencia y escalabilidad."
              },
              {
                title: "Aplicaciones web y móviles",
                desc: "Desarrollos responsivos y de alto rendimiento."
              },
              {
                title: "Tiendas online",
                desc: "E-commerce optimizado para conversión."
              },
              {
                title: "Automatizaciones y sistemas",
                desc: "Integraciones y sistemas a la medida para automatizar procesos."
              }
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h4 className="font-semibold text-lg mb-2">{service.title}</h4>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-10">Portafolio</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-xl shadow p-6 h-48 flex items-center justify-center"
              >
                <span className="text-gray-600">Proyecto {n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Nuestro equipo</h3>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-center">
            {["Cristian Morales", "Kevin Rey", "Jonathan Morales"].map((name) => (
              <div key={name} className="bg-white p-6 rounded-xl w-64 shadow">
                <div className="w-20 h-20 bg-[#5af388] rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold">{name}</h4>
                <p className="text-sm text-gray-600">Co-fundador / Developer</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">¿Listo para tu proyecto?</h3>
          <p className="text-gray-700 mb-8">
            Escríbenos y hagamos realidad tu idea digital.
          </p>
          <a
            href="mailto:contacto@kcj.dev"
            className="inline-block bg-[#5af388] text-black px-10 py-3 rounded-full font-semibold hover:bg-[#fce38a] transition"
          >
            Contactar
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-600 border-t">
        © {new Date().getFullYear()} KCJ DevStudio. Todos los derechos reservados.
      </footer>
    </div>
  );
}
