/**
 * @file contactController.js - Controlador de mensajes de contacto
 * @description
 * Procesa las solicitudes de contacto del formulario web.
 * Responsabilidades:
 * - Validar datos recibidos del frontend
 * - Validar consentimiento de privacidad (GDPR/Ley 1581 de 2012)
 * - Validar formato de email y teléfono
 * - Enviar email al destinatario configurado
 * - Manejar errores y proporcionar mensajes claros
 */

import { sendEmail } from '../services/emailService.js';

/**
 * sendContactEmail - Procesa un mensaje de contacto
 * 
 * Flujo de validación (ORDEN IMPORTANTE):
 * 1. ✓ privacyConsent es requerido (GDPR/Ley 1581 - CRÍTICO)
 * 2. ✓ Todos los campos requeridos están presentes
 * 3. ✓ Email tiene formato válido
 * 4. ✓ Teléfono tiene mínimo 7 dígitos
 * 5. → Enviar email si todas las validaciones pasan
 * 
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} req.body - Body de la solicitud
 * @param {string} req.body.name - Nombre del contactante (requerido)
 * @param {string} req.body.email - Email del contactante (requerido, debe ser válido)
 * @param {string} req.body.phone - Teléfono del contactante (requerido, mín. 7 dígitos)
 * @param {string} req.body.projectType - Tipo de proyecto seleccionado (requerido)
 * @param {string} req.body.message - Mensaje/descripción (requerido)
 * @param {boolean} req.body.privacyConsent - Consentimiento de privacidad (requerido, CRÍTICO)
 * 
 * @param {Object} res - Objeto de respuesta Express
 * 
 * @returns {JSON} 
 * Casos de éxito (200):
 * {
 *   "success": true,
 *   "message": "Tu mensaje ha sido enviado correctamente. Nos contactaremos pronto."
 * }
 * 
 * Casos de error (400):
 * {
 *   "success": false,
 *   "message": "Descripción del error"
 * }
 * 
 * Casos de error servidor (500):
 * {
 *   "success": false,
 *   "message": "Error al enviar el mensaje. Por favor, intenta más tarde."
 * }
 * 
 * @async
 */
export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, projectType, message } = req.body;

    // ==================== VALIDACIÓN 1: CONSENTIMIENTO DE PRIVACIDAD ====================
    /**
     * CRÍTICO: Validar que el usuario haya aceptado las políticas de privacidad
     * 
     * Razón: Ley 1581 de 2012 (Colombia) y GDPR requieren consentimiento explícito
     * Este campo NO se guarda en base de datos (solo se valida)
     * El frontend DEBE enviar privacyConsent: true
     * 
     * Si falta, es porque:
     * - El checkbox no fue marcado en el formulario
     * - Se intentó evadir validación del frontend
     * 
     * En ambos casos, rechazamos la solicitud
     */
    if (!req.body.privacyConsent) {
      return res.status(400).json({
        success: false,
        message: 'Debes aceptar las políticas de privacidad para continuar'
      });
    }

    // ==================== VALIDACIÓN 2: CAMPOS REQUERIDOS ====================
    /**
     * Verificar que todos los campos obligatorios estén presentes
     * Si falta alguno, devolver error 400
     */
    if (!name || !email || !phone || !projectType || !message) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    // ==================== VALIDACIÓN 3: FORMATO DE EMAIL ====================
    /**
     * Validar que el email tenga un formato válido
     * Regex: usuario@dominio.com
     * 
     * Explicación del regex:
     * ^[^\\s@]+ - Comienza con caracteres que no sean espacio ni @
     * @ - Debe tener exactamente un @
     * [^\\s@]+\\. - Dominio sin espacios ni @, seguido de punto
     * [^\\s@]+ - Extensión (.com, .co, etc.)
     */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'El email no es válido'
      });
    }

    // ==================== VALIDACIÓN 4: FORMATO DE TELÉFONO ====================
    /**
     * Validar que el teléfono tenga mínimo 7 dígitos
     * 
     * Lógica:
     * - Remover todos los caracteres que no sean dígitos (/\D/g)
     * - Verificar que haya al menos 7 dígitos
     * - Permite formatos como: +57-310-123-4567, 310 123 4567, etc.
     */
    if (phone.replace(/\D/g, '').length < 7) {
      return res.status(400).json({
        success: false,
        message: 'El teléfono no es válido'
      });
    }

    // ==================== ENVÍO DE EMAIL ====================
    /**
     * Si todas las validaciones pasan, proceder a enviar el email
     * La función sendEmail en emailService.js maneja:
     * - Configuración del transporte SMTP
     * - Generación del HTML del email
     * - Envío del mensaje
     * - Logging de éxito/error
     */
    await sendEmail({ name, email, phone, projectType, message });

    // ==================== RESPUESTA DE ÉXITO ====================
    return res.status(200).json({
      success: true,
      message: 'Tu mensaje ha sido enviado correctamente. Nos contactaremos pronto.'
    });

  } catch (error) {
    // ==================== MANEJO DE ERRORES ====================
    /**
     * Si ocurre algún error durante el proceso:
     * - Loguear el error en consola (útil para debugging)
     * - NO exponer detalles del error al cliente (seguridad)
     * - Responder con mensaje genérico y código 500
     */
    console.error('Error en contactController:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al enviar el mensaje. Por favor, intenta más tarde.'
    });
  }
};