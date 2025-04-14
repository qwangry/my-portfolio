import { useLoader, useThree } from '@react-three/fiber'
import { TextureLoader, Vector3, MathUtils } from 'three'
import { Html, OrbitControls } from '@react-three/drei'
import { useEffect, useRef, useState, useCallback } from 'react'
import debounce from '../common/debounce'
import { useViewport } from '../hooks/useViewport'

// 配置参数
const EARTH_CONFIG = {
    pc: {
        radius: 1.5,
        cameraZ: 5
    },
    mobile: {
        radius: 0.8,
        cameraZ: 4
    },
    marker: {
        lat: 39.9042,
        lng: 116.4074,
        size: 0.03,
        color: '#ff4444',
        glowWidth: 2 // 光圈线宽（像素）
    }
}

export default function Earth() {
    const { camera } = useThree()
    const controlsRef = useRef<any>(null)
    const { isMobile } = useViewport()
    const [earthRadius, setEarthRadius] = useState(isMobile ? EARTH_CONFIG.mobile.radius : EARTH_CONFIG.pc.radius)

    // 精确坐标计算
    const calculateMarkerPosition = useCallback(() => {
        const { lat, lng, size } = EARTH_CONFIG.marker
        // const radius = earthRadius + size * 1.2 // 增加偏移量补偿
        const radius = earthRadius + size * 0.5 // 增加偏移量补偿

        const adjustedLat = lat - 1.0
        const phi = MathUtils.degToRad(90 - adjustedLat)
        const theta = MathUtils.degToRad(lng + 180)

        return new Vector3(
            -radius * Math.sin(phi) * Math.cos(theta),
            // radius * Math.cos(phi),
            radius * Math.cos(phi) * 0.98,
            radius * Math.sin(phi) * Math.sin(theta)
        )
    }, [earthRadius])

    // 响应式逻辑（强制更新）
    useEffect(() => {
        const updateDimensions = () => {
            setEarthRadius(isMobile ? EARTH_CONFIG.mobile.radius : EARTH_CONFIG.pc.radius)
            camera.position.z = isMobile ? EARTH_CONFIG.mobile.cameraZ : EARTH_CONFIG.pc.cameraZ
            camera.updateProjectionMatrix()
            controlsRef.current?.update()
        }

        // 添加防抖优化
        const debouncedUpdate = debounce(updateDimensions, 100)
        window.addEventListener('resize', debouncedUpdate)
        return () => window.removeEventListener('resize', debouncedUpdate)
    }, [camera, isMobile])

    // 加载纹理
    const [colorMap] = useLoader(TextureLoader, ['/AS17-148-22727_lrg.jpg'])

    // 初始化视角
    useEffect(() => {
        camera.lookAt(calculateMarkerPosition())
    }, [earthRadius, camera, calculateMarkerPosition])

    return (
        <group>
            {/* 地球主体 */}
            <mesh rotation={[0, 0, 0.23]}>
                <sphereGeometry args={[earthRadius, 64, 64]} />
                <meshPhongMaterial
                    map={colorMap}
                    bumpScale={0.05}
                    specular="#555555"
                    shininess={100}
                />
            </mesh>

            {/* 控制器 */}
            <OrbitControls
                ref={controlsRef}
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.3}
                enablePan={!isMobile}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
            />

            {/* 北京标记点 */}
            <mesh position={calculateMarkerPosition()}>
                <sphereGeometry args={[EARTH_CONFIG.marker.size, 32, 32]} />
                <meshStandardMaterial
                    color={EARTH_CONFIG.marker.color}
                    emissive="#ff0000"
                    emissiveIntensity={2}
                    roughness={0.2}
                    metalness={0.9}
                />

                <Html
                    center
                    distanceFactor={5}
                    transform
                    style={{
                        pointerEvents: 'none',
                        width: '50px',
                        height: '50px'
                    }}
                >
                    <div className="glow-container">
                        <div className="glow-core"></div>
                        <div className="glow-ripple"></div>
                    </div>
                </Html>
            </mesh>
        </group>
    )
}