export default function Home() {
    return (
        <>
            {/* 
        Para Next.js 14+ App Router, si un componente usa hooks como 'useState', 
        debe tener 'use client' en la cabecera del archivo.
        Importamos dinámicamente el componente del cliente si es necesario,
        o simplemente lo usamos ya que tiene su propio 'use client'.
      */}
            <main className="relative z-10 w-full min-h-[100dvh]">
                <ChatInterfaceClient />
            </main>
        </>
    );
}

// Para MVP, forzamos render de cliente para componente con web audio API
import dynamic from 'next/dynamic';
const ChatInterfaceClient = dynamic(() => import('@/components/ChatInterface'), {
    ssr: false
});
