# 🧪 INSTRUCCIONES DE PRUEBA - PROYECTO GEMA

## Verificación de Implementación

Sigue estos pasos para verificar que todo está correctamente implementado:

---

## ✅ PASO 1: Verificar que la Página Existe

**Ubicación esperada del archivo:**
```
frontend/src/pages/Gema.jsx
```

**Contenido esperado:**
- [ ] Importa `useEffect` y `useState` de React
- [ ] Importa imagen de GEMA: `gemaImg from "../assets/image/Ejemplo Gema.png"`
- [ ] Exporta función por defecto: `export default function Gema()`
- [ ] Contiene secciones: Hero, Descripción, Beneficios, Funcionalidades, Tecnologías, Caso de Uso, Información, Características, CTA, Footer

---

## ✅ PASO 2: Verificar que el Router Está Actualizado

**Ubicación esperada:**
```
frontend/src/router/AppRouter.jsx
```

**Verificar que contiene:**
```javascript
// Línea 19 (aproximadamente):
import Gema from "../pages/Gema";

// Línea 47 (aproximadamente):
<Route path="/project/gema" element={<Gema />} />
```

---

## ✅ PASO 3: Verificar que Home.jsx Está Actualizado

**Ubicación esperada:**
```
frontend/src/pages/Home.jsx
```

**Línea 885 (aproximadamente) debe contener:**
```javascript
href="/project/gema"
```

**En lugar de:**
```javascript
href="https://gema-co.site/"
target="_blank"
rel="noopener noreferrer"
```

---

## 🚀 PASO 4: Pruebas en el Navegador

### Prueba 1: Acceso Directo a la Ruta
1. En el navegador, ve a: `http://localhost:5173/project/gema` (ajusta el puerto según tu configuración)
2. **Resultado esperado:** Se carga la página de GEMA completa

### Prueba 2: Navegación desde el Portafolio
1. Ve a la página principal: `http://localhost:5173/`
2. Desplázate hasta la sección "Portafolio"
3. Haz clic en la tarjeta de GEMA
4. **Resultado esperado:** Se navega a `/project/gema` (sin abrir nueva pestaña)

### Prueba 3: Navegación de Regreso
1. Desde la página de GEMA (`/project/gema`)
2. Haz clic en el logo de KCJ DevStudio en el header
3. **Resultado esperado:** Regresa a la página principal (`/`)

### Prueba 4: Menú Móvil (Responsive)
1. En la página de GEMA, redimensiona el navegador a tamaño móvil (<768px)
2. Haz clic en el botón hamburguesa
3. **Resultado esperado:** Se muestra menú móvil con opción "Volver al Portafolio"
4. Haz clic en "Volver al Portafolio"
5. **Resultado esperado:** Se navega a `/#portfolio`

### Prueba 5: CTA (Botón de Contacto)
1. Desde la página de GEMA, desplázate hasta la sección "¿Necesitas optimizar la gestión de tu flota?"
2. Haz clic en el botón "Solicitar Información"
3. **Resultado esperado:** Se navega a `/#contact` en la página principal

---

## 📱 Pruebas de Diseño Responsive

### Desktop (>= 1024px)
- [ ] Header muestra navegación normal (no hamburguesa)
- [ ] Contenido se distribuye en 2-3 columnas según sección
- [ ] Logo de GEMA se ve en tamaño grande (md:w-48 md:h-48)
- [ ] Tablas y grillas se visualizan correctamente

### Tablet (768px - 1023px)
- [ ] Header muestra navegación normal
- [ ] Contenido se distribuye en 2 columnas donde sea aplicable
- [ ] Logo de GEMA tamaño mediano
- [ ] Todo es legible sin scroll horizontal

### Móvil (< 768px)
- [ ] Header muestra botón hamburguesa (no navegación)
- [ ] Contenido en 1 columna
- [ ] Logo de GEMA tamaño pequeño (w-32 h-32)
- [ ] Textos ajustados correctamente
- [ ] Menú móvil funciona correctamente

---

## 🎨 Pruebas de Diseño Visual

