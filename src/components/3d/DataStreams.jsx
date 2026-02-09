import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DataStream = ({ startPosition = [0, 10, 0], endPosition = [0, -10, 0], color = '#00ff88' }) => {
  const streamRef = useRef();
  const count = 50;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = [];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = startPosition[0] + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = Math.random() * (startPosition[1] - endPosition[1]) + endPosition[1];
      positions[i * 3 + 2] = startPosition[2] + (Math.random() - 0.5) * 0.5;
      sizes[i] = Math.random() * 0.3 + 0.1;
      speeds.push(Math.random() * 0.3 + 0.2);
    }
    
    return { positions, sizes, speeds };
  }, [startPosition, endPosition]);

  useFrame((state, delta) => {
    if (!streamRef.current) return;
    
    const positions = streamRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= particles.speeds[i];
      
      if (positions[i * 3 + 1] < endPosition[1]) {
        positions[i * 3 + 1] = startPosition[1];
      }
    }
    
    streamRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={streamRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const DataStreams = () => {
  const streams = [
    { start: [-15, 20, -10], end: [-15, -20, -10], color: '#00ff88' },
    { start: [-10, 25, -8], end: [-10, -20, -8], color: '#00ffff' },
    { start: [10, 22, -10], end: [10, -20, -10], color: '#ff00ff' },
    { start: [15, 28, -8], end: [15, -20, -8], color: '#00ff88' },
    { start: [-5, 24, -12], end: [-5, -20, -12], color: '#ffff00' },
    { start: [5, 26, -12], end: [5, -20, -12], color: '#00ffff' },
  ];

  return (
    <group>
      {streams.map((stream, i) => (
        <DataStream
          key={i}
          startPosition={stream.start}
          endPosition={stream.end}
          color={stream.color}
        />
      ))}
    </group>
  );
};

export default DataStreams;
