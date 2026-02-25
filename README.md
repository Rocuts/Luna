# LangLA — Tu Compañero de Inglés

Web App voice-first (Next.js PWA) para enseñanza de inglés a hispanohablantes con baja alfabetización digital.

## Stack

- **Next.js 16** + React 19 + TypeScript
- **OpenAI Realtime API** (WebRTC, <300ms latencia)
- **OpenAI gpt-4o-mini** (reflexión post-sesión)
- **Serwist** (PWA + offline)
- **Tailwind CSS** (glass-morphism, paleta Aurora)

## Estructura

```
src/
├── app/
│   ├── api/realtime/route.ts    # Token efímero para WebRTC
│   ├── api/reflect/route.ts     # Análisis post-sesión con gpt-4o-mini
│   ├── api/blob/route.ts        # Vercel Blob storage
│   ├── layout.tsx               # Root layout + ErrorBoundary
│   ├── page.tsx                 # Onboarding → ChatInterface
│   ├── ~offline/page.tsx        # Fallback offline
│   └── globals.css              # Estilos globales + mesh gradient
├── components/
│   ├── ChatInterface.tsx        # UI principal (orbe, transcripción, timer)
│   ├── Onboarding.tsx           # 3 pantallas de bienvenida
│   ├── SessionSummary.tsx       # Resumen post-sesión (nivel, palabras, logros)
│   ├── ProgressDashboard.tsx    # Panel de progreso (racha, nivel, vocabulario)
│   ├── ErrorBoundary.tsx        # Captura de errores empática
│   └── ClientProviders.tsx      # Wrapper client para ErrorBoundary
├── hooks/
│   ├── useAudioAgent.ts         # Web Audio API + micrófono
│   └── useNetworkStatus.ts      # Detección online/offline
├── services/
│   └── realtimeService.ts       # WebRTC + reconexión con token refresh
├── utils/
│   ├── memoryEngine.ts          # Perfil, racha, sesiones, logros (localStorage)
│   └── promptManager.ts         # System prompts para Luna
├── data/curriculum/
│   ├── types.ts                 # Tipos del currículum
│   └── verb-to-be.ts            # Módulo A1: verbo "to be"
└── middleware.ts                # Rate limiting por IP
```

## Características

- **Fricción Cero**: Un gran botón central. Toca para hablar.
- **Dos modos**: Charla Libre (conversación abierta) y Clase Guiada (3 preguntas estructuradas)
- **Onboarding**: 3 pantallas para usuarios nuevos
- **Resumen post-sesión**: Nivel CEFR, vocabulario nuevo, logros desbloqueados
- **Progreso persistente**: Racha de días, sesiones totales, minutos, vocabulario
- **Reconexión**: Token refresh automático con exponential backoff
- **Rate limiting**: Protección contra abuso de API
- **ErrorBoundary**: Pantalla empática en lugar de crash blanco
- **PWA**: Instalable, offline graceful, portrait-optimized
- **Accesibilidad**: ARIA labels, focus-visible, reduced-motion

## Desarrollo

```bash
cp .env.example .env.local
# Configura OPENAI_API_KEY en .env.local

npm install
npm run dev        # HTTPS en 0.0.0.0:3000 (acceso LAN)
npm run dev:local  # HTTPS solo en localhost:3000
```

> `getUserMedia` requiere contexto seguro (HTTPS). El script `dev` usa `--experimental-https`.

## Variables de entorno

```bash
OPENAI_API_KEY=sk-proj-...           # Requerido
# OPENAI_REALTIME_MODEL=gpt-4o-realtime-preview  # Opcional
# BLOB_READ_WRITE_TOKEN=...          # Opcional (Vercel Blob)
```
