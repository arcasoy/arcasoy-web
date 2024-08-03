import { Suspense } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { ColorProps } from '@react-three/fiber'
import { ColorRepresentation } from 'three'

interface Props {
  color?: ColorRepresentation
}

export const QuickLightsCameraColor = ({ color }: Props) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight />
    <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
    <pointLight position={[-10, -10, -10]} color='blue' decay={0.2} />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
  </Suspense>
)
