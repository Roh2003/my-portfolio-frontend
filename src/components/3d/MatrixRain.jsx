import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MatrixRain = ({ count = 1000 }) => {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const characters = useMemo(() => {
    const chars = [];
    for (let i = 0; i < count; i++) {
      chars.push({
        position: [
          (Math.random() - 0.5) * 50,
          Math.random() * 50,
          (Math.random() - 0.5) * 50
        ],
        speed: Math.random() * 0.5 + 0.1,
        char: String.fromCharCode(0x30A0 + Math.random() * 96),
        scale: Math.random() * 0.5 + 0.3
      });
    }
    return chars;
  }, [count]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    characters.forEach((char, i) => {
      char.position[1] -= char.speed;
      if (char.position[1] < -25) {
        char.position[1] = 25;
        char.char = String.fromCharCode(0x30A0 + Math.random() * 96);
      }
      
      dummy.position.set(...char.position);
      dummy.scale.setScalar(char.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <planeGeometry args={[0.3, 0.3]} />
      <meshBasicMaterial 
        color="#00ff00" 
        transparent 
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};

export default MatrixRain;
