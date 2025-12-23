import { useEffect, useRef } from 'react'

const CyberBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Circuitos animados
    const circuits = []
    for (let i = 0; i < 8; i++) {
      circuits.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 200 + 100,
        height: Math.random() * 200 + 100,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#00ffff' : '#ff0080',
        phase: Math.random() * Math.PI * 2
      })
    }

    // Líneas de datos
    const dataLines = []
    for (let i = 0; i < 12; i++) {
      dataLines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.2,
        color: ['#00ffff', '#ff0080', '#00ff80', '#8000ff'][Math.floor(Math.random() * 4)],
        trail: []
      })
    }

    // Partículas de energia
    const energyParticles = []
    for (let i = 0; i < 30; i++) {
      energyParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: ['#00ffff', '#ff0080', '#00ff80'][Math.floor(Math.random() * 3)],
        life: Math.random() * 100 + 50
      })
    }

    let animationFrame

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar circuitos
      circuits.forEach(circuit => {
        circuit.phase += circuit.speed
        const pulseOpacity = circuit.opacity + Math.sin(circuit.phase) * 0.2

        ctx.strokeStyle = circuit.color
        ctx.globalAlpha = pulseOpacity
        ctx.lineWidth = 2

        // Circuito principal
        ctx.beginPath()
        ctx.rect(circuit.x, circuit.y, circuit.width, circuit.height)
        ctx.stroke()

        // Líneas internas
        ctx.beginPath()
        ctx.moveTo(circuit.x + 20, circuit.y + circuit.height/2)
        ctx.lineTo(circuit.x + circuit.width - 20, circuit.y + circuit.height/2)
        ctx.moveTo(circuit.x + circuit.width/2, circuit.y + 20)
        ctx.lineTo(circuit.x + circuit.width/2, circuit.y + circuit.height - 20)
        ctx.stroke()

        // Nodos
        ctx.fillStyle = circuit.color
        ctx.fillRect(circuit.x + circuit.width/2 - 3, circuit.y + circuit.height/2 - 3, 6, 6)
      })

      // Dibujar líneas de datos
      dataLines.forEach(line => {
        // Mover hacia el objetivo
        const dx = line.targetX - line.x
        const dy = line.targetY - line.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > 5) {
          line.x += (dx / distance) * line.speed
          line.y += (dy / distance) * line.speed
        } else {
          line.targetX = Math.random() * canvas.width
          line.targetY = Math.random() * canvas.height
        }

        // Agregar punto al rastro
        line.trail.push({ x: line.x, y: line.y })
        if (line.trail.length > 20) {
          line.trail.shift()
        }

        // Dibujar rastro
        ctx.strokeStyle = line.color
        ctx.lineWidth = 1

        line.trail.forEach((point, index) => {
          const alpha = (index / line.trail.length) * line.opacity
          ctx.globalAlpha = alpha
          if (index > 0) {
            ctx.beginPath()
            ctx.moveTo(line.trail[index - 1].x, line.trail[index - 1].y)
            ctx.lineTo(point.x, point.y)
            ctx.stroke()
          }
        })

        // Punto principal
        ctx.globalAlpha = line.opacity
        ctx.fillStyle = line.color
        ctx.fillRect(line.x - 2, line.y - 2, 4, 4)
      })

      // Dibujar partículas de energía
      energyParticles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life--

        // Rebote en bordes
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1

        // Reiniciar partícula cuando muere
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.life = Math.random() * 100 + 50
        }

        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Glow effect
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      ctx.globalAlpha = 1
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {/* Canvas de efectos */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Scan lines */}
      <div className="fixed inset-0 pointer-events-none z-1 opacity-20">
        <div className="w-full h-full animate-scan-line bg-gradient-to-b from-transparent via-cyber-cyan/10 to-transparent"></div>
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-1 cyber-grid opacity-10"></div>

      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none z-2"
           style={{
             background: 'radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(10, 10, 10, 0.8) 100%)'
           }}>
      </div>

      {/* Matrix rain effect */}
      <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden opacity-5">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-cyber-matrix-green font-matrix text-sm animate-matrix-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="opacity-80">
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Floating holograms */}
      <div className="fixed inset-0 pointer-events-none z-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 border border-cyber-cyan/20 animate-hologram"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 2) * 40}%`,
              transform: `rotate(${i * 45}deg)`,
              animationDelay: `${i * 2}s`
            }}
          >
            <div className="w-full h-full border border-cyber-pink/20 animate-pulse transform rotate-45"></div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CyberBackground