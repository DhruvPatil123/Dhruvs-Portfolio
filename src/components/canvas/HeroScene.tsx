import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 6,000-particle starfield component with buffer geometries
function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 6000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute stars in a spherical shell around the scene
      const radius = 15 + Math.random() * 25;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Distribute color accents (White, Cyan, Violet)
      const randomType = Math.random();
      if (randomType < 0.25) {
        // Cyan Star
        col[i * 3] = 0.02;
        col[i * 3 + 1] = 0.71;
        col[i * 3 + 2] = 0.83;
      } else if (randomType < 0.5) {
        // Violet Star
        col[i * 3] = 0.49;
        col[i * 3 + 1] = 0.23;
        col[i * 3 + 2] = 0.93;
      } else {
        // Bright White Star
        col[i * 3] = 0.95;
        col[i * 3 + 1] = 0.96;
        col[i * 3 + 2] = 0.98;
      }
    }

    return [pos, col];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const elapsed = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = elapsed * 0.015;
      pointsRef.current.rotation.x = elapsed * 0.005;
    }
  });

  const geoRef = useRef<THREE.BufferGeometry>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  useEffect(() => {
    return () => {
      // Explicit manual disposal of buffers and material
      geoRef.current?.dispose();
      matRef.current?.dispose();
    };
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Wireframe Icosahedron rotating in the center
function CentralIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.IcosahedronGeometry>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const elapsed = state.clock.getElapsedTime();
      meshRef.current.rotation.y = elapsed * 0.1;
      meshRef.current.rotation.x = elapsed * 0.08;
    }
  });

  useEffect(() => {
    return () => {
      geoRef.current?.dispose();
      matRef.current?.dispose();
    };
  }, []);

  return (
    <mesh ref={meshRef} scale={2.5}>
      <icosahedronGeometry ref={geoRef} args={[1, 1]} />
      <meshBasicMaterial
        ref={matRef}
        color="#7c3aed"
        wireframe={true}
        transparent={true}
        opacity={0.45}
      />
    </mesh>
  );
}

// Glowing rings orbiting the central sphere
function GlowingTorusRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const geo1Ref = useRef<THREE.TorusGeometry>(null);
  const geo2Ref = useRef<THREE.TorusGeometry>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = elapsed * 0.12;
      ring1Ref.current.rotation.y = elapsed * 0.18;
      ring1Ref.current.position.y = Math.sin(elapsed * 0.5) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -elapsed * 0.15;
      ring2Ref.current.rotation.z = elapsed * 0.1;
      ring2Ref.current.position.x = Math.cos(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  useEffect(() => {
    return () => {
      geo1Ref.current?.dispose();
      geo2Ref.current?.dispose();
      matRef.current?.dispose();
    };
  }, []);

  return (
    <group>
      {/* Outer Cyan Ring */}
      <mesh ref={ring1Ref} scale={3.2}>
        <torusGeometry ref={geo1Ref} args={[1, 0.025, 12, 64]} />
        <meshStandardMaterial
          ref={matRef}
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.2}
          wireframe
        />
      </mesh>
      {/* Slightly Wider Ring */}
      <mesh ref={ring2Ref} scale={4.0}>
        <torusGeometry ref={geo2Ref} args={[1.15, 0.015, 10, 64]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        
        {/* Neon point lights around the center element */}
        <pointLight position={[10, 5, 5]} intensity={1.5} color="#7c3aed" />
        <pointLight position={[-10, -5, 5]} intensity={1.2} color="#06b6d4" />
        <pointLight position={[0, 0, 10]} intensity={1.0} color="#ffffff" />
        
        <Starfield />
        <CentralIcosahedron />
        <GlowingTorusRings />

        <OrbitControls
          autoRotate={true}
          autoRotateSpeed={0.5}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
