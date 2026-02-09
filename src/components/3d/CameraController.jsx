import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const CameraController = ({ scrollProgress = 0, targetSection = 'hero' }) => {
  const cameraRef = useRef();
  const { camera } = useThree();
  
  // Camera positions for each section
  const cameraPositions = {
    hero: { position: [0, 0, 12], lookAt: [0, 0, 0], fov: 75 },
    about: { position: [8, 2, 10], lookAt: [0, 0, 0], fov: 70 },
    experience: { position: [-5, 0, 15], lookAt: [-2, 0, 0], fov: 65 },
    skills: { position: [0, 5, 18], lookAt: [0, 0, -5], fov: 80 },
    projects: { position: [0, 2, 20], lookAt: [0, 0, 0], fov: 70 },
    contact: { position: [5, 0, 12], lookAt: [0, 0, 0], fov: 75 }
  };

  useFrame((state, delta) => {
    const target = cameraPositions[targetSection] || cameraPositions.hero;
    
    // Smooth camera movement
    camera.position.lerp(
      new THREE.Vector3(...target.position),
      0.02
    );
    
    // Add subtle floating motion
    const time = state.clock.elapsedTime;
    camera.position.x += Math.sin(time * 0.3) * 0.01;
    camera.position.y += Math.cos(time * 0.2) * 0.01;
    
    // Look at target
    const lookAtTarget = new THREE.Vector3(...target.lookAt);
    camera.lookAt(lookAtTarget);
  });

  return null;
};

export default CameraController;
