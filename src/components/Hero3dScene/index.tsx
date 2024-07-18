import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Leva } from 'leva'
import { Suspense } from 'react'
import Models from './Models'

export default function Hero3dScene() {
  return (
    <>
      <Suspense fallback={null}>
        <Canvas dpr={[1, 2]}>
          <Models />

          <EffectComposer enableNormalPass depthBuffer>
            <Bloom luminanceThreshold={1} intensity={1} levels={9} luminanceSmoothing={1} mipmapBlur />
          </EffectComposer>
        </Canvas>
      </Suspense>
      <Loader containerStyles={{ backgroundColor: 'black' }} />
      <Leva collapsed />
    </>
  )
}
