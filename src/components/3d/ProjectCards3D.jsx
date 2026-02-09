import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float, Image } from '@react-three/drei';
import * as THREE from 'three';

const ProjectCard3D = ({ project, position, rotation = [0, 0, 0], delay = 0 }) => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime + delay;
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;
      
      if (hovered) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          rotation[1] + 0.1,
          0.1
        );
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(
          groupRef.current.scale.x,
          1.1,
          0.1
        ));
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          rotation[1],
          0.05
        );
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(
          groupRef.current.scale.x,
          1,
          0.1
        ));
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Card Background */}
      <RoundedBox args={[4, 5, 0.1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color={hovered ? '#1a1a3e' : '#0a0a1e'}
          transparent
          opacity={0.95}
          metalness={0.5}
          roughness={0.3}
        />
      </RoundedBox>
      
      {/* Glowing Border */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[4.1, 5.1, 0.05]} />
        <meshBasicMaterial
          color={hovered ? '#00ffff' : '#00ff88'}
          transparent
          opacity={hovered ? 0.5 : 0.2}
        />
      </mesh>
      
      {/* Project Number Badge */}
      <group position={[1.5, 2, 0.06]}>
        <mesh>
          <circleGeometry args={[0.3, 32]} />
          <meshBasicMaterial color="#ff6600" />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.25}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/JetBrainsMono-Bold.woff"
        >
          {project.number || '1'}
        </Text>
      </group>
      
      {/* Project Title */}
      <Text
        position={[0, 1.5, 0.06]}
        fontSize={0.35}
        color={hovered ? '#00ffff' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
        font="/fonts/JetBrainsMono-Bold.woff"
      >
        {project.title}
      </Text>
      
      {/* Project Description */}
      <Text
        position={[0, 0.5, 0.06]}
        fontSize={0.15}
        color="#aaaaaa"
        anchorX="center"
        anchorY="top"
        maxWidth={3.5}
        lineHeight={1.4}
        font="/fonts/JetBrainsMono-Regular.woff"
      >
        {project.description}
      </Text>
      
      {/* Tags */}
      <group position={[-1.5, -1.5, 0.06]}>
        {project.tags?.slice(0, 3).map((tag, i) => (
          <group key={tag} position={[i * 1.2, 0, 0]}>
            <RoundedBox args={[1, 0.3, 0.02]} radius={0.05}>
              <meshBasicMaterial color="#00ff88" transparent opacity={0.3} />
            </RoundedBox>
            <Text
              position={[0, 0, 0.02]}
              fontSize={0.12}
              color="#00ff88"
              anchorX="center"
              anchorY="middle"
            >
              {tag}
            </Text>
          </group>
        ))}
      </group>
      
      {/* View Button */}
      <group position={[0, -2.2, 0.06]}>
        <RoundedBox args={[2.5, 0.5, 0.05]} radius={0.1}>
          <meshStandardMaterial
            color={hovered ? '#00ffff' : '#00ff88'}
            emissive={hovered ? '#00ffff' : '#00ff88'}
            emissiveIntensity={hovered ? 0.5 : 0.2}
          />
        </RoundedBox>
        <Text
          position={[0, 0, 0.03]}
          fontSize={0.18}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/JetBrainsMono-Bold.woff"
        >
          VIEW PROJECT →
        </Text>
      </group>
      
      {/* Holographic Lines */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 0.8 - i * 0.8, 0.055]}>
          <planeGeometry args={[3.8, 0.01]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
};

const ProjectsCarousel = ({ projects }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  const radius = 10;
  const angleStep = (Math.PI * 2) / Math.min(projects.length, 6);

  return (
    <group ref={groupRef}>
      {projects.slice(0, 6).map((project, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const rotY = -angle + Math.PI / 2;
        
        return (
          <ProjectCard3D
            key={project.title}
            project={{ ...project, number: i + 1 }}
            position={[x, 0, z]}
            rotation={[0, rotY, 0]}
            delay={i * 0.5}
          />
        );
      })}
    </group>
  );
};

export { ProjectCard3D, ProjectsCarousel };
export default ProjectsCarousel;
