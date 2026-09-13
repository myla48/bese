import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import FilmParticles from "./FilmParticles";
import FloatingCamera from "./FloatingCamera";

function ParallaxRig({ children }) {
  const groupRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y +=
      (target.current.x * 0.06 - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x +=
      (-target.current.y * 0.04 - groupRef.current.rotation.x) * 0.02;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function CinematicScene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
      setIsTablet(window.innerWidth > 480 && window.innerWidth <= 1024);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (reducedMotion && isMobile) return null;

  const isDesktop = !isMobile && !isTablet;
  const particleCount = isMobile ? 50 : isTablet ? 90 : 220;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, isMobile ? 1.25 : 1.75]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <Suspense fallback={null}>
          {reducedMotion ? (
            <FilmParticles count={particleCount} />
          ) : (
            <ParallaxRig>
              <FilmParticles count={particleCount} />
              {isDesktop && <FloatingCamera />}
            </ParallaxRig>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
