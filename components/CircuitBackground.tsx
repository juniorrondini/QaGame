"use client"

import { useEffect, useRef } from "react"

interface Circuit {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  color: string
}

const CircuitBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let circuits: Circuit[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initCircuits()
    }

    const initCircuits = () => {
      const circuitCount = 100
      circuits = []
      for (let i = 0; i < circuitCount; i++) {
        circuits.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 1,
          dy: (Math.random() - 0.5) * 1,
          radius: Math.random() * 2 + 1,
          // Aumente aqui a opacidade inicial para ficar mais visível (ex: 0.6 a 1.0)
          color: `rgba(0, 255, 255, ${Math.random() * 0.4 + 0.6})`,
        })
      }
    }

    const drawCircuit = (circuit: Circuit) => {
      ctx.beginPath()
      ctx.arc(circuit.x, circuit.y, circuit.radius, 0, Math.PI * 2)
      ctx.fillStyle = circuit.color
      ctx.fill()
    }

    const updateCircuit = (circuit: Circuit) => {
      circuit.x += circuit.dx
      circuit.y += circuit.dy

      // Rebate nas bordas
      if (circuit.x + circuit.radius > canvas.width || circuit.x - circuit.radius < 0) {
        circuit.dx = -circuit.dx
      }
      if (circuit.y + circuit.radius > canvas.height || circuit.y - circuit.radius < 0) {
        circuit.dy = -circuit.dy
      }
    }

    const drawConnections = () => {
      const connectionDistance = 150

      for (let i = 0; i < circuits.length; i++) {
        for (let j = i + 1; j < circuits.length; j++) {
          const dx = circuits[i].x - circuits[j].x
          const dy = circuits[i].y - circuits[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(circuits[i].x, circuits[i].y)
            ctx.lineTo(circuits[j].x, circuits[j].y)
            ctx.strokeStyle = `rgba(0, 255, 255, ${
              0.2 * (1 - distance / connectionDistance)
            })`
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      circuits.forEach((circuit) => {
        updateCircuit(circuit)
        drawCircuit(circuit)
      })

      drawConnections()

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      // IMPORTANTE: pointer-events-none e posicionamento com z-0 ou -z-10
      className="pointer-events-none absolute top-0 left-0 w-full h-full -z-10"
    />
  )
}

export default CircuitBackground
