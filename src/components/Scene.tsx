import { Canvas } from '@react-three/fiber'

export default function Scene({ children }: { children: React.ReactNode }) {

    const CAMERA_POSITION: [number, number, number] = [0, 0, 5]

    return (
        <Canvas
            camera={{ position: CAMERA_POSITION, fov: 45 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1 // 作为背景层
                // zIndex: 1,
                // background: '#f0f0f0' // 添加临时背景色
            }}
        >
            {/* 环境光 */}
            <ambientLight intensity={0.5} />
            {/* 点光源 */}
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            {/* <gridHelper args={[10, 10]} />
            <axesHelper scale={2} /> */}
            {children}
        </Canvas>
    )
}