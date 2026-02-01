# Despliegue en VPS (Hostinger)

Este documento guía la vinculación del VPS con el repositorio y el despliegue automático con GitHub Actions.

## Prerrequisitos en el VPS
- Usuario SSH con acceso (ideal: no-root, por ejemplo `deploy`).
- `git`, `node >= 18`, `npm`, y `pm2` instalados.
- Servidor web (Nginx/Apache) sirviendo archivos estáticos desde una ruta, p.ej. `/var/www/html/portafolio`.

## Vincular VPS ↔ GitHub (manual)
1. Conéctate al VPS:
   ```bash
   ssh root@145.223.75.37
   ```
2. Crea una llave SSH (para que el VPS lea el repo público por SSH si lo prefieres):
   ```bash
   ssh-keygen -t ed25519 -C "hostinger-vps" -N "" -f ~/.ssh/id_ed25519
   cat ~/.ssh/id_ed25519.pub
   ```
3. Agrega la clave pública en GitHub → Repo → Settings → Deploy keys → Add deploy key (solo lectura).
4. Prueba conexión desde el VPS:
   ```bash
   ssh -T git@github.com
   ```
5. Clona el repo:
   ```bash
   git clone https://github.com/KCJDEVStudio/Portafolio_KCJDEVStudio.git /var/www/Portafolio_KCJDEVStudio
   ```

## Auto-deploy con GitHub Actions
El workflow está en [.github/workflows/deploy.yml](../.github/workflows/deploy.yml) y se ejecuta en cada push a `main`.

### Secrets necesarios (en GitHub → Repo → Settings → Secrets and variables → Actions)
- `SSH_HOST`: `145.223.75.37`
- `SSH_USER`: usuario en el VPS (ideal: `deploy`, temporalmente `root`)
- `SSH_KEY`: clave privada para acceder al VPS (ver siguiente sección)
- `FRONTEND_TARGET_PATH`: carpeta pública en el VPS (p.ej. `/var/www/html/portafolio`)

### Crear la clave para Actions (Windows)
Genera una clave en tu PC y pon la pública en el VPS:
```powershell
# En PowerShell en tu PC
ssh-keygen -t ed25519 -C "github-actions" -f "$env:USERPROFILE\.ssh\github_actions" -N ""
Get-Content "$env:USERPROFILE\.ssh\github_actions.pub"
```
Copia el contenido de `github_actions.pub` y añádelo en el VPS al usuario elegido:
```bash
ssh root@145.223.75.37
mkdir -p ~/.ssh
echo "<PEGA_AQUI_LA_CLAVE_PUBLICA>" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```
Luego, copia el contenido de la clave privada `github_actions` como secreto `SSH_KEY` en GitHub.

### Qué hace el workflow
- Construye el frontend (`frontend/dist`).
- Sube los archivos estáticos al VPS vía SCP a `FRONTEND_TARGET_PATH`.
- Conecta por SSH, clona/actualiza el repo en `/var/www/Portafolio_KCJDEVStudio`, instala deps del backend y (re)inicia con `pm2`.

### Comprobación rápida
1. Empuja cambios a `main`.
2. Ve a GitHub → Actions y verifica el job.
3. Frontend debe servirse desde `FRONTEND_TARGET_PATH` por Nginx/Apache.
4. Backend debe verse activo con `pm2 ls` en el VPS.

### Notas de seguridad
- Evita usar `root` en producción; crea un usuario dedicado (`deploy`).
- Limita permisos del usuario y la clave.
- Considera `ufw`/firewall y fail2ban.
