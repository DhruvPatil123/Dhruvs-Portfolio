import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.SphereGeometry>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed * 0.15;
      meshRef.current.rotation.x = elapsed * 0.05;
      meshRef.current.position.y = Math.sin(elapsed * 0.8) * 0.15;
    }
  });

  useEffect(() => {
    return () => {
      geoRef.current?.dispose();
      matRef.current?.dispose();
    };
  }, []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry ref={geoRef} args={[1.5, 24, 24]} />
      <meshStandardMaterial
        ref={matRef}
        color="#06b6d4"
        emissive="#7c3aed"
        emissiveIntensity={0.6}
        wireframe={true}
        transparent={true}
        opacity={0.15}
      />
    </mesh>
  );
}

export default function ContactOrb() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 2]} intensity={1.0} color="#7c3aed" />
        <pointLight position={[-5, -5, -2]} intensity={0.8} color="#06b6d4" />
        <FloatingOrb />
      </Canvas>
    </div>
  );
}
