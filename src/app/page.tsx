"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { isOnboardingCompleted } from "@/utils/memoryEngine";

const ChatInterfaceClient = dynamic(
    () => import("@/components/ChatInterface"),
    { ssr: false }
);

const OnboardingClient = dynamic(
    () => import("@/components/Onboarding"),
    { ssr: false }
);

export default function Home() {
    const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

    useEffect(() => {
        setShowOnboarding(!isOnboardingCompleted());
    }, []);

    // Avoid flash while checking localStorage
    if (showOnboarding === null) return null;

    if (showOnboarding) {
        return (
            <main className="relative z-10 w-full min-h-[100dvh]">
                <OnboardingClient onComplete={() => setShowOnboarding(false)} />
            </main>
        );
    }

    return (
        <main className="relative z-10 w-full min-h-[100dvh]">
            <ChatInterfaceClient />
        </main>
    );
}
