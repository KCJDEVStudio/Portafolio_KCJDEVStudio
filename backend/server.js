/**
 * @file server.js - Servidor Express principal de KCJ DevStudio
 * @description
 * Servidor backend que proporciona la API para la aplicación frontend.
 * Responsabilidades principales:
 * - Configurar Express con middlewares necesarios
 * - Manejar solicitudes POST de contacto
 * - Validar y procesar datos del formulario
 * - Enviar correos electrónicos
 * - Manejo global de errores
 * - Validación de privacidad (GDPR/Ley 1581)
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { sendContactEmail } from './controllers/contactController.js';

/**
 * Cargar variables de entorno desde .env
 * Variables esperadas:
 * - PORT: Puerto donde corre el servidor (default: 5000)
 * - GMAIL_USER: Email de Gmail para enviar correos
 * - GMAIL_PASSWORD: App password de Gmail
 * - RECIPIENT_EMAIL: Email destino de los mensajes de contacto
 * - NODE_ENV: environment (development | production)
 */
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== SEGURIDAD ====================

/**
 * Helmet Middleware - Seguridad HTTP
 * Configura headers HTTP seguros para proteger contra vulnerabilidades comunes:
 * - X-Frame-Options: Previene clickjacking
 * - X-Content-Type-Options: Previene MIME sniffing
 * - X-XSS-Protection: Protección XSS en navegadores antiguos
 * - Strict-Transport-Security: Obliga HTTPS en producción
 * - Content-Security-Policy: Restringe recursos permitidos
 */
app.use(helmet());

/**
 * Rate Limiting Middleware
 * Limita el número de solicitudes por IP para prevenir abuse/DDoS
 * Configuración para /api/contact:
 * - 5 solicitudes por 15 minutos por IP
 * - Mensaje de error personalizado
 */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 solicitudes máximo
  message: 'Demasiadas solicitudes desde esta IP. Intenta más tarde.',
  standardHeaders: true, // Retorna info del rate limit en `RateLimit-*` headers
  legacyHeaders: false, // Desactiva los `X-RateLimit-*` headers
  skip: (req) => {
    // En desarrollo, permitir más solicitudes
    return process.env.NODE_ENV === 'development';
  }
});

// ==================== MIDDLEWARES ====================

/**
 * CORS (Cross-Origin Resource Sharing) Middleware
 * 
 * Permite que el frontend acceda a este servidor
 * En desarrollo: Permite todas las origins
 * En producción: Debe restringirse al dominio específico
 * 
 * Para producción, reemplazar con:
 * app.use(cors({
 *   origin: process.env.FRONTEND_URL || 'https://tudominio.com',
 *   credentials: true
 * }));
 */
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

/**
 * JSON Parser Middleware
 * Convierte el cuerpo de las solicitudes de JSON a objetos JavaScript
 * Necesario para procesar payloads POST del formulario
 */
app.use(express.json());

/**
 * URL-encoded Parser Middleware
 * Maneja datos codificados en URL (form-data)
 * extended: true permite parsear datos complejos
 */
app.use(express.urlencoded({ extended: true }));

// ==================== RUTAS ====================

/**
 * POST /api/contact
 * Endpoint principal para procesar mensajes de contacto del formulario
 * 
 * Flujo de la solicitud:
 * 1. Frontend envía POST con datos del formulario
 * 2. Middleware JSON parser convierte el cuerpo
 * 3. contactController.sendContactEmail procesa la solicitud:
 *    a. Valida privacyConsent (requerido por GDPR/Ley 1581)
 *    b. Valida todos los campos requeridos
 *    c. Valida formato de email
 *    d. Valida formato de teléfono
 *    e. Envía email HTML formateado
 *    f. Responde al cliente con estado
 * 
 * Body esperado:
 * {
 *   "name": "Nombre Usuario",
 *   "email": "usuario@ejemplo.com",
 *   "phone": "3101234567",
 *   "projectType": "Web",
 *   "message": "Mensaje del usuario",
 *   "privacyConsent": true  ← CRÍTICO: Backend SIEMPRE valida esto
 * }
 * 
 * Respuestas posibles:
 * - 200 OK: Mensaje enviado exitosamente
 * - 400 Bad Request: Campos inválidos o privacyConsent faltante
 * - 500 Internal Server Error: Error al enviar email o error del servidor
 * 
 * Rate Limiting: 5 solicitudes por 15 minutos (desactivado en desarrollo)
 */
app.post('/api/contact', contactLimiter, sendContactEmail);

/**
 * GET /api/health
 * Endpoint de verificación del estado del servidor
 * Útil para comprobar que el backend está corriendo
 * Usado por: DevOps, monitoring, checklists de desarrollo
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// ==================== MANEJO GLOBAL DE ERRORES ====================

/**
 * Error Handling Middleware
 * 
 * Captura errores que no fueron manejados en otras rutas
 * Estructura: (err, req, res, next) - 4 parámetros indica middleware de error
 * 
 * Características:
 * - Loguea el error en consola para debugging
 * - No expone detalles del error en producción (seguridad)
 * - En desarrollo, expone el mensaje de error
 * - Responde con JSON en lugar de HTML
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    // En desarrollo, mostrar el error. En producción, solo mensaje genérico
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ==================== INICIO DEL SERVIDOR ====================

/**
 * Inicia el servidor Express en el puerto especificado
 * Loguea información útil para debugging y verificación
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Emails will be sent to: ${process.env.RECIPIENT_EMAIL}`);
});