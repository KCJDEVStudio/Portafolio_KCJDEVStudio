# TESTING - GUÍA PRÁCTICA DE PRUEBAS

Este documento te muestra exactamente cómo probar que TODO funciona correctamente.

---

## 🧪 PRUEBAS MANUALES CON POSTMAN o cURL

### Ubicación del Endpoint
```
Método: POST
URL: http://localhost:5000/api/contact
Headers: Content-Type: application/json
```

### ✅ TEST 1: Solicitud CORRECTA (debe funcionar)

**Request:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+57 312 3456789",
  "projectType": "Web",
  "message": "Hola, me gustaría consultar sobre una web profesional",
  "privacyConsent": true
}
```

**Respuesta Esperada:**
```
Status: 200 OK
Body:
{
  "success": true,
  "message": "Tu mensaje ha sido enviado correctamente. Nos contactaremos pronto."
}
```

**Lado Backend:**
- Email enviado a `kcjdevstudio@gmail.com`
- Log muestra: `Contacto enviado por: Juan Pérez`

---

### ❌ TEST 2: Sin Consentimiento de Privacidad (debe fallar)

**Request:**
```json
{
  "name": "María García",
  "email": "maria@example.com",
  "phone": "+57 312 9876543",
  "projectType": "App",
  "message": "Interesada en una aplicación web",
  "privacyConsent": false
}
```

**Respuesta Esperada:**
```
Status: 400 Bad Request
Body:
{
  "success": false,
  "message": "Debes aceptar las políticas de privacidad para continuar"
}
```

**Verificación:**
- No se envía email
- El usuario ve mensaje de error en rojo

---

### ❌ TEST 3: Sin incluir privacyConsent (debe fallar)

**Request:**
```json
{
  "name": "Carlos López",
  "email": "carlos@example.com",
  "phone": "+57 312 5555555",
  "projectType": "Ecommerce",
  "message": "Necesito una tienda online"
}
```

**Respuesta Esperada:**
```
Status: 400 Bad Request
Body:
{
  "success": false,
  "message": "Debes aceptar las políticas de privacidad para continuar"
}
```

---

### ❌ TEST 4: Campos Requeridos Faltantes

**Request (sin "message"):**
```json
{
  "name": "Ana Smith",
  "email": "ana@example.com",
  "phone": "+57 312 1111111",
  "projectType": "Automatizacion",
  "privacyConsent": true
}
```

**Respuesta Esperada:**
```
Status: 400 Bad Request
Body:
{
  "success": false,
  "message": "Todos los campos son requeridos"
}
```

---

### ❌ TEST 5: Email Inválido

**Request:**
```json
{
  "name": "Pedro Martínez",
  "email": "email-invalido",
  "phone": "+57 312 2222222",
  "projectType": "Web",
  "message": "Test",
  "privacyConsent": true
}
```

**Respuesta Esperada:**
```
Status: 400 Bad Request
Body:
{
  "success": false,
  "message": "El email no es válido"
}
```

---

### ❌ TEST 6: Teléfono Muy Corto

**Request:**
```json
{
  "name": "Laura González",
  "email": "laura@example.com",
  "phone": "123",
  "projectType": "App",
  "message": "Consulta sobre aplicación",
  "privacyConsent": true
}
```

**Respuesta Esperada:**
```
Status: 400 Bad Request
Body:
{
  "success": false,
  "message": "El teléfono no es válido"
}
```

---

## 🖥️ PRUEBAS EN NAVEGADOR (Frontend)

### TEST 7: Verificar que la página de Privacidad carga

**Pasos:**
1. Abre `http://localhost:5173/privacy`
2. Verifica que carga sin errores
3. Lee el contenido
4. Verifica que tiene botones "Volver al Inicio" y "Contactar"
5. Haz clic en los botones para verificar navegación

**Checklist:**
- [ ] Página carga sin errores
- [ ] Contiene 12 secciones
- [ ] Botones funcionan
- [ ] Diseño es responsive en mobile
- [ ] Colores y logo de la marca son correctos

---

### TEST 8: Hacer clic en link desde el formulario

**Pasos:**
1. Abre `http://localhost:5173`
2. Desplázate a "¿Listo para tu proyecto?"
3. Haz clic en el link "políticas de privacidad" en el checkbox
4. Debe abrir en NUEVA PESTAÑA

