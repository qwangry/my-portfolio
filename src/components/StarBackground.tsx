import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const StarBackground = () => {
    const starsRef = useRef<THREE.Points>(null);

    // 初始化背景星空（三维球状分布）
    useEffect(() => {
        const count = 1000;
        const positions = new Float32Array(count * 3);
        const radius = 15;

        // 球面均匀分布算法
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * Math.cbrt(Math.random());
            
            positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i*3+2] = r * Math.cos(phi);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        starsRef.current!.geometry = geometry;
        starsRef.current!.material = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x88ccff,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });
    }, []);

    // 动画帧处理
    useFrame(() => {
        // 背景星空旋转动画
        if (starsRef.current) {
            starsRef.current.rotation.y += 0.002;
            starsRef.current.position.y = Math.sin(performance.now() * 0.001) * 0.5;
        }
    });

    return (
        <>
            <points ref={starsRef} />
        </>
    );
};

export default StarBackground;