import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Not a literal camera model -- an abstract low-poly aperture/lens motif
 * (nested torus rings) that reads as "cinema hardware" without the cost
 * of a detailed model. Slow independent rotation on two axes.
 */
export default function FloatingCamera({ position = [3.2, 0.4, -2] }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.06;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.08;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.15) * 0.12;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <torusGeometry args={[1, 0.02, 8, 48]} />
        <meshBasicMaterial color="#2563eb" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[0.72, 0.014, 8, 48]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.28} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 5]}>
        <torusGeometry args={[0.46, 0.012, 8, 40]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}
