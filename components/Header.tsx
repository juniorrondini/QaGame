"use client";

import MusicPlayer from "./MusicPlayer";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="border-b border-cyan-700 bg-black/50 backdrop-blur-sm">
      <meta name="google-adsense-account" content="ca-pub-8997726626133132" />

      <div className="container mx-auto flex flex-wrap items-center justify-between p-4 md:p-6">
        {/* LOGO Responsivo */}
        <h1
          className="text-3xl md:text-5xl font-bold text-electric-purple neon-text relative cursor-pointer"
          onClick={() => router.push("/")}
        >
          U-Quiz
          <span className="absolute left-0 top-0 w-full h-full text-3xl md:text-5xl font-bold text-electric-purple opacity-50 blur-sm select-none pointer-events-none">
            U-Quiz
          </span>
        </h1>

        {/* MusicPlayer Responsivo */}
        <div className="w-full md:w-auto mt-2 md:mt-0 flex justify-center">
          <MusicPlayer />
        </div>
      </div>
    </header>
  );
}
