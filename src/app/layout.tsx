import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

/**
 * Outfit via next/font/google:
 * - Self-hosted por Next.js (sin petición a Google al cargar)
 * - Subconjunto 'latin' cubre todos los caracteres en español e inglés
 * - display: swap → el texto es visible inmediatamente con la fuente de reserva
 */
const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "600", "800"],
    display: "swap",
    variable: "--font-outfit",
});

export const metadata: Metadata = {
    title: "Tu Compañero de Inglés",
    description: "Aprende inglés hablando, sin complicaciones ni botones confusos.",
    manifest: "/manifest.json",
};

/**
 * Exportamos viewport por separado — es el estándar de Next.js 14.
 * (themeColor ya no va dentro de metadata)
 */
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#ff8633",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={outfit.variable}>
            <body className="font-outfit antialiased">
                {/* Fondo animado mesh gradient — posición fixed para cubrir siempre */}
                <div className="mesh-bg" aria-hidden="true" />
                {children}
            </body>
        </html>
    );
}
