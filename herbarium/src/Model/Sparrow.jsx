// Sparrow.jsx
import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Sparrow({ position = [0, 0, 0], pathCurve }) {
  const group = useRef()
  const { scene, animations } = useGLTF('/Models/duolingo.glb')  // your sparrow .glb path
  const { actions } = useAnimations(animations, group)

  // Play flying animation on mount
  useEffect(() => {
    actions['Animation']?.play()   // <-- Correct animation name
  }, [actions])

  // Lower Y position by 1 unit
  const loweredPosition = [position[0], position[1] - 1, position[2]]

  return <primitive ref={group} object={scene} scale={5.0} position={loweredPosition} />
}
