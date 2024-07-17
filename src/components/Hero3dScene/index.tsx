import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Models from './Models'

export default function Hero3dScene() {
  return (
    <Canvas dpr={[1, 2]} flat>
      <Models />
      <Environment preset='city' />
    </Canvas>
  )
}
