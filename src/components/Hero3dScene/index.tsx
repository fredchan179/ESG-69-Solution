import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Leva } from 'leva'
import { Suspense } from 'react'
import Models from './Models'

type Props = {
  text1: string
  text2: string
}

export default function Hero3dScene(props: Props) {
  return (
    <>
      <Suspense fallback={null}>
        <Canvas dpr={[1, 2]}>
          <Models {...props} />

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
