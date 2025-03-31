
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, useProgress, Html } from "@react-three/drei";
import FloatingCoin from "./FloatingCoin";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}%</Html>;
}

interface CoinSceneProps {
  coinColor: string;
  textColor: string;
}

const CoinScene: React.FC<CoinSceneProps> = ({ coinColor, textColor }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={40} />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
          
          <group position={[0, 0, 0]}>
            <FloatingCoin color={coinColor} textColor={textColor} />
          </group>
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CoinScene;
