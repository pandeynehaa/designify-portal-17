
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useTexture } from "@react-three/drei";

interface FloatingCoinProps {
  color: string;
  textColor: string;
}

const FloatingCoin: React.FC<FloatingCoinProps> = ({ color, textColor }) => {
  const coinRef = useRef<Mesh>(null);
  
  // Use gradient colors
  const primaryColor = color || "#ffbf00";
  const secondaryColor = "#ff8c00"; // Secondary color for edge
  
  // Animation
  useFrame((state) => {
    if (coinRef.current) {
      coinRef.current.rotation.y += 0.005;
      coinRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group>
      {/* Main coin body */}
      <mesh ref={coinRef} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.15, 32]} />
        <meshStandardMaterial color={primaryColor} metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Coin edge */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[1, 0.15, 16, 100]} />
        <meshStandardMaterial color={secondaryColor} metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Coin face (front) */}
      <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 32]} />
        <meshStandardMaterial color={primaryColor} metalness={0.5} roughness={0.1} />
      </mesh>
      
      {/* Coin face (back) */}
      <mesh position={[0, -0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 32]} />
        <meshStandardMaterial color={primaryColor} metalness={0.5} roughness={0.1} />
      </mesh>
    </group>
  );
};

export default FloatingCoin;
