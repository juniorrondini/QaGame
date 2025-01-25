"use client"

import { useEffect, useRef } from "react"

const EnergyLightning = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    class Lightning {
      x: number
      y: number
      xEnd: number
      yEnd: number
      life: number
      maxLife: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = 0
        this.xEnd = Math.random() * canvas.width
        this.yEnd = canvas.height
        this.life = 0
        this.maxLife = Math.floor(Math.random() * 20) + 10
        this.color = `hsla(180, 100%, ${Math.floor(Math.random() * 20 + 80)}%, ${Math.random() * 0.3 + 0.1})`
      }

      draw() {
        ctx!.beginPath()
        ctx!.moveTo(this.x, this.y)

        // Create a jagged path
        let x = this.x
        let y = this.y
        while (y < this.yEnd) {
          x += (Math.random() - 0.5) * 50
          y += Math.random() * 20 + 10
          ctx!.lineTo(x, y)
        }

        ctx!.strokeStyle = this.color
        ctx!.lineWidth = Math.random() * 1 + 0.5
        ctx!.stroke()
      }

      update() {
        this.life++
        if (this.life >= this.maxLife) {
          this.reset()
        }
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = 0
        this.xEnd = Math.random() * canvas.width
        this.yEnd = canvas.height
        this.life = 0
        this.maxLife = Math.floor(Math.random() * 20) + 10
        this.color = `hsla(180, 100%, ${Math.floor(Math.random() * 20 + 80)}%, ${Math.random() * 0.3 + 0.1})`
      }
    }

    const lightnings: Lightning[] = []
    for (let i = 0; i < 3; i++) {
      lightnings.push(new Lightning())
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (Math.random() < 0.03) {
        for (let i = 0; i < lightnings.length; i++) {
          lightnings[i].draw()
          lightnings[i].update()
        }
      }

      // Adiciona flashes ocasionais
      if (Math.random() < 0.01) {
        ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.03})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
}

export default EnergyLightning

