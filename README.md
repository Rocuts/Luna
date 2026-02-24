# MVP EdTech: "Fricción Cero" (Voice-First)

Este proyecto es una Web App (Next.js PWA) orientada a la enseñanza de inglés para hispanohablantes con baja alfabetización digital.

## Estructura del Proyecto (Andamiaje)

```
/LangLA
├── public/
│   ├── manifest.json       # Configuración PWA
│   └── sw.js               # Service Worker para resiliencia offline
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Estructura principal y metadatos accesibles
│   │   ├── page.tsx        # Integración de la UI
│   │   └── globals.css     # Estilos Tailwind y animaciones base
│   ├── components/
│   │   ├── ChatInterface.tsx  # Interfaz principal (Botón central, sin menús)
│   │   └── CompassionateFallback.tsx # Pantalla de error amigable cuando falla la red
│   ├── hooks/
│   │   └── useAudioAgent.ts   # Manejo de Web Audio API, micrófono y supresión de ruido
│   ├── services/
│   │   └── realtimeService.ts # Conexión WebRTC con OpenAI Realtime API (Latencia <300ms)
│   └── utils/
│       └── a11y.ts         # Utilidades de accesibilidad (ej. lector de pantalla)
├── package.json
└── tailwind.config.js      # Paletas de contraste cálidas y accesibles (WCAG AAA)
```

## Características Core
1. **Fricción Cero**: Un gran botón central multimodal.
2. **Latencia Ultrabaja**: WebRTC hacia OpenAI Realtime API.
3. **Manejo Empático**: Si se pierde la conexión, la UI muestra "Dame un segundito..." (sin errores 500).

## Ejecutar en LAN
1. Inicia el proyecto con:
   ```bash
   npm run dev
   ```
2. Obtén la IP local de tu máquina:
   ```bash
   ipconfig getifaddr en0
   ```
   Si usas Ethernet, prueba:
   ```bash
   ipconfig getifaddr en1
   ```
3. Desde otro dispositivo en la misma red Wi-Fi/LAN, abre:
   ```text
   https://TU_IP_LOCAL:3000
   ```

> Nota importante sobre micrófono:
> `getUserMedia` solo funciona en contexto seguro. Por eso el script `npm run dev` ahora inicia en HTTPS.
> - En la misma máquina de desarrollo: usa `https://localhost:3000`.
> - En LAN desde otro dispositivo: usa `https://TU_IP_LOCAL:3000`.
> - Al ser certificado autofirmado (modo dev), el navegador puede pedirte confirmar confianza del certificado.

Scripts disponibles:
- `npm run dev`: Next.js en `0.0.0.0:3000` con HTTPS (acceso LAN).
- `npm run dev:local`: Next.js solo en `localhost:3000` con HTTPS.
- `npm run dev:http`: Next.js en `0.0.0.0:3000` por HTTP (solo pruebas sin micrófono en LAN).
- `npm run dev:http:local`: Next.js solo en `localhost:3000` por HTTP.
- `npm run start`: App compilada en `0.0.0.0:3000` (acceso LAN).
- `npm run start:local`: App compilada solo en `localhost:3000`.
