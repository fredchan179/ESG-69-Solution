import { Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import Crystal from './Crystal'

type Props = {
  text1: string
  text2: string
}

export default function Models({ text1, text2 }: Props) {
  const { viewport } = useThree()
  const sharedTextProps = {
    font: '/ESG-69-Solution/fonts/BagossExtended-Regular.woff',
    fontSize: 0.5,
    color: 'white',
    anchorX: 'center',
    anchorY: 'middle'
  } as const

  return (
    <group scale={viewport.width / 4}>
      <Text {...sharedTextProps} position={[-0.75, 0.25, -1]}>
        {text1}
      </Text>
      <Text {...sharedTextProps} position={[0.75, -0.25, -1]}>
        {text2}
      </Text>

      <Crystal scale={[4.5, 4.5, 4.5]} />
    </group>
  )
}
