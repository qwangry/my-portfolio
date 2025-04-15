import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const StarBackground = ({ count = 1000, color = 0xfff988 }) => {
    const starsRef = useRef<THREE.Points>(null);
    const radius = 15;
    
    const geometry = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * Math.cbrt(Math.random());
            positions.set([
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi),
            ], i * 3);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [count]);


    const material = useMemo(() => new THREE.PointsMaterial({
        size: 0.05,
        color,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    }), [color]);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (starsRef.current) {
            starsRef.current.rotation.y = t * 0.2;
            starsRef.current.position.y = Math.sin(t) * 0.5;
        }
    });

    return (
        <>
            <points ref={starsRef} geometry={geometry} material={material} />
        </>
    );
};

export default StarBackground;