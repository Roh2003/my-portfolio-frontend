import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

const TimelineNode = ({ experience, position, index, isActive }) => {
  const groupRef = useRef();
  const pulseRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.1);
    }
    
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 0.2;
    }
  });

  const color = isActive ? '#00ffff' : '#00ff88';

  return (
    <group ref={groupRef} position={position}>
      {/* Central Node */}
      <Sphere args={[0.3, 32, 32]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
      
      {/* Pulse Ring */}
      <mesh ref={pulseRef}>
        <torusGeometry args={[0.5, 0.02, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      
      {/* Info Card */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[2.5, 0, 0]}>
          <RoundedBox args={[4, 2.5, 0.1]} radius={0.1}>
            <meshStandardMaterial
              color="#0a0a1e"
              transparent
              opacity={0.95}
              metalness={0.5}
              roughness={0.3}
            />
          </RoundedBox>
          
          {/* Border Glow */}
          <mesh position={[0, 0, -0.06]}>
            <boxGeometry args={[4.1, 2.6, 0.05]} />
            <meshBasicMaterial color={color} transparent opacity={0.2} />
          </mesh>
          
          {/* Role */}
          <Text
            position={[-1.8, 0.8, 0.06]}
            fontSize={0.2}
            color={color}
            anchorX="left"
            anchorY="middle"
            maxWidth={3.5}
            font="/fonts/JetBrainsMono-Bold.woff"
          >
            {experience.role}
          </Text>
          
          {/* Company */}
          <Text
            position={[-1.8, 0.4, 0.06]}
            fontSize={0.18}
            color="#ffffff"
            anchorX="left"
            anchorY="middle"
            font="/fonts/JetBrainsMono-Regular.woff"
          >
            {experience.company}
          </Text>
          
          {/* Period */}
          <Text
            position={[-1.8, 0, 0.06]}
            fontSize={0.14}
            color="#888888"
            anchorX="left"
            anchorY="middle"
            font="/fonts/JetBrainsMono-Regular.woff"
          >
            {experience.period}
          </Text>
          
          {/* Location */}
          <Text
            position={[-1.8, -0.35, 0.06]}
            fontSize={0.12}
            color="#666666"
            anchorX="left"
            anchorY="middle"
            font="/fonts/JetBrainsMono-Regular.woff"
          >
            📍 {experience.location}
          </Text>
          
          {/* Status Indicator */}
          <group position={[1.5, 0.8, 0.06]}>
            <mesh>
              <circleGeometry args={[0.08, 32]} />
              <meshBasicMaterial color={isActive ? '#00ff88' : '#ff6600'} />
            </mesh>
            <Text
              position={[0.2, 0, 0]}
              fontSize={0.1}
              color={isActive ? '#00ff88' : '#ff6600'}
              anchorX="left"
              anchorY="middle"
            >
              {isActive ? 'ACTIVE' : 'COMPLETED'}
            </Text>
          </group>
        </group>
      </Float>
      
      {/* Connection Line */}
      <mesh position={[1, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

const Timeline3D = ({ experiences }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  // Vertical positions for timeline
  const spacing = 4;
  const startY = ((experiences.length - 1) * spacing) / 2;

  return (
    <group ref={groupRef}>
      {/* Vertical Timeline Beam */}
      <mesh position={[-2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, experiences.length * spacing + 2, 8]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Data particles flowing along timeline */}
      <TimelineParticles height={experiences.length * spacing} />
      
      {/* Timeline Nodes */}
      {experiences.map((exp, i) => (
        <TimelineNode
          key={i}
          experience={exp}
          position={[-2, startY - i * spacing, 0]}
          index={i}
          isActive={i === 0}
        />
      ))}
    </group>
  );
};

const TimelineParticles = ({ height }) => {
  const pointsRef = useRef();
  const count = 20;
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      y: (i / count) * height - height / 2,
      speed: Math.random() * 0.05 + 0.02
    }));
  }, [height]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array;
    
    particles.forEach((particle, i) => {
      particle.y -= particle.speed;
      if (particle.y < -height / 2) {
        particle.y = height / 2;
      }
      positions[i * 3 + 1] = particle.y;
    });
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      pos[i * 3] = -2;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = 0;
    });
    return pos;
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#00ffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

export default Timeline3D;
