import { useRef, useMemo, Suspense } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Sparkles, Cloud, Environment } from "@react-three/drei";

// Soft Ethereal Bokeh (Floating soft spheres)
const EtherealBokeh = ({ count = 20, color }: { count?: number, color: string }) => {
    const groupRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if (!groupRef.current) return;
        // Very slow, barely noticeable rotation for the whole group
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    });

    const particles = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10 - 2
            ] as [number, number, number],
            scale: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
            speed: Math.random() * 0.2 + 0.05
        }));
    }, [count]);

    return (
        <group ref={groupRef}>
            {particles.map((p, i) => (
                <Float key={i} speed={p.speed} rotationIntensity={0.2} floatIntensity={1}>
                    <mesh position={p.position}>
                        <sphereGeometry args={[p.scale, 32, 32]} />
                        <meshPhysicalMaterial 
                            color={color}
                            transparent
                            opacity={p.opacity}
                            roughness={0}
                            metalness={0.1}
                            transmission={0.5} // Glass-like
                            thickness={1}
                            clearcoat={1}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

// Cinematic Fog / Light Beams simulation using large soft planes
const LightBeams = () => {
    return (
        <group position={[0, 5, -5]} rotation={[0, 0, Math.PI / 4]}>
            {/* Soft Light Rays */}
             <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <mesh position={[2, 0, 0]} rotation={[0, 0, 0.2]}>
                    <planeGeometry args={[2, 15]} />
                    <meshBasicMaterial 
                        color="#FFF" 
                        transparent 
                        opacity={0.03} 
                        side={THREE.DoubleSide}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </mesh>
            </Float>
             <Float speed={0.7} rotationIntensity={0.1} floatIntensity={0.3}>
                <mesh position={[-2, 1, 0]} rotation={[0, 0, -0.1]}>
                    <planeGeometry args={[3, 18]} />
                    <meshBasicMaterial 
                        color="#FFEFD5" // Papaya Whip / Soft Cream
                        transparent 
                        opacity={0.02} 
                        side={THREE.DoubleSide}
                        blending={THREE.AdditiveBlending}
                         depthWrite={false}
                    />
                </mesh>
            </Float>
        </group>
    );
}


interface ElegantBackgroundProps {
  isOpening?: boolean;
  theme?: 'gold' | 'mahogany' | 'midnight';
}

const Scene = ({ isOpening, theme = 'gold' }: ElegantBackgroundProps) => {
    // Elegant, muted colors. No flashy gold.
    const bokehColor = useMemo(() => {
        switch (theme) {
            case 'mahogany': return '#D2B48C'; // Tan/Soft Brown
            case 'midnight': return '#B0C4DE'; // Light Steel Blue (Soft Silver)
            default: return '#F5DEB3'; // Wheat/Soft Champagne
        }
    }, [theme]);

    useFrame((state) => {
        // Extremely subtle camera movement - barely breathing
        const t = state.clock.getElapsedTime();
        state.camera.position.z = 6 + Math.sin(t * 0.05) * 0.2; 
    });

    return (
        <>
            {/* Deep, Expensive Background Color */}
            {/* Very Dark Mahogany: #1a0b0b to Black fade */}
            <color attach="background" args={['#120505']} /> 
            <fog attach="fog" args={['#120505', 5, 25]} />

            {/* Soft, Cinematic Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#FFF" />
            <spotLight position={[-10, 5, 0]} angle={0.3} penumbra={1} intensity={1} color={bokehColor} />

            {/* Main Visuals: Minimalist & Slow */}
            <group position={[0, 0, 0]}>
                <EtherealBokeh color={bokehColor} />
                <LightBeams />
                
                {/* Very subtle sparkles, much fewer and slower */}
                <Sparkles 
                    count={30} 
                    scale={[12, 12, 10]} 
                    size={2} 
                    speed={0.1} 
                    opacity={0.3} 
                    color="#FFF" 
                />
            </group>
            
            {/* Studio Environment for subtle reflections on the bokeh spheres */}
            <Environment preset="studio" />
        </>
    );
};

export default function ElegantBackground(props: ElegantBackgroundProps) {
    return (
        <Canvas 
            camera={{ position: [0, 0, 6], fov: 45 }} 
            style={{ width: '100%', height: '100%' }}
            gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        >
            <Suspense fallback={null}>
                <Scene {...props} />
            </Suspense>
        </Canvas>
    );
}
