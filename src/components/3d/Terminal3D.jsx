import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { Text, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const GlowingRing = ({ radius = 2, color = '#00ff88', speed = 1 }) => {
  const ringRef = useRef();
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
};

const Terminal3D = ({ position = [0, 0, 0], scale = 1 }) => {
  const groupRef = useRef();
  const textRef = useRef();
  const cursorRef = useRef();
  
  const terminalCode = `> Initializing system...
> Loading modules: [████████████] 100%
> User: rohit_saundalkar
> Status: ONLINE
> Skills: Full Stack | DevOps | AI
> _`;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (cursorRef.current) {
      cursorRef.current.visible = Math.sin(state.clock.elapsedTime * 5) > 0;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group ref={groupRef} position={position} scale={scale}>
        {/* Terminal Window */}
        <RoundedBox args={[6, 4, 0.2]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color="#0a0a0a"
            transparent
            opacity={0.9}
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
        
        {/* Terminal Header */}
        <mesh position={[0, 1.7, 0.11]}>
          <planeGeometry args={[5.8, 0.4]} />
          <meshBasicMaterial color="#1a1a2e" />
        </mesh>
        
        {/* Window Buttons */}
        {[[-2.6, 1.7, 0.12], [-2.35, 1.7, 0.12], [-2.1, 1.7, 0.12]].map((pos, i) => (
          <mesh key={i} position={pos}>
            <circleGeometry args={[0.08, 32]} />
            <meshBasicMaterial color={['#ff5f56', '#ffbd2e', '#27ca40'][i]} />
          </mesh>
        ))}
        
        {/* Terminal Text */}
        <Text
          position={[-2.7, 0.8, 0.12]}
          fontSize={0.18}
          color="#00ff88"
          anchorX="left"
          anchorY="top"
          maxWidth={5.2}
          lineHeight={1.5}
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          {terminalCode}
        </Text>
        
        {/* Blinking Cursor */}
        <mesh ref={cursorRef} position={[-2.45, -0.95, 0.12]}>
          <planeGeometry args={[0.1, 0.2]} />
          <meshBasicMaterial color="#00ff88" />
        </mesh>
        
        {/* Glowing Border */}
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[6.1, 4.1, 0.1]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.1} />
        </mesh>
        
        {/* Rotating Rings */}
        <group position={[0, 0, -0.5]}>
          <GlowingRing radius={3.5} color="#00ff88" speed={0.3} />
          <GlowingRing radius={4} color="#00ffff" speed={-0.2} />
          <GlowingRing radius={4.5} color="#ff00ff" speed={0.4} />
        </group>
      </group>
    </Float>
  );
};

export default Terminal3D;
