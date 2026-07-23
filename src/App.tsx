import { useEffect, useRef, useState } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

const BASE_BRIGHTNESS = 1
const CLICK_BRIGHTNESS_BOOST = 0.15 // amplitude de la respiration (léger)
const DECAY_RATE = 0.025            // vitesse de retour au calme (plus bas = plus lent, plus "respiré")

export default function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [pulse, setPulse] = useState(0)
  const mouseTarget = useRef({ x: 0, y: 0 })
  const pulseRef = useRef(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const handleClick = () => {
      pulseRef.current = 1
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('click', handleClick)

    let raf: number
    const loop = () => {
      setMouse(prev => ({
        x: prev.x + (mouseTarget.current.x - prev.x) * 0.05,
        y: prev.y + (mouseTarget.current.y - prev.y) * 0.05,
      }))
      pulseRef.current += (0 - pulseRef.current) * DECAY_RATE
      setPulse(pulseRef.current)

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
        brightness={BASE_BRIGHTNESS + pulse * CLICK_BRIGHTNESS_BOOST}
        cAzimuthAngle={180 + mouse.x * 15}
        cDistance={2.84}
        cPolarAngle={80 + mouse.y * 8}
        cameraZoom={9.1}
        color1="#e3e9ff"
        color2="#00002a"
        color3="#35012c"
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