**Verificación:**
- [ ] Se abre en nueva pestaña (target="_blank")
- [ ] URL es `/privacy`
- [ ] Contenido se carga correctamente
- [ ] Puedes volver a la pestaña anterior sin problemas

---

### TEST 9: Enviar formulario SIN marcar checkbox

**Pasos:**
1. En el formulario de contacto, completa TODOS los campos EXCEPTO el checkbox
2. Haz clic en "Enviar"

**Validación HTML:**
- [ ] El navegador muestra popup diciendo "Please check this box"
- O si lo hizo a través de código:
- [ ] Muestra mensaje de error rojo: "Debes aceptar las políticas de privacidad"

**Verificación:**
- No se envía solicitud POST
- No se ve "Enviando..." 
- No se recibe email

---

### TEST 10: Enviar formulario CON checkbox marcado

**Pasos:**
1. Completa todos los campos:
   - Nombre: "Tu Nombre"
   - Email: "tu.email@example.com"
   - Teléfono: "+57 312 3456789"
   - Tipo de proyecto: Selecciona cualquiera
   - Mensaje: "Esto es un test"
2. Marca el checkbox ✓
3. Haz clic en "Enviar"

**Verificación:**
- [ ] El botón cambia a "Enviando..."
- [ ] Los campos se deshabilitan (greyed out)
- [ ] Aparece mensaje verde con "Mensaje enviado exitosamente"
- [ ] El formulario se vacía (reset)
- [ ] Se recibe email en `kcjdevstudio@gmail.com`

---

### TEST 11: Validación de Email en Frontend

**Pasos:**
1. En el formulario, marca el checkbox ✓
2. Ingresa un email inválido: "aaa@aaa"
3. Haz clic en "Enviar"

**Verificación:**
- [ ] Muestra error: "El email no es válido"
- No se envía solicitud
- No se recibe email

---

### TEST 12: Validación de Teléfono en Frontend

**Pasos:**
1. Marca el checkbox ✓
2. Ingresa teléfono muy corto: "123"
3. Haz clic en "Enviar"

**Verificación:**
- [ ] Muestra error: "El teléfono no es válido"

---

## 🔄 FLUJO COMPLETO DE PRINCIPIO A FIN

### Escenario: Usuario nuevo que desea información

**Paso 1: Usuario abre el sitio**
```
1. Abre http://localhost:5173
2. Ve la página principal
3. Lee sobre los servicios
```

**Paso 2: Usuario hace clic en "Iniciar proyecto"**
```
1. Se desplaza a la sección de contacto
2. Ve el formulario con el checkbox de privacidad
```

**Paso 3: Usuario lee las políticas (IMPORTANTE)**
```
1. Haz clic en "políticas de privacidad"
2. Se abre en nueva pestaña
3. Lee el contenido (verifica que sea comprensible)
4. Vuelve a la pestaña del formulario
```

**Paso 4: Usuario completa el formulario**
```
Nombre:        "Carolina Ruiz"
Email:         "carolina@empresa.co"
Teléfono:      "+57 312 3456789"
Tipo Proyecto: "Web Profesional para Microempresas"
Mensaje:       "Hola, me gustaría una web profesional para mi negocio"
Checkbox:      Marca ✓
```

**Paso 5: Usuario hace clic en Enviar**
```
Frontend:
1. Valida consentimiento ✓
2. Prepara payload JSON con privacyConsent: true
3. Envía POST a http://localhost:5000/api/contact
4. Muestra "Enviando..."
5. Campos deshabilitados

Backend:
1. Recibe solicitud
2. Valida privacyConsent === true ✓
3. Valida campos requeridos ✓
4. Valida formato de email ✓
5. Valida formato de teléfono ✓
6. Llama a sendEmail()
7. Envía email a kcjdevstudio@gmail.com
8. Responde con status 200

Frontend:
1. Recibe respuesta exitosa
2. Muestra mensaje verde
3. Vacía el formulario
4. Habilita campos nuevamente
```

**Paso 6: Verificación final**
```
1. Abre tu email
2. Busca en bandeja de entrada o spam
3. Encontraste el email de "Carolina Ruiz"
4. El email contiene todos los datos correctamente
5. Se puede responder al usuario
```

---

## 📊 TABLA DE RESULTADOS ESPERADOS

