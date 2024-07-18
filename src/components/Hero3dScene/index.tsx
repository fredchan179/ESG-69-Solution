import { Environment, Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Models from './Models'

export default function Hero3dScene() {
  return (
    <>
      <Suspense fallback={null}>
        <Canvas dpr={[1, 2]} flat>
          <Models />
          <Environment preset='city' />
        </Canvas>
      </Suspense>
      <Loader containerStyles={{ backgroundColor: 'black' }} />
    </>
  )
}
