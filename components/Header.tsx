"use client";

import MusicPlayer from "./MusicPlayer";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="border-b border-cyan-700 bg-black/50 backdrop-blur-sm">
      {/* Tag <meta> (caso você precise manter aqui) */}
      <meta name="google-adsense-account" content="ca-pub-8997726626133132" />

      <div className="container mx-auto flex items-center justify-between p-4">
        {/* LOGO (texto) com clique para Home */}
        <h1
          className="text-5xl font-bold text-electric-purple neon-text relative cursor-pointer"
          onClick={() => router.push("/")}
        >
          U-Quiz
          <span className="absolute left-0 top-0 w-full h-full text-5xl font-bold text-electric-purple opacity-50 blur-sm select-none pointer-events-none">
            U-Quiz
          </span>
        </h1>

        {/* MusicPlayer */}
        <MusicPlayer />
      </div>
    </header>
  );
}
