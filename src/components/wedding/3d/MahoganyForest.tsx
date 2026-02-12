import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Props for customization
interface MahoganyForestProps {
  locationType: 'urban' | 'wild';
  timeOfDay: 'morning' | 'day' | 'afternoon' | 'night';
  isOpening?: boolean;
}

const Tree = ({ position, scale, color }: { position: [number, number, number], scale: [number, number, number], color: string }) => {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, scale[1] / 2, 0]}>
        <cylinderGeometry args={[0.2 * scale[0], 0.4 * scale[0], scale[1], 8]} />
        <meshStandardMaterial 
            color={color} 
            roughness={0.6} 
            metalness={0.1}
            emissive={color}
            emissiveIntensity={0.1}
        />
      </mesh>
      {/* Leaves (Low Poly) */}
      <mesh position={[0, scale[1], 0]}>
        <dodecahedronGeometry args={[1.5 * scale[0], 0]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.8} />
      </mesh>
    </group>
  );
};

const ForestScene = ({ locationType, timeOfDay }: { locationType: string, timeOfDay: string }) => {
  // Procedural generation of trees
  const treeCount = locationType === 'wild' ? 50 : 20;
  const trees = useMemo(() => {
    const temp = [];
    for (let i = 0; i < treeCount; i++) {
      const x = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50 - 10; // Shift back
      const height = 5 + Math.random() * 5;
      const scale = 0.8 + Math.random() * 0.4;
      // Mahogany colors: Reddish brown
      const colors = ['#4a0404', '#661a0a', '#3b0d05'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      temp.push({ position: [x, 0, z] as [number, number, number], scale: [scale, height, scale] as [number, number, number], color });
    }
    return temp;
  }, [treeCount]);

  // Urban elements (cubes/structures)
  const urbanStructures = useMemo(() => {
    if (locationType !== 'urban') return [];
    const temp = [];
    for (let i = 0; i < 10; i++) {
        const x = (Math.random() - 0.5) * 40;
        const z = (Math.random() - 0.5) * 40 - 15;
        temp.push({ position: [x, 2, z] as [number, number, number] });
    }
    return temp;
  }, [locationType]);

  // Lighting based on time
  const lightColor = timeOfDay === 'night' ? '#4a5e8c' : '#ffaa00';
  const ambientIntensity = timeOfDay === 'night' ? 0.2 : 0.5;

  return (
    <>
      <ambientLight intensity={ambientIntensity} color={timeOfDay === 'night' ? '#1a1a3a' : '#ffffff'} />
      <pointLight 
        position={[10, 20, 10]} 
        intensity={timeOfDay === 'night' ? 0.5 : 1.5} 
        color={lightColor} 
        castShadow
      />
      {timeOfDay === 'night' && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
      
      {/* Fog for mystery */}
      <fog attach="fog" args={[timeOfDay === 'night' ? '#050505' : '#3d1c1c', 5, 40]} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a0b0b" roughness={1} />
      </mesh>

      {/* Trees */}
      {trees.map((tree, i) => (
        <Tree key={i} {...tree} />
      ))}

      {/* Urban Structures */}
      {urbanStructures.map((struct, i) => (
        <mesh key={`urban-${i}`} position={struct.position}>
            <boxGeometry args={[2, 10, 2]} />
            <meshStandardMaterial color="#333" roughness={0.2} metalness={0.8} opacity={0.7} transparent />
        </mesh>
      ))}

      {/* Particles/Fireflies */}
      <Sparkles 
        count={200} 
        scale={40} 
        size={4} 
        speed={0.4} 
        opacity={0.7} 
        color={timeOfDay === 'night' ? "#aaffff" : "#ffaa00"} 
      />

      {/* Moving Cloud/Mist */}
      <Cloud opacity={0.5} speed={0.4} width={50} depth={5} segments={20} color={timeOfDay === 'night' ? "#202030" : "#d18e8e"} position={[0, 10, -20]} />
    </>
  );
};

const CameraRig = ({ mouse, isOpening }: { mouse: React.MutableRefObject<[number, number]>, isOpening?: boolean }) => {
    useFrame((state) => {
        if (isOpening) {
            // Fly through animation
            state.camera.position.z -= 0.5;
            state.camera.position.y += 0.05;
        } else {
            // Idle mouse movement
            state.camera.position.x += (mouse.current[0] * 5 - state.camera.position.x) * 0.05;
            state.camera.position.y += (mouse.current[1] * 2 + 5 - state.camera.position.y) * 0.05;
            state.camera.lookAt(0, 3, 0);
        }
    });
    return null;
}

export default function MahoganyForest({ locationType, timeOfDay, isOpening }: MahoganyForestProps) {
    const mouse = useRef<[number, number]>([0, 0]);

    const handleMouseMove = (e: React.MouseEvent) => {
        mouse.current = [
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1
        ];
    };

    return (
        <div className="absolute inset-0 w-full h-full -z-10" onMouseMove={handleMouseMove}>
            <Canvas shadows camera={{ position: [0, 5, 20], fov: 60 }}>
                <ForestScene locationType={locationType} timeOfDay={timeOfDay} />
                <CameraRig mouse={mouse} isOpening={isOpening} />
            </Canvas>
        </div>
    );
}
