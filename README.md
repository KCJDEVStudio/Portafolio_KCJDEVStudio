# 🚀 KCJ DevStudio - Portfolio Website

**Portafolio digital profesional de KCJ DevStudio** - Empresa de desarrollo web, aplicaciones y automatizaciones con soluciones digitales a la medida.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js%2B%20Express-green)
![License](https://img.shields.io/badge/License-MIT-orange)

---

## 📋 Tabla de Contenidos

- [🎯 Descripción](#-descripción)
- [🏗️ Arquitectura](#-arquitectura)
- [🛠️ Stack Tecnológico](#-stack-tecnológico)
- [⚡ Instalación](#-instalación)
- [▶️ Ejecución](#-ejecución)
- [📚 Documentación](#-documentación)
- [🔐 Seguridad y Compliance](#-seguridad-y-compliance)
- [📧 Configuración de Email](#-configuración-de-email)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [👥 Equipo](#-equipo)
- [📝 Licencia](#-licencia)

---

## 🎯 Descripción

**KCJ DevStudio Portfolio Website** es una aplicación web moderna y profesional que:

✨ **Presenta servicios** - Muestra los 4 servicios principales:
- Web Profesional para Microempresas
- Aplicaciones Web y Móviles
- Tiendas Online (E-commerce)
- Automatizaciones y Chatbots

📋 **Gestiona contactos** - Formulario de contacto con:
- Validación en cliente (HTML5 + JavaScript)
- Validación en servidor (4 capas de validación)
- Envío automático de emails
- Cumplimiento GDPR/Ley 1581 de 2012

👥 **Presenta equipo** - Sección con perfiles interactivos de miembros

📚 **Políticas legales** - Página completa de privacidad según legislación colombiana

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (React)                   │
│  ┌──────────┬──────────┬──────────────┬────────────┐
│  │ Home.jsx │About.jsx │ Privacy.jsx  │ Router     │
│  └──────────┴──────────┴──────────────┴────────────┘
│         ↓ Fetch JSON POST ↓
├─────────────────────────────────────────────────────┤
│  http://localhost:5000/api/contact                  │
├─────────────────────────────────────────────────────┤
│                 BACKEND (Express)                    │
│  ┌─────────────────────────────────────────────────┐
│  │ POST /api/contact                               │
│  │  ├─ Validación de campos (4 capas)              │
│  │  ├─ Validación privacyConsent (CRÍTICA)         │
│  │  ├─ Procesamiento de datos                      │
│  │  └─ Envío de email                              │
│  └─────────────────────────────────────────────────┘
│         ↓ Nodemailer SMTP Gmail ↓
├─────────────────────────────────────────────────────┤
│            SERVICIO DE EMAIL (Gmail SMTP)           │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2.0** - Framework UI moderna
- **Vite 7.2.4** - Build tool rápido
- **Tailwind CSS 4.1.18** - Estilos utilities-first
- **React Router DOM 7.12.0** - Enrutamiento SPA
- **ESLint** - Análisis estático de código

### Backend
- **Node.js** - Runtime JavaScript
- **Express 4.18.2** - Framework web
- **Nodemailer 6.9.7** - Envío de emails
- **CORS 2.8.5** - Control de origen
- **Dotenv 16.3.1** - Variables de entorno
- **Nodemon** - Auto-reload en desarrollo

### Herramientas de Desarrollo
- **npm** - Gestor de paquetes
- **Git** - Control de versiones

---

## ⚡ Instalación

### Prerequisitos
- **Node.js** 16.x o superior
- **npm** 7.x o superior
- **Git**

### Clonar repositorio

```bash
git clone https://github.com/ZilonZ/Portafolio_KCJDEVStudio.git
cd Portafolio_KCJDEVStudio
```

### Configurar Frontend

```bash
cd frontend
npm install
```

### Configurar Backend

```bash
cd ../backend
npm install

# Crear archivo .env desde el template
cp .env.example .env

# Editar .env con tus valores
# Ver sección "Configuración de Email" abajo
```

---

## ▶️ Ejecución

### Desarrollo (Terminal 1 - Frontend)

```bash
cd frontend
npm run dev
```

**Acceso:** http://localhost:5173

### Desarrollo (Terminal 2 - Backend)

```bash
cd backend
npm run dev
```

**Acceso:** http://localhost:5000
**Health Check:** http://localhost:5000/api/health

### Build para Producción

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

---

## 📚 Documentación

El proyecto incluye documentación profesional y completa en la carpeta `/docs`:

### 📖 Documentos Principales

| Documento | Descripción |
|-----------|------------|
| **[DOCUMENTACION_CODIGO.md](docs/DOCUMENTACION_CODIGO.md)** | Documentación completa de todo el código fuente |
| **[DOCUMENTACION_CODIGO_RESUMEN.md](docs/DOCUMENTACION_CODIGO_RESUMEN.md)** | Resumen ejecutivo de la documentación |
| **[PRUEBA_RAPIDA_5MIN.md](docs/PRUEBA_RAPIDA_5MIN.md)** | Guía rápida para primeros 5 minutos |
| **[GUIA_PRIVACIDAD.md](docs/GUIA_PRIVACIDAD.md)** | Guía de políticas de privacidad |
| **[DIAGRAMA_FLUJO.md](docs/DIAGRAMA_FLUJO.md)** | Diagramas de flujo del sistema |
| **[TESTING_GUIA.md](docs/TESTING_GUIA.md)** | Guía de pruebas |

### 🎓 Niveles de Documentación

Cada archivo del proyecto tiene:

✅ **Encabezado JSDoc** - Propósito y descripción  
✅ **Documentación de Estados** - useState explicados  
✅ **Documentación de Effects** - useEffect y listeners  
✅ **Documentación de Funciones** - Parámetros, retorno, flujo  
✅ **Notas de Seguridad** - GDPR, validaciones, errores  

**Cobertura:** ~6,500 líneas de documentación profesional

---

## 🔐 Seguridad y Compliance

### ✅ GDPR / Ley 1581 de 2012

El proyecto cumple completamente con:

- **Ley 1581 de 2012** - Protección de datos personales (Colombia)
- **Decreto 1377 de 2013** - Reglamentación de protección de datos
- **Principios GDPR** - Aunque el sitio es colombiano

### 🔒 Medidas de Seguridad Implementadas

```
1. VALIDACIÓN CLIENTE
   └─ HTML5 required attributes
   └─ JavaScript validation

2. VALIDACIÓN SERVIDOR (4 CAPAS)
   ├─ Layer 1: privacyConsent CRÍTICO (Ley 1581)
   ├─ Layer 2: Campos requeridos
   ├─ Layer 3: Validación de email (regex)
   └─ Layer 4: Validación de teléfono (dígitos)

3. CONSENTIMIENTO INFORMADO
   └─ Checkbox obligatorio en formulario
   └─ Link a políticas de privacidad
   └─ Backend siempre valida (imposible evadir)

4. ENCRIPTACIÓN
   └─ HTTPS en producción
   └─ Datos de contacto nunca se almacenan
   └─ Solo se envían por email encriptado
```

### 🛡️ ARCO Rights (Derechos del Titular)

Los usuarios pueden ejercer:
- **A** - Acceso a sus datos
- **R** - Rectificación de datos
- **C** - Cancelación de datos
- **O** - Oposición al tratamiento

**Contacto:** kcjdevstudio@gmail.com

---

## 📧 Configuración de Email

### ⚙️ Setup de Gmail App Password

El sistema usa **Nodemailer + Gmail SMTP** para enviar emails.

#### Paso 1: Habilitar verificación en dos pasos

1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. Click en **"Seguridad"** en el menú izquierdo
3. Habilita **"Verificación en dos pasos"**

#### Paso 2: Generar App Password

1. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Selecciona **"Mail"** en el dropdown
3. Selecciona tu dispositivo (Windows/Mac/Linux)
4. Google generará una **contraseña de 16 caracteres**
5. Cópiala

#### Paso 3: Configurar .env

```bash
cd backend
nano .env
```

```dotenv
PORT=5000
GMAIL_USER=tu-email@gmail.com
GMAIL_PASSWORD=pfxojrprzfrtxhea
RECIPIENT_EMAIL=kcjdevstudio@gmail.com
NODE_ENV=development
```

⚠️ **IMPORTANTE:**
- Usar **App Password**, NO la contraseña normal de Gmail
- Nunca hacer push de `.env` a Git
- El archivo `.env` ya está en `.gitignore`

---

## 📁 Estructura del Proyecto

```
Portafolio_KCJDEVStudio/
├── README.md                          # Este archivo
├── frontend/                          # Aplicación React
│   ├── src/
│   │   ├── main.jsx                   # Entry point
│   │   ├── App.jsx                    # Componente raíz
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── router/
│   │   │   └── AppRouter.jsx          # Rutas (/, /about, /privacy)
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Página principal (640 líneas)
│   │   │   ├── Privacy.jsx            # Políticas de privacidad
│   │   │   └── About.jsx              # Página placeholder
│   │   └── assets/
│   │       ├── icons/
│   │       └── image/
│   ├── public/                        # Archivos estáticos
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── README.md
│
├── backend/                           # Servidor Node.js/Express
│   ├── server.js                      # Servidor principal (143 líneas)
│   ├── controllers/
│   │   └── contactController.js       # Lógica de contacto
│   ├── services/
│   │   └── emailService.js            # Servicio de email
│   ├── .env.example                   # Template de variables
│   ├── .env                           # Variables (Git ignored)
│   ├── .gitignore
│   └── package.json
│
├── docs/                              # Documentación completa
│   ├── DOCUMENTACION_CODIGO.md
│   ├── DOCUMENTACION_CODIGO_RESUMEN.md
│   ├── PRUEBA_RAPIDA_5MIN.md
│   ├── GUIA_PRIVACIDAD.md
│   ├── DIAGRAMA_FLUJO.md
│   ├── TESTING_GUIA.md
│   ├── HOJA_REFERENCIA_RAPIDA.md
│   ├── BUENAS_PRACTICAS_LEGALES.md
│   └── [13 documentos más]
│
└── .gitignore                         # Git ignore (raíz)
```

---

## 📝 Secciones del Sitio Web

### 🏠 Home (`/`)
- **Hero Section** - Presentación con CTA
- **About Section** - Información de la empresa
- **Services Section** - 4 servicios ofrecidos
- **Portfolio Section** - Proyectos realizados
- **Team Section** - Perfiles del equipo (modales interactivos)
- **Contact Section** - Formulario con validación
- **Footer** - Links e información legal

### 📋 Privacy (`/privacy`)
- 12 secciones legales completas
- Información sobre tratamiento de datos
- Derechos ARCO explicados
- Contacto para solicitudes
- Cumple Ley 1581 de 2012

### 🤝 About (`/about`)
- Página placeholder para expansión futura
- TODO items para futuro contenido

---

## 🔄 Flujo de Contacto

```
1. Usuario llena formulario
   ├─ Nombre, Email, Teléfono
   ├─ Tipo de Proyecto
   ├─ Mensaje
   └─ Acepta políticas (CRÍTICO)

2. Cliente valida (HTML5 + JS)
   └─ Valida campos requeridos y formato

3. Frontend envía POST a /api/contact
   └─ Body: { name, email, phone, projectType, message, privacyConsent }

4. Backend valida (4 capas)
   ├─ Layer 1: privacyConsent === true (Ley 1581)
   ├─ Layer 2: Todos los campos presentes
   ├─ Layer 3: Email válido (regex)
   └─ Layer 4: Teléfono mín 7 dígitos

5. Generar email HTML profesional
   └─ Información del contacto formateada
   └─ Mensaje con saltos de línea preservados

6. Enviar vía Nodemailer + Gmail SMTP
   └─ De: GMAIL_USER
   └─ Para: RECIPIENT_EMAIL
   └─ Reply-To: email del usuario

7. Respuesta al frontend
   ├─ Éxito (200): Mostrar mensaje de confirmación
   └─ Error (400/500): Mostrar error específico
```

---

## 🧪 Testing

### Prueba Rápida

```bash
# Terminal 1 - Frontend
cd frontend && npm run dev

# Terminal 2 - Backend
cd backend && npm run dev

# Terminal 3 - Test
# 1. Abre http://localhost:5173 en navegador
# 2. Scroll al formulario de contacto
# 3. Llena todos los campos
# 4. Acepta políticas de privacidad
# 5. Clickea "Enviar"
# 6. Revisa tu email (RECIPIENT_EMAIL)
```

### Validaciones para Probar

```javascript
// ✅ Válido
- Nombre: "Juan Pérez"
- Email: "juan@ejemplo.com"
- Teléfono: "3114014791"
- Proyecto: Cualquiera
- Mensaje: "Hola"
- Privacidad: ✓ Marcado

// ❌ Invalida: Sin privacidad
- Privacidad: ☐ Sin marcar
- Respuesta: 400 "Debes aceptar políticas"

// ❌ Invalida: Email incorrecto
- Email: "emailsinarroba"
- Respuesta: 400 "Email no válido"

// ❌ Invalida: Teléfono corto
- Teléfono: "123"
- Respuesta: 400 "Teléfono no válido"
```

---

## 👥 Equipo

**KCJ DevStudio** está compuesto por:

| Nombre | Rol | Especialidad |
|--------|-----|-------------|
| Cristian Morales | Co-founder & Full Stack | Frontend & UX |
| Kevin Rey | Co-founder & Full Stack | Backend & Architecture |
| Jonathan Morales | Co-founder & Full Stack | Design & Visual |

---

## 📞 Contacto

- **Email:** kcjdevstudio@gmail.com
- **Instagram:** [@kcj__dev_studio](https://www.instagram.com/kcj__dev_studio)
- **Ubicación:** Colombia

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver archivo [LICENSE](LICENSE) para detalles.

---

## 🤝 Contribuir

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## ✅ Checklist de Inicio

- [ ] Clonar repositorio
- [ ] Instalar dependencias (frontend + backend)
- [ ] Configurar Gmail App Password
- [ ] Crear archivo `.env` en backend
- [ ] Ejecutar `npm run dev` en ambas carpetas
- [ ] Visitar http://localhost:5173
- [ ] Probar formulario de contacto
- [ ] Revisar email de confirmación

---

## 📚 Recursos Adicionales

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Express.js Documentation](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Nodemailer Guide](https://nodemailer.com)
- [Ley 1581 de 2012](https://www.sic.gov.co/ley-1581-de-2012)

---

## 🐛 Troubleshooting

### Backend no inicia
```bash
# Verificar puerto
lsof -i :5000
# Si está en uso, cambiar PORT en .env

# Verificar variables de entorno
node -e "console.log(process.env)"
```

### Emails no se envían
```bash
# Verificar GMAIL_PASSWORD es App Password, NO contraseña normal
# Verificar 2FA habilitado en Google
# Verificar GMAIL_USER y RECIPIENT_EMAIL son válidos
# Ver logs en terminal backend
```

### CORS error
```
Backend debe estar en http://localhost:5000
Frontend debe estar en http://localhost:5173
Ambos deben estar ejecutando
```

---

## 📊 Estadísticas del Proyecto

- **Líneas de código:** ~1,252
- **Líneas de documentación:** ~6,500
- **Archivos principales:** 10
- **Documentos de guía:** 17
- **Cobertura de documentación:** 165%
- **Estado:** ✅ Production-Ready

---

## 🎉 Gracias

Gracias por usar **KCJ DevStudio Portfolio Website**. 

Para más información, contacta a: **kcjdevstudio@gmail.com**

---

**Última actualización:** 31 de Enero de 2026  
**Versión:** 1.0.0  
**Desarrollado con ❤️ por Cristian Morales(ZilonZ) de KCJ DevStudio**
