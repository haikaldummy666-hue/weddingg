import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Stars, Sparkles, Float, Text, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { EnvironmentContext } from '@/hooks/useEnvironment';

interface QuantumPortalProps {
  dimension: EnvironmentContext['dimension'];
  isOpening?: boolean;
}

// Helper to get dimension colors
const getDimensionTheme = (dim: string) => {
  switch (dim) {
    case 'futuristic-jakarta': return { primary: '#00f2ff', secondary: '#ff00aa', ambient: '#111122', fog: '#050510' };
    case 'ancient-forest': return { primary: '#44ff44', secondary: '#ffaa00', ambient: '#051005', fog: '#020502' };
    case 'ice-kingdom': return { primary: '#aaccff', secondary: '#ffffff', ambient: '#051020', fog: '#020510' };
    case 'coastal-paradise': return { primary: '#00aaff', secondary: '#ffcc00', ambient: '#102030', fog: '#051015' };
    default: return { primary: '#ffaa00', secondary: '#c04000', ambient: '#1a0b0b', fog: '#100505' }; // Quantum Mahogany
  }
};

const PortalFrame = ({ theme, isOpening }: { theme: any, isOpening?: boolean }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Quantum Vibration
    const t = state.clock.elapsedTime;
    const shake = isOpening ? 0.5 : 0.02;
    meshRef.current.position.x = Math.sin(t * 50) * shake;
    meshRef.current.position.y = Math.cos(t * 45) * shake;
    
    // Pulse scale
    const scalePulse = 1 + Math.sin(t * 2) * 0.05;
    meshRef.current.scale.set(scalePulse, scalePulse, scalePulse);
  });

  return (
    <group ref={meshRef}>
      {/* Outer Frame (Mahogany) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 9, 0.5]} />
        <meshStandardMaterial 
            color="#4a0404" 
            roughness={0.3} 
            metalness={0.4} 
            emissive={theme.secondary}
            emissiveIntensity={0.2}
        />
      </mesh>
      {/* Inner Void (Portal) */}
      <mesh position={[0, 0, 0.26]}>
        <planeGeometry args={[5, 8]} />
        <meshBasicMaterial color="black" />
      </mesh>
      {/* Glowing Border */}
      <mesh position={[0, 0, 0.27]}>
         <ringGeometry args={[0, 4, 4]} /> {/* Simplistic glow simulation */}
         <meshBasicMaterial color={theme.primary} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Portal Swirl (Simulated with particles or just a colored plane for now) */}
      <mesh position={[0, 0, 0.3]}>
        <planeGeometry args={[4.8, 7.8]} />
        <meshStandardMaterial 
            color={theme.primary} 
            emissive={theme.primary} 
            emissiveIntensity={2} 
            transparent 
            opacity={0.1} 
        />
      </mesh>
    </group>
  );
};

const FloatingShards = ({ theme, count = 30 }: { theme: any, count?: number }) => {
    const shards = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10 + 2
            ] as [number, number, number],
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
            scale: Math.random() * 0.5 + 0.1,
            speed: Math.random() * 0.5 + 0.1
        }));
    }, [count]);

    return (
        <group>
            {shards.map((shard, i) => (
                <Float key={i} speed={shard.speed} rotationIntensity={2} floatIntensity={2}>
                    <mesh position={shard.position} rotation={shard.rotation} scale={shard.scale}>
                        <tetrahedronGeometry args={[1]} />
                        <meshStandardMaterial 
                            color="#4a0404" 
                            roughness={0.2} 
                            metalness={0.8}
                            emissive={theme.secondary}
                            emissiveIntensity={0.5}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

const Scene = ({ dimension, isOpening }: { dimension: string, isOpening?: boolean }) => {
    const theme = getDimensionTheme(dimension);

    useFrame((state) => {
        if (isOpening) {
            state.camera.position.z -= 0.2; // Fly through
        } else {
            // Subtle idle cam movement
            const t = state.clock.elapsedTime;
            state.camera.position.x = Math.sin(t * 0.5) * 2;
            state.camera.lookAt(0, 0, 0);
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} color={theme.ambient} />
            <pointLight position={[10, 10, 10]} intensity={2} color={theme.primary} />
            <pointLight position={[-10, -10, 5]} intensity={1} color={theme.secondary} />
            
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={2} />
            <fog attach="fog" args={[theme.fog, 5, 30]} />
            
            <group position={[0, 0, -5]}>
                 <PortalFrame theme={theme} isOpening={isOpening} />
            </group>

            <FloatingShards theme={theme} />
            
            <Sparkles count={200} scale={12} size={4} speed={0.4} opacity={0.5} color={theme.primary} />
        </>
    );
};

export default function QuantumPortal({ dimension, isOpening }: QuantumPortalProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Scene dimension={dimension} isOpening={isOpening} />
      </Canvas>
    </div>
  );
}
