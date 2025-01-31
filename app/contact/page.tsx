"use client"

import { motion } from "framer-motion"
import CircuitBackground from "@/components/CircuitBackground"

export default function Contact() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CircuitBackground />
      <div className="z-10 text-center p-8 bg-gray-900/60 rounded-lg backdrop-blur-sm">
        <motion.h1
          className="text-4xl font-bold mb-6 text-electric-purple neon-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-cyan-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Our contact page is currently under construction. Please check back soon for ways to get in touch with us!
        </motion.p>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8997726626133132"
     crossOrigin="anonymous"></script>
      </div>
    </div>
  )
}

