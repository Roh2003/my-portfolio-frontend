import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Environment, 
  Stars, 
  Float,
  Text,
  Sphere,
  OrbitControls,
  PerspectiveCamera,
  useScroll,
  ScrollControls,
  Scroll
} from '@react-three/drei';
import * as THREE from 'three';

// Import 3D components
import MatrixRain from './MatrixRain';
import FloatingCubes from './FloatingCubes';
import CyberGrid from './CyberGrid';
import ParticleField from './ParticleField';
import DataStreams from './DataStreams';
import Terminal3D from './Terminal3D';

const ScrollCamera = ({ pages }) => {
  const scroll = useScroll();
  const { camera } = useThree();
  
  useFrame(() => {
    const offset = scroll.offset;
    
    // Camera movement based on scroll
    camera.position.z = 15 - offset * 10;
    camera.position.y = offset * -50;
    camera.rotation.x = offset * 0.2;
  });
  
  return null;
};

const Scene3D = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Environment Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      <pointLight position={[0, 0, 20]} intensity={0.5} color="#00ffff" />
      
      {/* Background Elements */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      {/* Matrix Rain Effect */}
      <MatrixRain count={500} />
      
      {/* Cyber Grid Floor */}
      <CyberGrid />
      
      {/* Particle Field */}
      <ParticleField count={1500} />
      
      {/* Data Streams */}
      <DataStreams />
      
      {/* Floating Code Cubes */}
      <FloatingCubes />
    </group>
  );
};

const HeroScene = () => {
  return (
    <group position={[0, 0, 0]}>
      <Terminal3D position={[0, 0, 0]} scale={1} />
    </group>
  );
};

const MainScene = ({ currentSection }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Subtle scene rotation
      groupRef.current.rotation.y = Math.sin(time * 0.05) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core Scene */}
      <Scene3D />
      
      {/* Hero Terminal */}
      <HeroScene />
    </group>
  );
};

const HackerScene3D = ({ currentSection = 'hero' }) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000000']} />
        
        <MainScene currentSection={currentSection} />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};

export default HackerScene3D;