### Colores
- [ ] Verde de marca (#5af388) en botones y acentos
- [ ] Fondo oscuro (#1b3012) en hero sections
- [ ] Texto blanco en secciones oscuras
- [ ] Transiciones suaves al pasar el mouse

### Tipografía
- [ ] Títulos: fuerte, legibles
- [ ] Párrafos: tamaño legible, espaciado adecuado
- [ ] Descripciones cortas: texto más pequeño pero legible

### Espaciado
- [ ] Padding consistente en tarjetas
- [ ] Márgenes equilibrados entre secciones
- [ ] No hay contenido "apretado"

---

## 🔗 Pruebas de Enlaces

### Enlaces Internos
- [ ] Header Logo → `/` (funciona)
- [ ] "Volver al Portafolio" (mobile) → `/#portfolio` (funciona)
- [ ] "Solicitar Información" (CTA) → `/#contact` (funciona)

### Enlaces Externos
- [ ] "Conocer Servimacons" → `https://www.servimacons.com/` (abre en nueva pestaña)

---

## 📊 Pruebas de Contenido

### Secciones Presentes
- [ ] Hero con logo, título y subtítulo
- [ ] ¿Qué es GEMA?
- [ ] ¿Para Qué Sirve? (4 tarjetas)
- [ ] Funcionalidades Principales (8 items)
- [ ] Tecnologías Utilizadas (6 items)
- [ ] Caso de Uso: Servimacons
- [ ] Información del Proyecto (6 datos)
- [ ] ¿Por Qué Elegir GEMA? (6 características)
- [ ] CTA Final
- [ ] Footer

### Contenido de Texto
- [ ] No hay placeholders (ej: "Lorem ipsum")
- [ ] Textos profesionales y claros
- [ ] Sin errores ortográficos
- [ ] Consistencia con página de Natbot

---

## 🐛 Posibles Errores a Verificar

Si experimentas problemas, verifica:

### Problema: "Página no encontrada" en `/project/gema`
- [ ] ¿Está el archivo `Gema.jsx` en `frontend/src/pages/`?
- [ ] ¿AppRouter.jsx importa correctamente `import Gema from "../pages/Gema"`?
- [ ] ¿La ruta está definida: `<Route path="/project/gema" element={<Gema />} />`?

### Problema: "Gema is not defined" en la consola
- [ ] Verifica que la importación en AppRouter.jsx es correcta
- [ ] Asegúrate de que `Gema.jsx` exporta por defecto: `export default function Gema()`

### Problema: Imagen de GEMA no se carga
- [ ] ¿El archivo existe en `frontend/src/assets/image/Ejemplo Gema.png`?
- [ ] ¿La importación es correcta: `import gemaImg from "../assets/image/Ejemplo Gema.png"`?
- [ ] ¿Se usa correctamente en JSX: `<img src={gemaImg} ...`?

### Problema: Estilos no se aplican
- [ ] ¿El archivo usa clases de Tailwind CSS válidas?
- [ ] ¿Tailwind CSS está correctamente configurado en el proyecto?
- [ ] Intenta recompiler: `npm run dev`

### Problema: Menú hamburguesa no funciona
- [ ] Verifica que `mobileMenuOpen` state se inicializa en `useState(false)`
- [ ] Verifica que el botón cambia el estado: `onClick={() => setMobileMenuOpen(!mobileMenuOpen)}`

---

## ✅ Checklist Final

Después de completar todas las pruebas, marca estos items:

- [ ] Página `/project/gema` carga exitosamente
- [ ] Navegación desde portafolio funciona
- [ ] Regreso a inicio funciona
- [ ] Diseño responsive en móvil, tablet y desktop
- [ ] Todos los enlaces internos funcionan
- [ ] Enlaces externos abren en nueva pestaña
- [ ] CTA lleva al formulario de contacto
- [ ] No hay errores en la consola del navegador
- [ ] Contenido se visualiza correctamente
- [ ] Colores y estilos son consistentes con Natbot

---

## 📋 Notas Adicionales

- **Navegador recomendado para pruebas:** Chrome, Firefox, Edge (versiones recientes)
- **Puerto por defecto:** 5173 (Vite)
- **Variable de entorno:** Asegúrate de que `VITE_API_BASE` está correctamente configurada
- **Hot Reload:** Si haces cambios, el navegador debería actualizar automáticamente

---

## 🎯 Próximas Acciones (Opcional)

Después de verificar que todo funciona:

1. **SEO:** Agregar meta tags en Gema.jsx (título, descripción)
2. **Analytics:** Implementar tracking de clics
3. **Performance:** Optimizar tamaño de imagen
4. **A/B Testing:** Medir conversión desde tarjeta de portafolio
5. **Feedback:** Recopilar comentarios de usuarios

---

**Fecha:** 1 de Febrero de 2026  
**Versión:** 1.0  
**Estado:** Listo para pruebas ✅
