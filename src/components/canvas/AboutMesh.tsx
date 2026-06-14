import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingTorusKnot() {
  const knotRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.TorusKnotGeometry>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (knotRef.current) {
      const elapsed = state.clock.getElapsedTime();
      knotRef.current.rotation.x = elapsed * 0.25;
      knotRef.current.rotation.y = elapsed * 0.4;
    }
  });

  useEffect(() => {
    return () => {
      geoRef.current?.dispose();
      matRef.current?.dispose();
    };
  }, []);

  return (
    <mesh ref={knotRef}>
      <torusKnotGeometry ref={geoRef} args={[1, 0.3, 120, 12]} />
      <meshStandardMaterial
        ref={matRef}
        color="#7c3aed"
        emissive="#06b6d4"
        emissiveIntensity={0.25}
        wireframe={true}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

export default function AboutMesh() {
  return (
    <div className="w-full h-72 md:h-96">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 3, 5]} intensity={1.5} color="#7c3aed" />
        <pointLight position={[-5, -3, 2]} intensity={1.0} color="#06b6d4" />
        <RotatingTorusKnot />
      </Canvas>
    </div>
  );
}
