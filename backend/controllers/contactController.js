import { sendEmail } from '../services/emailService.js';

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, projectType, message } = req.body;

    // Validar que el consentimiento de privacidad esté presente
    if (!req.body.privacyConsent) {
      return res.status(400).json({
        success: false,
        message: 'Debes aceptar las políticas de privacidad para continuar'
      });
    }

    if (!name || !email || !phone || !projectType || !message) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'El email no es válido'
      });
    }

    if (phone.replace(/\D/g, '').length < 7) {
      return res.status(400).json({
        success: false,
        message: 'El teléfono no es válido'
      });
    }

    await sendEmail({ name, email, phone, projectType, message });

    return res.status(200).json({
      success: true,
      message: 'Tu mensaje ha sido enviado correctamente. Nos contactaremos pronto.'
    });

  } catch (error) {
    console.error('Error en contactController:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al enviar el mensaje. Por favor, intenta más tarde.'
    });
  }
};