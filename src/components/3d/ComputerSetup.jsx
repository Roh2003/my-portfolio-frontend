import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, RoundedBox, Box } from '@react-three/drei';
import * as THREE from 'three';

// Monitor component
const Monitor = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
  const screenRef = useRef();
  const glowRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.3 + Math.sin(time * 3) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Monitor Frame */}
      <RoundedBox args={[4, 2.5, 0.2]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.12]}>
        <planeGeometry args={[3.6, 2.1]} />
        <meshStandardMaterial 
          color="#001a0a" 
          emissive="#00ff88" 
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Screen glow */}
      <mesh ref={glowRef} position={[0, 0, 0.15]}>
        <planeGeometry args={[4, 2.6]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.1} />
      </mesh>
      
      {/* Code lines on screen */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[-1.4 + Math.random() * 0.5, 0.8 - i * 0.25, 0.13]}>
          <planeGeometry args={[1.5 + Math.random() * 1.5, 0.08]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#00ffff" : "#00ff00"} transparent opacity={0.8} />
        </mesh>
      ))}
      
      {/* Stand neck */}
      <Box args={[0.3, 0.8, 0.3]} position={[0, -1.6, 0]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
      </Box>
      
      {/* Stand base */}
      <RoundedBox args={[1.5, 0.1, 0.8]} radius={0.02} position={[0, -2, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>
    </group>
  );
};

// Keyboard component
const Keyboard = ({ position = [0, 0, 0] }) => {
  const keysRef = useRef([]);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    keysRef.current.forEach((key, i) => {
      if (key && Math.random() > 0.98) {
        key.position.y = -0.02;
        setTimeout(() => {
          if (key) key.position.y = 0;
        }, 100);
      }
    });
  });

  const keys = useMemo(() => {
    const keyArray = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 12; col++) {
        keyArray.push({
          position: [-1.1 + col * 0.2, 0, -0.3 + row * 0.2],
          size: [0.18, 0.05, 0.18]
        });
      }
    }
    return keyArray;
  }, []);

  return (
    <group position={position}>
      {/* Keyboard base */}
      <RoundedBox args={[2.6, 0.08, 1]} radius={0.02} position={[0, -0.04, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </RoundedBox>
      
      {/* Keys */}
      {keys.map((key, i) => (
        <Box 
          key={i} 
          ref={(el) => (keysRef.current[i] = el)}
          args={key.size} 
          position={key.position}
        >
          <meshStandardMaterial 
            color="#2a2a2a" 
            metalness={0.5} 
            roughness={0.5}
            emissive="#00ff88"
            emissiveIntensity={Math.random() > 0.9 ? 0.3 : 0}
          />
        </Box>
      ))}
      
      {/* RGB strip */}
      <mesh position={[0, 0.03, 0.45]}>
        <boxGeometry args={[2.4, 0.02, 0.05]} />
        <meshBasicMaterial color="#00ff88" />
      </mesh>
    </group>
  );
};

// Mouse component
const Mouse = ({ position = [0, 0, 0] }) => {
  const mouseRef = useRef();
  
  useFrame((state) => {
    if (mouseRef.current) {
      const time = state.clock.elapsedTime;
      mouseRef.current.position.x = position[0] + Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={mouseRef} position={position}>
      <RoundedBox args={[0.4, 0.15, 0.6]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      {/* Scroll wheel */}
      <mesh position={[0, 0.08, -0.1]}>
        <cylinderGeometry args={[0.03, 0.03, 0.15, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
      </mesh>
      {/* RGB light */}
      <mesh position={[0, 0.08, 0.15]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
    </group>
  );
};

// Coffee mug
const CoffeeMug = ({ position = [0, 0, 0] }) => {
  const steamRef = useRef();
  
  useFrame((state) => {
    if (steamRef.current) {
      const time = state.clock.elapsedTime;
      steamRef.current.position.y = 0.4 + Math.sin(time * 2) * 0.05;
      steamRef.current.material.opacity = 0.3 + Math.sin(time * 3) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Mug body */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.12, 0.3, 16]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.08, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Coffee */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.05, 16]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>
      {/* Steam particles */}
      <mesh ref={steamRef} position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// Floating holographic elements
const HolographicElements = ({ scrollProgress = 0 }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.children.forEach((child, i) => {
        child.rotation.y = time * 0.5 + i;
        child.position.y = Math.sin(time + i) * 0.2 + 2;
      });
    }
  });

  const elements = useMemo(() => [
    { text: '<CODE/>', pos: [-3, 2, 1], color: '#00ff88' },
    { text: '{API}', pos: [3, 2.5, -1], color: '#00ffff' },
    { text: '[ ]', pos: [-2.5, 3, -2], color: '#ff00ff' },
    { text: '( )', pos: [2, 2, 2], color: '#ffff00' },
  ], []);

  return (
    <group ref={groupRef}>
      {elements.map((el, i) => (
        <Text
          key={i}
          position={el.pos}
          fontSize={0.3}
          color={el.color}
          anchorX="center"
          anchorY="middle"
        >
          {el.text}
          <meshBasicMaterial transparent opacity={0.7 + scrollProgress * 0.3} />
        </Text>
      ))}
    </group>
  );
};

// Main Computer Setup Component
const ComputerSetup = ({ scrollProgress = 0 }) => {
  const groupRef = useRef();
  const { viewport } = useThree();
  
  // Scroll-based animations
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Rotate based on scroll
      groupRef.current.rotation.y = scrollProgress * Math.PI * 0.5 + Math.sin(time * 0.3) * 0.1;
      
      // Move up/down based on scroll
      groupRef.current.position.y = -2 + scrollProgress * 1;
      
      // Zoom effect based on scroll
      const scale = 1 + scrollProgress * 0.3;
      groupRef.current.scale.setScalar(scale);
      
      // Tilt based on scroll
      groupRef.current.rotation.x = scrollProgress * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Main Monitor */}
      <Monitor position={[0, 2, 0]} scale={1} />
      
      {/* Secondary Monitor */}
      <Monitor position={[-3.5, 2.2, 0.5]} rotation={[0, 0.3, 0]} scale={0.8} />
      
      {/* Keyboard */}
      <Keyboard position={[0, 0, 2]} />
      
      {/* Mouse */}
      <Mouse position={[1.8, 0.08, 2]} />
      
      {/* Coffee mug */}
      <CoffeeMug position={[-2, 0.15, 1.5]} />
      
      {/* Desk surface (glass) */}
      <mesh position={[0, -0.05, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.9} 
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* RGB desk lights */}
      <mesh position={[0, -0.02, -0.5]}>
        <boxGeometry args={[6, 0.02, 0.1]} />
        <meshBasicMaterial color="#00ff88" />
      </mesh>
      
      {/* Holographic floating elements */}
      <HolographicElements scrollProgress={scrollProgress} />
      
      {/* Ambient lights for the setup */}
      <pointLight position={[0, 3, 2]} intensity={0.5} color="#00ff88" />
      <pointLight position={[-3, 2, 1]} intensity={0.3} color="#00ffff" />
      <pointLight position={[3, 2, 1]} intensity={0.3} color="#ff00ff" />
    </group>
  );
};

export default ComputerSetup;
