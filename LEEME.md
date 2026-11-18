# Mi presupuesto con Supabase: cuentas creadas solo por el administrador

## Cómo funciona
- No hay registro público. Solo el administrador crea cuentas, desde la sección Usuarios (menú lateral en computador, botón "Usuarios" arriba en el celular). Solo tú la ves.
- El formulario pide cédula y correo. La cédula es única por cuenta y queda en el perfil del usuario.
- La cuenta se crea en el servidor (función `create-user`, ya desplegada en Mi_Presupuesto) con una clave aleatoria que nadie conoce.
- El usuario recibe un correo con un enlace de invitación. Al abrirlo toca "Activar mi cuenta" y elige su propia clave. Nunca viaja una clave por correo.
- El enlace es de un solo uso y vence. Si venció o no llegó, el administrador usa "Reenviar invitación".
- Cada usuario ve solo sus datos (seguridad por filas en la base de datos).

## Pasos de puesta en marcha (una sola vez)

### 1. Secretos del correo (panel de Supabase)
Mi_Presupuesto > Edge Functions > Secrets > Add new secret. Crea dos:
- `GMAIL_USER` = tu dirección de Gmail remitente
- `GMAIL_APP_PASSWORD` = contraseña de aplicación de 16 caracteres de esa cuenta
  (Cuenta de Google > Seguridad > Verificación en 2 pasos > Contraseñas de aplicaciones). No sirve la contraseña normal de Gmail.

### 2. Vigencia del enlace (recomendado)
Authentication > Sign In / Providers > Email > Email OTP Expiration: súbelo a 86400 (24 horas). Por defecto es 1 hora.

### 3. Cerrar los registros públicos
Authentication > Sign In / Providers > desactiva **Allow new users to sign up**.

### 4. "Olvidé mi clave" (opcional)
Authentication > URL Configuration: pon la dirección de tu app en Site URL y en Redirect URLs.

### 5. Publicar la app
En GitHub sube, como archivos sueltos (no el zip) y reemplazando los anteriores:
index.html, config.js, sw.js, manifest.webmanifest, icon-180.png, icon-192.png, icon-512.png.
Borra el .zip del repositorio. Cierra la app y ábrela dos veces con internet.

### 6. Tu cuenta
Tu cuenta jft89@hotmail.com ya está marcada como administrador. Entra con tu correo y tu clave. Si la app detecta datos guardados en ese dispositivo, te ofrece subirlos a tu cuenta.

## Crear un usuario
Usuarios (menú lateral en computador, botón "Usuarios" arriba en el celular): cédula (5 a 12 números) y correo > Crear usuario y enviar invitación.
- Si el correo no se pudo enviar, la app te muestra el enlace de un solo uso para que se lo entregues por otro medio.
- Si el usuario ya activó su cuenta, "Reenviar" no aplica: que use "Olvidé mi clave".

## Cuidados
- Gmail limita los envíos diarios; para tu uso sobra.
- Plan gratuito de Supabase: el proyecto se pausa tras 7 días sin actividad. Abre la app al menos una vez por semana.
- Exporta un respaldo de vez en cuando desde Presupuesto.
