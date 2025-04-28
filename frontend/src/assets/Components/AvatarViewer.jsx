// src/components/AvatarViewer.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function AvatarModel() {
  const { scene } = useGLTF('/models/sign-avatar.glb');
  return <primitive object={scene} scale={2} />;
}

export default function AvatarViewer() {
  return (
    <div className="w-full h-96 bg-gray-800 rounded-lg shadow-lg">
      <Canvas>
        <ambientLight />
        <directionalLight position={[2, 2, 2]} />
        <AvatarModel />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}