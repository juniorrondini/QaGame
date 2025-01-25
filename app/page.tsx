"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CircuitBackground from "@/components/CircuitBackground"

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CircuitBackground />
      <div className="z-10 text-center">
        <motion.h1
          className="text-5xl font-bold mb-6 text-electric-purple neon-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to CyberQuiz
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-cyan-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Test your knowledge in our futuristic quiz arena
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/quiz">
            <Button size="lg" className="bg-electric-purple hover:bg-electric-purple/80 text-white neon-glow">
              Start Quiz
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

