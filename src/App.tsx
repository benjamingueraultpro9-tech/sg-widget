import { useEffect, useRef, useState } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

export default function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMove)

    let raf: number
    const loop = () => {
      setMouse(prev => ({
        x: prev.x + (target.current.x - prev.x) * 0.05,
        y: prev.y + (target.current.y - prev.y) * 0.05,
      }))
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('mousemove', handleMove)
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