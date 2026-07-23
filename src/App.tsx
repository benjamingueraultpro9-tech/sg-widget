import { useEffect, useRef, useState } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

// Couleurs de base (ton fond actuel)
const BASE_COLORS = { c1: '#e3e9ff', c2: '#00002a', c3: '#35012c' }
// Teinte qui apparaît brièvement au clic
const FLASH_COLORS = { c1: '#fff4e0', c2: '#ff5005', c3: '#dbba95' }

const DECAY_RATE = 0.03 // vitesse de retour aux couleurs normales (plus bas = plus lent)

function lerpColor(hexA: string, hexB: string, t: number) {
  const a = parseInt(hexA.slice(1), 16)
  const b = parseInt(hexB.slice(1), 16)
  const ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255
  const br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bch = Math.round(ab + (bb - ab) * t)
  return `#${((1 << 24) + (r << 16) + (g << 8) + bch).toString(16).slice(1)}`
}

export default function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [flash, setFlash] = useState(0)
  const mouseTarget = useRef({ x: 0, y: 0 })
  const flashRef = useRef(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const handleClick = () => {
      flashRef.current = 1
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('click', handleClick)

    let raf: number
    const loop = () => {
      setMouse(prev => ({
        x: prev.x + (mouseTarget.current.x - prev.x) * 0.05,
        y: prev.y + (mouseTarget.current.y - prev.y) * 0.05,
      }))
      flashRef.current += (0 - flashRef.current) * DECAY_RATE
      setFlash(flashRef.current)

      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('click', handleClick)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <ShaderGradientCanvas
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
      }}
      pixelDensity={1}
    >
      <ShaderGradient
        animate="on"
        brightness={1}
        cAzimuthAngle={180 + mouse.x * 15}
        cDistance={2.84}
        cPolarAngle={80 + mouse.y * 8}
        cameraZoom={9.1}
        color1={lerpColor(BASE_COLORS.c1, FLASH_COLORS.c1, flash)}
        color2={lerpColor(BASE_COLORS.c2, FLASH_COLORS.c2, flash)}
        color3={lerpColor(BASE_COLORS.c3, FLASH_COLORS.c3, flash)}
        envPreset="city"
        grain="on"
        lightType="3d"
        positionX={0}
        positionY={0}
        positionZ={0}
        reflection={0.1}
        rotationX={50}
        rotationY={0}
        rotationZ={-60}
        type="waterPlane"
        uAmplitude={0}
        uDensity={1.5}
        uFrequency={0}
        uSpeed={0.3}
        uStrength={1.3}
        wireframe={false}
      />
    </ShaderGradientCanvas>
  )
}