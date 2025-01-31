"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function QAPage() {
  const [question, setQuestion] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement question submission logic
    console.log("Question submitted:", question)
    setQuestion("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-6 text-center text-electric-purple neon-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Ask a Question
      </motion.h1>
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex gap-2">
          <Input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What's your question?"
            className="flex-grow bg-gray-900 border-cyan-700 text-cyan-400 placeholder-cyan-700"
          />
          <Button type="submit" className="bg-electric-purple hover:bg-electric-purple/80 text-white neon-glow">
            Ask
          </Button>
        </div>
      </motion.form>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8997726626133132"
     crossOrigin="anonymous"></script>
      {/* TODO: Add question list and answers */}
    </div>
  )
}

