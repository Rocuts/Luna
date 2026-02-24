import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // Mapea la variable CSS inyectada por next/font/google
                outfit: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
            },
            colors: {
                // Paleta cálida y accesible "Aurora" top-tier 2026
                glass: {
                    light: "rgba(255, 255, 255, 0.15)",
                    dark: "rgba(0, 0, 0, 0.25)",
                    border: "rgba(255, 255, 255, 0.3)",
                },
                aurora: {
                    50: '#fffbf5',
                    100: '#ffeed6',
                    200: '#ffd4a8',
                    300: '#ffb370',
                    400: '#ff8633',
                    500: '#fc630a',
                    600: '#ed4805',
                    700: '#c53205',
                    800: '#9d280d',
                    900: '#7e240e',
                }
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "mesh-gradient": "url('/mesh-bg.webp')", // Se asume o se recrea con CSS puro
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 3s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%': { filter: 'drop-shadow(0 0 15px rgba(252,99,10,0.5))' },
                    '100%': { filter: 'drop-shadow(0 0 30px rgba(252,99,10,0.8))' },
                }
            }
        },
    },
    plugins: [],
};
export default config;