| Test | Acción | Esperado | Estado |
|------|--------|----------|--------|
| 1 | Con privacyConsent: true | Status 200, Email enviado | ✅ |
| 2 | Con privacyConsent: false | Status 400, No email | ✅ |
| 3 | Sin privacyConsent | Status 400, No email | ✅ |
| 4 | Sin campo requerido | Status 400 | ✅ |
| 5 | Email inválido | Status 400 | ✅ |
| 6 | Teléfono muy corto | Status 400 | ✅ |
| 7 | Página /privacy | Carga sin errores | ✅ |
| 8 | Link en formulario | Abre en nueva pestaña | ✅ |
| 9 | Enviar sin checkbox | No envía | ✅ |
| 10 | Enviar con checkbox | Envía exitosamente | ✅ |
| 11 | Email inválido + envío | Muestra error | ✅ |
| 12 | Teléfono corto + envío | Muestra error | ✅ |

---

## 🐛 DEBUGGING: Si algo no funciona

### Problema: Página /privacy no carga
**Solución:**
```bash
# Verifica que Privacy.jsx esté en frontend/src/pages/
# Verifica que AppRouter.jsx tenga:
<Route path="/privacy" element={<Privacy />} />

# En navegador, abre:
http://localhost:5173/privacy
```

### Problema: Link "políticas de privacidad" no abre
**Solución:**
```jsx
// Verifica que el link tenga:
<a href="/privacy" target="_blank" rel="noopener noreferrer">
```

### Problema: Formulario envía aunque NO marque checkbox
**Solución:**
```jsx
// Verifica el handleContactFormSubmit envíe:
privacyConsent: formData.get('privacy') === 'on'
```

### Problema: Backend no valida consentimiento
**Solución:**
```javascript
// Verifica que contactController.js tenga:
if (!req.body.privacyConsent) {
  return res.status(400).json({
    success: false,
    message: 'Debes aceptar las políticas de privacidad para continuar'
  });
}
```

### Problema: No recibo emails
**Solución:**
1. Verifica que backend esté corriendo: `npm run dev`
2. Verifica que no haya errores en consola del backend
3. Verifica credenciales en .env son correctas
4. Revisa bandeja de spam del email
5. Verifica que hayas marcado el checkbox

### Problema: Email muestra datos cortados
**Solución:**
```javascript
// En emailService.js, verifica que el template HTML sea correcto
// Busca en backend/services/emailService.js línea con HTML
```

---

## ✨ CHECKLIST FINAL ANTES DE PRODUCCIÓN

Antes de publicar tu sitio, ejecuta TODOS estos tests:

- [ ] Backend inicia sin errores: `npm run dev`
- [ ] Frontend inicia sin errores: `npm run dev`
- [ ] Puedo acceder a http://localhost:5173
- [ ] Test 1: Con consentimiento ✓ PASA
- [ ] Test 2: Sin consentimiento ✓ PASA
- [ ] Test 7: Página /privacy carga ✓ PASA
- [ ] Test 8: Link abre en nueva pestaña ✓ PASA
- [ ] Test 10: Flujo completo funciona ✓ PASA
- [ ] Recibo email con todos los datos
- [ ] No hay errores en consola del navegador
- [ ] No hay errores en logs del backend
- [ ] Página se ve bien en mobile
- [ ] Checkbox es requerido y no viene marcado

---

## 🎯 COMMANDS ÚTILES PARA TESTING

### Ver logs del backend en tiempo real
```bash
cd backend
npm run dev
```

### Ver logs del frontend
Abre DevTools (F12) → Consola

### Test rápido con cURL (sin frontend)
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+57 312 1234567",
    "projectType": "Web",
    "message": "Test message",
    "privacyConsent": true
  }'
```

### Limpiar caché del navegador
```
F12 → Application → Storage → Clear All
```

---

## 📞 SOPORTE

Si algo no funciona:

1. **Revisa que backend esté corriendo**
   ```
   Terminal 1: cd backend && npm run dev
   Terminal 2: cd frontend && npm run dev
   ```

2. **Verifica los logs**
   - Backend: Busca "error" o "Error" en la consola
   - Frontend: F12 → Console → Busca mensajes rojos

3. **Reinicia todo**
   - Ctrl+C en ambas terminales
   - Vuelve a hacer `npm run dev` en ambas

---

*Guía de Testing - KCJ DevStudio*
