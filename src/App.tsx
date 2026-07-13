import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

export default function App() {
  return (
    <ShaderGradientCanvas
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      pixelDensity={1.8}
    >
      <ShaderGradient
        animate="on"
        brightness={1.2}
        cAzimuthAngle={180}
        cDistance={3.6}
        cPolarAngle={90}
        cameraZoom={1}
        color1="#ff5005"
        color2="#dbba95"
        color3="#d0bce1"
        envPreset="city"
        grain="on"
        lightType="3d"
        positionX={-1.4}
        positionY={0}
        positionZ={0}
        reflection={0.1}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        type="waterPlane"
        uAmplitude={1}
        uDensity={0.7}
        uFrequency={5.5}
        uSpeed={0.4}
        uStrength={2.7}
        wireframe={false}
      />
    </ShaderGradientCanvas>
  )
}