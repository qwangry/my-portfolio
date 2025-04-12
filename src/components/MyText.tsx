import { Text3D } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const MyText = ({children,position,props}:{children:string,position:[number, number, number],props:any}) => {
    const fontUrl = '/fonts/helvetiker_regular.typeface.json'
    const textRef = useRef<THREE.Mesh>(null)
    const LOCAL_MATCAP = '/matcaps/1D3FCC_051B5F_81A0F2_5579E9-256px.png'
    const matcapTexture = useLoader(THREE.TextureLoader, LOCAL_MATCAP)

    // 微震动画参数
    const initialPosition = new THREE.Vector3(0, 1, -1) // 固定位置
    const amplitude = 0.03 // 震动幅度
    const frequency = 2.5  // 震动频率

    useFrame(({ clock }) => {
        if (textRef.current) {
            // 使用噪声函数创造更自然的震动
            const time = clock.getElapsedTime()
            textRef.current.position.x = initialPosition.x + Math.sin(time * frequency) * amplitude
            textRef.current.position.y = initialPosition.y + Math.cos(time * frequency * 0.8) * amplitude
            textRef.current.position.z = initialPosition.z + Math.sin(time * frequency * 0.5) * amplitude
        }
        
    })

    return (
        <group position={position}>
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