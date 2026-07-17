import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

export default function App() {
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
        cAzimuthAngle={180}
        cDistance={2.84}
        cPolarAngle={80}
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