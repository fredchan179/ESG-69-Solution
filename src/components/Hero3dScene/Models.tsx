import { Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import Crystal from './Crystal'

export default function Models() {
  const { viewport } = useThree()

  return (
    <group scale={viewport.width / 4}>
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

      <Crystal scale={[4.5, 4.5, 4.5]} />
    </group>
  )
}
