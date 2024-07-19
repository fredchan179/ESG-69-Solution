import { Caustics, CubeCamera, MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { useFrame, useLoader, type MeshProps } from '@react-three/fiber'
import { useControls } from 'leva'
import throttle from 'lodash/throttle'
import { easing } from 'maath'
import { useRef } from 'react'
import { Mesh } from 'three'
import { RGBELoader } from 'three/examples/jsm/Addons.js'

type Props = MeshProps

export default function Crystal(props: Props) {
  const crystal = useRef<Mesh>()
  const { nodes } = useGLTF('/crystal.glb')
  const envTexture = useLoader(RGBELoader, '/crystal-env-map.hdr')
  const materialProps = useControls('Crystal Material', {
    anisotropy: { value: 0.2, min: 0, max: 1, step: 0.05 },
    thickness: { value: 0.3, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.05, min: 0, max: 1 },
    clearcoat: { value: 0.5, min: 0, max: 1, step: 0.1 },
    clearcoatRoughness: { value: 0.1, min: 0, max: 1, step: 0.1 },
    envMapIntensity: { value: 6, min: 0, max: 10, step: 0.1 },
    iridescence: { value: 1, min: 0, max: 1, step: 0.1 },
    iridescenceThicknessRange: { value: [0, 1400], min: 0, max: 2000, step: 100 },
    anisotropicBlur: { value: 0.5, min: 0, max: 1, step: 0.05 },
  })

  const prevPointerPosition = useRef({ x: 0, y: 0 })

  const updatePointerPosition = throttle((x: number, y: number) => {
    prevPointerPosition.current.x = x
    prevPointerPosition.current.y = y
  }, 500)

  useFrame((state, delta) => {
    if (!crystal.current) return

    const { current: pointer } = prevPointerPosition
    const isMoving = pointer.x !== state.pointer.x || pointer.y !== state.pointer.y

    if (isMoving) {
      easing.dampE(crystal.current.rotation, [-state.pointer.y * Math.PI, Math.PI * state.pointer.x, 0], 0.1, delta)
    } else {
      crystal.current.rotation.x += 0.005
      crystal.current.rotation.y += 0.005
      crystal.current.rotation.z += 0.005
    }

    updatePointerPosition(state.pointer.x, state.pointer.y)
  })

  return (
    <CubeCamera resolution={256} frames={1} envMap={envTexture}>
      {(texture) => (
        <Caustics
          causticsOnly={false}
          backside
          color='white'
          worldRadius={0.1}
          ior={1.8}
          backsideIOR={1.1}
          intensity={0.1}
        >
          {/* @ts-ignore */}
          <mesh ref={crystal} {...nodes.CRYSTAL} {...props}>
            <MeshTransmissionMaterial
              {...materialProps}
              envMap={texture}
            />
          </mesh>
        </Caustics>
      )}
    </CubeCamera>
  )
}
