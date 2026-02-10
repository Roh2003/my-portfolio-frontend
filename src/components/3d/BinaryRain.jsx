import { useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Single Binary Column Component
const BinaryColumn = ({ position, speed, chars }) => {
  const groupRef = useRef();
  const charsRef = useRef(chars);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y -= speed * delta * 10;
      
      if (groupRef.current.position.y < -30) {
        groupRef.current.position.y = 30;
        // Randomize characters
        charsRef.current = charsRef.current.map(() => Math.random() > 0.5 ? '1' : '0');
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {chars.map((char, i) => (
        <Text
          key={i}
          position={[0, -i * 0.5, 0]}
          fontSize={0.4}
          color={i === 0 ? '#ffffff' : '#00ff00'}
          anchorX="center"
          anchorY="middle"
          fillOpacity={i === 0 ? 1 : Math.max(0.1, 1 - i * 0.1)}
        >
          {char}
        </Text>
      ))}
    </group>
  );
};

// Optimized Binary Rain using instanced geometry
const BinaryRainOptimized = ({ count = 300 }) => {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Create particles data
  const particles = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      p.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 60,
          Math.random() * 60 - 30,
          (Math.random() - 0.5) * 60
        ),
        speed: Math.random() * 8 + 2,
        scale: Math.random() * 0.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.5
      });
    }
    return p;
  }, [count]);

  // Create texture with binary characters
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 64, 64);
    
    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(Math.random() > 0.5 ? '1' : '0', 32, 32);
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    particles.forEach((particle, i) => {
      particle.position.y -= particle.speed * delta;
      
      if (particle.position.y < -30) {
        particle.position.y = 30;
        particle.position.x = (Math.random() - 0.5) * 60;
        particle.position.z = (Math.random() - 0.5) * 60;
      }
      
      dummy.position.copy(particle.position);
      dummy.scale.setScalar(particle.scale);
      dummy.lookAt(state.camera.position);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Create multiple binary textures
  const textures = useMemo(() => {
    return ['0', '1'].map(char => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = 'transparent';
      ctx.clearRect(0, 0, 64, 64);
      
      ctx.fillStyle = '#00ff00';
      ctx.font = 'bold 56px Courier New, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char, 32, 32);
      
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    });
  }, []);

  // Randomly choose a texture
  const binaryTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, 128, 128);
    
    // Draw multiple binary digits
    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold 24px Courier New, monospace';
    ctx.textAlign = 'center';
    
    for (let row = 0; row < 5; row++) {
      const char = Math.random() > 0.5 ? '1' : '0';
      const alpha = 1 - row * 0.2;
      ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
      ctx.fillText(char, 64, 20 + row * 22);
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <planeGeometry args={[0.8, 2]} />
      <meshBasicMaterial 
        map={binaryTexture}
        transparent 
        opacity={0.9}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
};

// Alternative: Simple Text-based Binary Rain (more readable but heavier)
const BinaryRainText = ({ columns = 20 }) => {
  const columnsData = useMemo(() => {
    return [...Array(columns)].map((_, i) => ({
      position: [
        (i - columns / 2) * 3,
        Math.random() * 30,
        (Math.random() - 0.5) * 30
      ],
      speed: Math.random() * 0.3 + 0.1,
      chars: [...Array(10)].map(() => Math.random() > 0.5 ? '1' : '0')
    }));
  }, [columns]);

  return (
    <group>
      {columnsData.map((col, i) => (
        <BinaryColumn 
          key={i} 
          position={col.position}
          speed={col.speed}
          chars={col.chars}
        />
      ))}
    </group>
  );
};

// Main Binary Rain Component - combines both approaches
const BinaryRain = ({ count = 400, useText = false }) => {
  if (useText) {
    return <BinaryRainText columns={15} />;
  }
  return <BinaryRainOptimized count={count} />;
};

export default BinaryRain;
