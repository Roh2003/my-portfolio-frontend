import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const HologramMaterial = ({ color = '#00ff88' }) => {
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const shader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(color) },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      
      void main() {
        // Scanlines
        float scanline = sin(vUv.y * 200.0 + time * 5.0) * 0.1 + 0.9;
        
        // Glitch effect
        float glitch = step(0.99, random(vec2(time * 0.1, floor(vUv.y * 20.0))));
        
        // Fresnel effect
        vec3 viewDir = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - dot(viewDir, vNormal), 2.0);
        
        // Flickering
        float flicker = sin(time * 20.0) * 0.05 + 0.95;
        
        // Horizontal lines
        float lines = step(0.95, sin(vUv.y * 100.0));
        
        vec3 finalColor = color * scanline * flicker;
        finalColor += color * fresnel * 0.5;
        finalColor += glitch * vec3(1.0, 0.0, 0.5);
        
        float alpha = 0.7 + fresnel * 0.3 + lines * 0.2;
        alpha *= flicker;
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  }), [color]);

  return <shaderMaterial ref={materialRef} {...shader} />;
};

export default HologramMaterial;
