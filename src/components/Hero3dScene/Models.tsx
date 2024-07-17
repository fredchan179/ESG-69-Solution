import { MeshTransmissionMaterial, useGLTF, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { type Mesh } from 'three'

export default function Models() {
  const { nodes } = useGLTF('/crystal.glb')
  const { viewport } = useThree()
  const crystal = useRef<Mesh>(null)

  useFrame(() => {
    if (!crystal.current) return

    // Slowly rotate the crystal on all axes
    crystal.current.rotation.x += 0.005
    crystal.current.rotation.y += 0.005
    crystal.current.rotation.z += 0.005
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
