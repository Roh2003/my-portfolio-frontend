import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const SkillOrb = ({ position, skill, color, delay = 0, onClick }) => {
  const groupRef = useRef();
  const orbRef = useRef();
  const glowRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime + delay;
    
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
    }
    
    if (orbRef.current) {
      orbRef.current.rotation.y = time * 0.3;
      orbRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
    }
    
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Outer Glow */}
      <Sphere ref={glowRef} args={[0.9, 32, 32]}>
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Main Orb */}
      <Float speed={3} rotationIntensity={0.3} floatIntensity={0.3}>
        <group ref={orbRef}>
          {/* Wireframe Sphere */}
          <Sphere args={[0.7, 16, 16]}>
            <meshStandardMaterial
              color={color}
              wireframe
              transparent
              opacity={0.8}
            />
          </Sphere>
          
          {/* Inner Core */}
          <Sphere args={[0.3, 32, 32]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              metalness={0.9}
              roughness={0.1}
            />
          </Sphere>
          
          {/* Skill Icon/Text */}
          <Text
            position={[0, 0, 0.71]}
            fontSize={0.3}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/JetBrainsMono-Bold.woff"
          >
            {skill.icon}
          </Text>
        </group>
      </Float>
      
      {/* Skill Name */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.2}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Bold.woff"
      >
        {skill.name}
      </Text>
      
      {/* Orbiting Particles */}
      <OrbitingParticles color={color} radius={1} count={8} />
    </group>
  );
};

const OrbitingParticles = ({ color, radius, count }) => {
  const groupRef = useRef();
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.3,
      size: 0.05 + Math.random() * 0.05
    }));
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(particle.angle) * radius,
            Math.sin(particle.angle * 2) * 0.3,
            Math.sin(particle.angle) * radius
          ]}
        >
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};

const SkillsConstellation = ({ skills }) => {
  const colors = ['#00ff88', '#00ffff', '#ff00ff', '#ffff00', '#ff6600', '#00ff88'];
  
  // Arrange skills in a 3D sphere formation
  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const radius = 8;
      
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi) - 2,
        radius * Math.cos(phi) - 5
      ];
    });
  }, [skills.length]);

  return (
    <group>
      {skills.slice(0, 12).map((skill, i) => (
        <SkillOrb
          key={skill.name}
          position={positions[i]}
          skill={{ name: skill.name, icon: skill.name.slice(0, 2) }}
          color={colors[i % colors.length]}
          delay={i * 0.5}
        />
      ))}
    </group>
  );
};

export { SkillOrb, SkillsConstellation };
export default SkillsConstellation;
