import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import { Vector3 } from 'three'
import * as THREE from 'three'

const shapeColors = {
  Projects: '#ff0000', // Red
  'About Me': '#00ff00', // Green
  Blog: '#0000ff', // Blue
  Contact: '#ff00ff', // Purple
  Other: '#ffff00', // Yellow
}

export const HomeBackground = ({ activeItem = 'Projects', isTransitioning = false, transitionProgress = 0 }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()
  const [targetPosition] = useState(new Vector3(0, 0, 0))
  const initialCameraPosition = useRef(new Vector3(0, 0, 5))

  // Store the original camera position on mount
  useEffect(() => {
    initialCameraPosition.current.copy(camera.position)
  }, [camera])

  // Handle camera zoom effect during transitions - now shorter due to immediate navigation
  useEffect(() => {
    if (isTransitioning) {
      // Just start a slight camera zoom before navigation takes over
      const newZ = 5 - transitionProgress * 2
      camera.position.z = newZ
    } else {
      // Reset camera position when not transitioning
      camera.position.copy(initialCameraPosition.current)
    }
  }, [isTransitioning, transitionProgress, camera])

  // Create different shapes based on activeItem
  const ShapeComponent = () => {
    switch (activeItem) {
      case 'Projects':
        return (
          <mesh ref={meshRef} position={[0, 0, 0]}>
            <torusKnotGeometry args={[1, 0.3, 100, 16]} />
            <MeshDistortMaterial color={shapeColors.Projects} speed={2} distort={0.3} />
          </mesh>
        )
      case 'About Me':
        return (
          <mesh ref={meshRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.2, 1]} />
            <MeshDistortMaterial color={shapeColors['About Me']} speed={1.5} distort={0.4} />
          </mesh>
        )
      case 'Blog':
        return (
          <mesh ref={meshRef} position={[0, 0, 0]}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <MeshDistortMaterial color={shapeColors.Blog} speed={1} distort={0.2} />
          </mesh>
        )
      case 'Contact':
        return (
          <mesh ref={meshRef} position={[0, 0, 0]}>
            <octahedronGeometry args={[1.2, 0]} />
            <MeshDistortMaterial color={shapeColors.Contact} speed={3} distort={0.5} />
          </mesh>
        )
      case 'Other':
      default:
        return (
          <mesh ref={meshRef} position={[0, 0, 0]}>
            <torusGeometry args={[1, 0.4, 16, 32]} />
            <MeshDistortMaterial color={shapeColors.Other} speed={1.8} distort={0.3} />
          </mesh>
        )
    }
  }

  // Animate the shape
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <ShapeComponent />
    </>
  )
}

export default HomeBackground
