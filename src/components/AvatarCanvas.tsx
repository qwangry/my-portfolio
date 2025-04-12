import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";

const AvatarPointCloud = ({ imageUrl }: { imageUrl: string }) => {
    const texture = useLoader(TextureLoader, imageUrl);
    const pointsRef = useRef<THREE.Points>(null);
    const [positions, setPositions] = useState<Float32Array | null>(null);
    const [colors, setColors] = useState<Float32Array | null>(null);
    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")!;

            const targetSize = 450;
            canvas.width = targetSize;
            canvas.height = targetSize;

            // 绘制圆形遮罩
            ctx.beginPath();
            ctx.arc(targetSize / 2, targetSize / 2, targetSize / 2 * 0.95, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(img, 0, 0, targetSize, targetSize);

            const imgData = ctx.getImageData(0, 0, targetSize, targetSize).data;
            const particles = [];
            const particleColors = [];
            const center = targetSize / 2;

            for (let y = 0; y < targetSize; y += 2) {
                for (let x = 0; x < targetSize; x += 2) {

                    const index = (y * targetSize + x) * 4;
                    const r = imgData[index] / 255; // 将 RGB 值标准化到 0~1 范围
                    const g = imgData[index + 1] / 255;
                    const b = imgData[index + 2] / 255;

                    const distance = Math.sqrt(
                        Math.pow(x - center, 2) +
                        Math.pow(y - center, 2)
                    );

                    if (distance < center * 0.9) {
                        const index = (y * targetSize + x) * 4;
                        const alpha = imgData[index + 3];

                        if (alpha > 128) {
                            const z = (imgData[index] + imgData[index + 1] + imgData[index + 2]) / 30;
                            particles.push(
                                (x - center) / 50,
                                (center - y) / 50,
                                z * 0.5
                            );
                            particleColors.push(r, g, b);
                        }
                    }
                }
            }

            setPositions(new Float32Array(particles));
            setColors(new Float32Array(particleColors)); // 更新点云的颜色
        };
    }, [imageUrl]);

    return positions ? (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    itemSize={3}
                    count={positions.length / 3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    array={colors}
                    itemSize={3}
                    count={colors.length / 3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                // color="#ffffff"
                vertexColors={true} 
                transparent
                opacity={0.9}
                sizeAttenuation
                alphaTest={0.5}
            />
        </points>
    ) : null;
};

const AvatarCanvas = ({ imageUrl }: { imageUrl: string }) => (
    <div className="canvas-container">
        <Canvas
            camera={{
                position: [0, 0, 25],
                fov: 28,
                near: 1,
                far: 100
            }}
        >
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <AvatarPointCloud imageUrl={imageUrl} />
        </Canvas>
    </div>
);

export default AvatarCanvas;