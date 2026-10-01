# nelu.me

Sitio oficial de **Nelú**, cantautora y saxofonista de Comala, Colima. Construido con [Astro](https://astro.build), Tailwind CSS 4, Preact y Astro DB.

## Secciones

| Sección | Dónde se edita |
| :-- | :-- |
| Inicio (hero) | `src/components/Hero.astro` |
| Sobre mí | Textos en `src/data/site.ts` (`bio`, `genres`) |
| Eventos | Se administran desde el sitio al iniciar sesión con una cuenta de `ADMIN_WHITELIST` |
| Mi música | `src/data/tracks.ts` (URIs de Spotify) |
| Fotos | Agrega imágenes a `src/assets/photos/`; los textos alternativos van en `src/data/photos.ts` |
| Videos | `src/data/videos.ts` (IDs de YouTube) |
| Contacto | Correo e Instagram en `src/data/site.ts` |

La paleta y la tipografía viven en `src/styles/global.css` (bloque `@theme`).

## Variables de entorno

Crea un archivo `.env` en la raíz:

```sh
GOOGLE_CLIENT_ID=...        # OAuth de Google para el acceso de administración
GOOGLE_CLIENT_SECRET=...
ADMIN_WHITELIST="correo1@ejemplo.com correo2@ejemplo.com"  # separados por espacio
AUTH_SECRET=...             # openssl rand -hex 32
```

Opcionales: `AUTH_TRUST_HOST=true` (hosts que no sean Vercel), `ASTRO_DB_REMOTE_URL` y `ASTRO_DB_APP_TOKEN` (base de datos remota libSQL/Turso).

## Comandos

| Comando | Acción |
| :-- | :-- |
| `pnpm install` | Instala dependencias |
| `pnpm dev` | Servidor local en `localhost:4321` |
| `pnpm build` | Compila a `./dist/` (local: `ASTRO_DATABASE_FILE=./.astro/content.db pnpm build`, remoto: `pnpm build --remote`) |
| `pnpm preview` | Previsualiza la compilación |
| `pnpm astro check` | Revisión de tipos |
