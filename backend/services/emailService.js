/**
 * @file emailService.js - Servicio de envío de correos electrónicos
 * @description
 * Maneja la configuración y envío de emails usando Nodemailer
 * Genera emails HTML formateados con información del contactante
 * Responsabilidades:
 * - Configurar transporte SMTP de Gmail
 * - Mapear tipos de proyecto a descripciones
 * - Generar HTML profesional del email
 * - Enviar email al destinatario configurado
 * - Registrar éxito/errores en logs
 */

import nodemailer from 'nodemailer';

/**
 * Mapeo de tipos de proyecto
 * Convierte valores cortos del formulario a descripciones completas
 * Usado en el cuerpo del email para que sea legible para el destinatario
 */
const projectTypeMap = {
  'Web': 'Web Profesional para Microempresas',
  'App': 'Aplicaciones Web y Móviles',
  'Ecommerce': 'Tiendas Online',
  'Automatizacion': 'Automatizaciones y Chatbots',
  'Otro': 'Otro'
};

/**
 * sendEmail - Envía un email de contacto
 * 
 * Flujo:
 * 1. Extraer datos del contactante
 * 2. Crear transporte SMTP de Gmail
 * 3. Generar contenido HTML del email
 * 4. Enviar email con nodemailer
 * 5. Registrar resultado en logs
 * 
 * @param {Object} contactData - Datos del formulario de contacto
 * @param {string} contactData.name - Nombre del contactante
 * @param {string} contactData.email - Email del contactante (para reply-to)
 * @param {string} contactData.phone - Teléfono del contactante
 * @param {string} contactData.projectType - Tipo de proyecto (clave del mapeo)
 * @param {string} contactData.message - Mensaje/descripción del proyecto
 * 
 * @returns {Promise<void>} Lanza excepción si falla el envío
 * 
 * @throws {Error} Si falla la configuración SMTP o el envío del email
 * 
 * Variables de entorno requeridas:
 * - GMAIL_USER: Email de Gmail (ej: tu-email@gmail.com)
 * - GMAIL_PASSWORD: App password de Gmail (NO contraseña normal)
 * - RECIPIENT_EMAIL: Email destino (ej: kcjdevstudio@gmail.com)
 * 
 * IMPORTANTE - Gmail App Password:
 * En gmail.com:
 * 1. Habilitar 2FA
 * 2. Ir a myaccount.google.com/apppasswords
 * 3. Generar App Password para "Mail"
 * 4. Usar esa contraseña en GMAIL_PASSWORD
 * 
 * @async
 */
export const sendEmail = async (contactData) => {
  const { name, email, phone, projectType, message } = contactData;

  /**
   * Crear transporte SMTP para Gmail
   * 
   * Configuración:
   * - service: 'gmail' - Usa servidores de Google
   * - auth.user: Email desde el cual se envían los emails
   * - auth.pass: App Password (NO contraseña de Gmail)
   * 
   * Se carga aquí (no en el módulo) para que las variables de entorno
   * se carguen correctamente en cada solicitud
   */
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  /**
   * Generar contenido HTML del email
   * 
   * Estructura:
   * - Header con información del contacto
   * - Panel principal con datos
   * - Mensaje del contactante
   * - Footer con información legal
   * - Botón de respuesta rápida
   * 
   * Estilos inline para compatibilidad máxima con clientes de email
   */
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px;">
      <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        
        <h2 style="color: #1b3012; margin-bottom: 30px; border-bottom: 3px solid #5af388; padding-bottom: 15px;">
          🎉 Nuevo contacto desde KCJ DevStudio
        </h2>

        <div style="margin-bottom: 20px;">
          <h3 style="color: #333; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; color: #666;">Información del contacto</h3>
          
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #5af388; margin-bottom: 15px;">
            <p style="margin: 8px 0;"><strong>Nombre:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Teléfono:</strong> ${phone}</p>
            <p style="margin: 8px 0;"><strong>Tipo de proyecto:</strong> ${projectTypeMap[projectType] || projectType}</p>
          </div>

          <h3 style="color: #333; margin: 20px 0 10px 0; font-size: 14px; text-transform: uppercase; color: #666;">Mensaje</h3>
          <div style="background: #fafafa; padding: 15px; border-radius: 5px; border-left: 4px solid #5af388; line-height: 1.6; color: #333;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
          <p style="margin: 0;">Este mensaje fue enviado desde el formulario de contacto de KCJ DevStudio</p>
          <p style="margin: 5px 0 0 0;">Fecha: ${new Date().toLocaleString('es-CO')}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="mailto:${email}" style="display: inline-block; background: #5af388; color: black; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Responder
          </a>
        </div>
      </div>

      <div style="text-align: center; margin-top: 20px; font-size: 11px; color: #999;">
        <p>© 2026 KCJ DevStudio. Todos los derechos reservados.</p>
      </div>
    </div>
  `;

  try {
    /**
     * Enviar el email
     * 
     * Parámetros:
     * - from: Remitente (name + address)
     * - to: Destinatario (configurado en .env)
     * - replyTo: Email del contactante (para responder directamente)
     * - subject: Asunto del email
     * - html: Contenido HTML del email
     */
    await transporter.sendMail({
      from: `"KCJ DevStudio" <${process.env.GMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: 'Nuevo contacto desde KCJ DevStudio',
      html: htmlContent
    });

    // Log de éxito (útil para monitoring y debugging)
    console.log(`✅ Email enviado desde: ${email}`);
  } catch (error) {
    // Log de error detallado
    console.error('❌ Error al enviar email:', error);
    // Re-lanzar el error para que sea capturado en el controlador
    throw error;
  }
};