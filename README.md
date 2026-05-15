# Perfit Proxy — Bloom Life

Servidor proxy para conectar el dashboard de Bloom Life con la API de Myperfit.

## Deploy en Render

1. Subí esta carpeta a un repositorio GitHub nuevo (ej. `bloom-perfit-proxy`)
2. En [render.com](https://render.com) → New → Web Service
3. Conectá el repo
4. Configuración:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. En Variables de entorno agregá:
   - `PERFIT_API_KEY` = `bloomlife-MFsgND2hDCIrk4LKz7icZs2bRMdUm9Sx`
6. Deploy → copiá la URL que te da Render (ej. `https://bloom-perfit-proxy.onrender.com`)

## Endpoints disponibles

- `GET /health` — verificar que el servidor está vivo
- `GET /campaigns` — todas las campañas con métricas
- `GET /campaigns/:id` — detalle de una campaña
- `GET /contacts/stats` — estadísticas de contactos
- `GET /lists` — listas de contactos
