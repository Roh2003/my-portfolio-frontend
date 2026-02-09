import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CyberGrid = () => {
  const gridRef = useRef();
  const pulseRef = useRef(0);

  useFrame((state) => {
    if (gridRef.current) {
      pulseRef.current += 0.02;
      gridRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const gridShader = {
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color('#00ff88') },
      color2: { value: new THREE.Color('#00ffff') },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float time;
      
      void main() {
        vUv = uv;
        vPosition = position;
        
        vec3 pos = position;
        float wave = sin(pos.x * 0.5 + time) * 0.5 + sin(pos.z * 0.5 + time * 0.7) * 0.5;
        pos.y += wave * 0.3;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vec2 grid = abs(fract(vUv * 50.0 - 0.5) - 0.5) / fwidth(vUv * 50.0);
        float line = min(grid.x, grid.y);
        float gridLine = 1.0 - min(line, 1.0);
        
        float pulse = sin(vPosition.x * 0.1 + time * 2.0) * 0.5 + 0.5;
        vec3 finalColor = mix(color1, color2, pulse);
        
        float dist = length(vUv - 0.5);
        float fade = 1.0 - smoothstep(0.3, 0.5, dist);
        
        gl_FragColor = vec4(finalColor, gridLine * 0.3 * fade);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  };

  return (
    <mesh 
      ref={gridRef} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -5, 0]}
    >
      <planeGeometry args={[100, 100, 100, 100]} />
      <shaderMaterial {...gridShader} />
    </mesh>
  );
};

export default CyberGrid;
