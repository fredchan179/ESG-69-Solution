import { MeshTransmissionMaterial, Text, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { throttle } from 'lodash'
import { easing } from 'maath'
import { useRef } from 'react'
import { type Mesh } from 'three'

export default function Models() {
  const { nodes } = useGLTF('/crystal.glb')
  const { viewport } = useThree()
  const crystal = useRef<Mesh>(null)

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

  const materialProps = useControls({
    thickness: { value: 0.3, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.03, min: 0, max: 1 },
    backside: { value: true }
  })

  return (
    <group scale={viewport.width / 3.75}>
      <Text
        font={'/BagossExtended-Regular.woff'}
        position={[-0.75, 0.25, -1]}
        fontSize={0.5}
        color='white'
        anchorX='center'
        anchorY='middle'
      >
        Redefining
      </Text>
      <Text
        font={'/BagossExtended-Regular.woff'}
        position={[0.75, -0.25, -1]}
        fontSize={0.5}
        color='white'
        anchorX='center'
        anchorY='middle'
      >
        the future
      </Text>
      {/* @ts-ignore */}
      <mesh ref={crystal} {...nodes.CRYSTAL} scale={[4.5, 4.5, 4.5]}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  )
}
