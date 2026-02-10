import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Stars, 
  Float,
  Text,
  OrbitControls,
} from '@react-three/drei';
import * as THREE from 'three';

// Import 3D components
import BinaryRain from './BinaryRain';
import FloatingCubes from './FloatingCubes';
import CyberGrid from './CyberGrid';
import ParticleField from './ParticleField';
import DataStreams from './DataStreams';
import ComputerSetup from './ComputerSetup';

// Scroll-based scene controller
const ScrollAnimatedScene = ({ scrollProgress = 0 }) => {
  const groupRef = useRef();
  const cameraRef = useRef();
  const { camera } = useThree();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animate camera based on scroll
    camera.position.z = 15 - scrollProgress * 5;
    camera.position.y = 2 + scrollProgress * 3;
    camera.rotation.x = -scrollProgress * 0.15;
    
    if (groupRef.current) {
      // Subtle rotation
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05 + scrollProgress * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Environment Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      <pointLight position={[0, 5, 15]} intensity={0.8} color="#00ffff" />
      
      {/* Background Stars */}
      <Stars 
        radius={100} 
        depth={50} 
        count={3000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      {/* Binary 0/1 Rain Effect */}
      <BinaryRain count={400} />
      
      {/* Cyber Grid Floor */}
      <CyberGrid />
      
      {/* Particle Field */}
      <ParticleField count={1000} />
      
      {/* Data Streams */}
      <DataStreams />
      
      {/* Floating Code Cubes - reduced for performance */}
      <FloatingCubes count={15} />
      
      {/* Central Computer Setup - Main 3D Model */}
      <ComputerSetup scrollProgress={scrollProgress} />
    </group>
  );
};

const HackerScene3D = ({ scrollProgress = 0 }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 15], fov: isMobile ? 85 : 75 }}
        gl={{ 
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <color attach="background" args={['#000000']} />
        
        <ScrollAnimatedScene scrollProgress={scrollProgress} />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.2}
          enableRotate={!isMobile}
        />
      </Canvas>
    </div>
  );
};

export default HackerScene3D;
