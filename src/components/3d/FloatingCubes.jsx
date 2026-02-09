import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const CodeCube = ({ position, code, color = "#00ff88", delay = 0 }) => {
  const meshRef = useRef();
  const textRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + delay;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
      floatingRange={[-0.5, 0.5]}
    >
      <group position={position}>
        <mesh ref={meshRef}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>
        <mesh>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.05}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <Text
          ref={textRef}
          position={[0, 0, 0.76]}
          fontSize={0.15}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/JetBrainsMono-Bold.woff"
        >
          {code}
        </Text>
      </group>
    </Float>
  );
};

const FloatingCubes = () => {
  const codes = [
    '{ }', '< />', '( )', '[ ]', '=> ', '::',
    '++', '&&', '||', '!=', '===', '...'
  ];
  
  const cubes = useMemo(() => {
    return codes.map((code, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15 - 5
      ],
      code,
      color: ['#00ff88', '#00ffff', '#ff00ff', '#ffff00', '#ff6600'][i % 5],
      delay: i * 0.5
    }));
  }, []);

  return (
    <group>
      {cubes.map((cube, i) => (
        <CodeCube key={i} {...cube} />
      ))}
    </group>
  );
};

export default FloatingCubes;
