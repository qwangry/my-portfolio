import { Text3D } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface MyTextProps {
    children: string
    position: [number, number, number]
    props: any
    scrollY?: number
}

const MyText = ({ children, position, props, scrollY = 0 }: MyTextProps) => {
    const fontUrl = '/fonts/helvetiker_regular.typeface.json'
    const textRef = useRef<THREE.Mesh>(null)
    const groupRef = useRef<THREE.Group>(null)
    const LOCAL_MATCAP = '/matcaps/1D3FCC_051B5F_81A0F2_5579E9-256px.png'
    const matcapTexture = useLoader(THREE.TextureLoader, LOCAL_MATCAP)

    // 使用 ref 存储滚动值以确保帧循环中获取最新值
    const scrollYRef = useRef(scrollY)
    useEffect(() => {
        scrollYRef.current = scrollY
    }, [scrollY])

    // 微震动画参数
    const initialPosition = new THREE.Vector3(0, 1, -1) // 固定位置
    const amplitude = 0.03 // 震动幅度
    const frequency = 2.5  // 震动频率

    useFrame(({ clock }) => {
        if (groupRef.current) {
            // 将页面滚动转换为 3D 空间位移（示例：Y 轴移动）
            const yOffset = scrollYRef.current * 0.0078 // 调整此系数控制滚动速度
            groupRef.current.position.set(
                position[0],
                position[1] + yOffset, 
                position[2]
            )
        }

        if (textRef.current) {
            const time = clock.getElapsedTime()
            textRef.current.position.x = initialPosition.x + Math.sin(time * frequency) * amplitude
            textRef.current.position.y = initialPosition.y + Math.cos(time * frequency * 0.8) * amplitude
            textRef.current.position.z = initialPosition.z + Math.sin(time * frequency * 0.5) * amplitude
        }
    })

    return (
        <group ref={groupRef} position={position}>
            <Text3D
                ref={textRef}
                font={fontUrl}
                {...props}
                height={0.15}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                position={initialPosition}
                rotation={[0, 0, 0]}
                renderOrder={2} // 确保在最上层
            >
                {children}
                <meshMatcapMaterial
                    matcap={matcapTexture}
                    depthTest={false}
                    transparent
                    opacity={0.95}
                />
            </Text3D>
        </group>
    )
}

export default MyText;