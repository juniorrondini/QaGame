"use client"

import { motion } from "framer-motion"
import EnergyLightning from "@/components/EnergyLightning"

export default function About() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <EnergyLightning />
      <div className="z-10 text-center p-8 bg-gray-900/60 rounded-lg backdrop-blur-sm max-w-2xl">
        <motion.h1
          className="text-4xl font-bold mb-6 text-electric-purple neon-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About CyberQuiz
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-cyan-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          CyberQuiz is an exciting platform designed for entertainment and fun. Currently under development, we aim to
          provide a unique and immersive quiz experience in a futuristic cyberpunk setting. Stay tuned as we continue to
          evolve and bring you cutting-edge quiz challenges!
        </motion.p>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8997726626133132"
     crossOrigin="anonymous"></script>
      </div>
    </div>
  )
}

