import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

export default function App() {
  return (
    <ShaderGradientCanvas style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <ShaderGradient
        animate="on"
        brightness={1}
        cAzimuthAngle={180}
        cDistance={2.81}
        cPolarAngle={80}
        cameraZoom={9.1}
        color1="#606080"
        color2="#8d7dca"
        color3="#212121"
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
        uDensity={1.5}
        uSpeed={0.3}
        uStrength={1.5}
        wireframe={false}
      />
    </ShaderGradientCanvas>
  )
}