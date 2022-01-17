import { usePlane } from '@react-three/cannon'

const Ground = props => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1009, 1000]} />
      <meshStandardMaterial attach="material" color="#ccc" />
    </mesh>
  )
}

export default Ground
