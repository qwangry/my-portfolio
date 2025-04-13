import { IContact } from "../data/resumeData"
import Scene from "../components/Scene"
import Earth from "../components/Earth"
import MyText from "../components/MyText"
import StarBackground from "../components/StarBackground"
import { Suspense, useEffect, useState } from "react"
import AvatarCanvas from "../components/AvatarCanvas"

const Home = ({ name, contact }: { name: string, contact: IContact }) => {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <div className="container">
            <Scene>
                <StarBackground />
            </Scene>
            <Scene>
                <Suspense fallback={null}>
                    <Earth />
                </Suspense>
            </Scene>

            <header className="hero-section">
                <div className="avatar-wrapper">
                    <img src="/avatar.png" alt="个人头像" className="avatar" />
                    <AvatarCanvas imageUrl="/avatar.png" />
                </div>
                <h1 className="hero-title">{name}</h1>
                <h1 className="hero-title">
                    <Scene>
                        <Suspense fallback={null}>
                            <MyText
                                children="Wang Ruying"
                                position={[-1, -1, -1]}
                                scrollY={scrollY}
                                props={{
                                    size: 0.25
                                }} />
                        </Suspense>
                    </Scene>
                </h1>
                <div className="contact-info">
                    <div className="contact-item">
                        <i className="icon fas fa-phone"></i>
                        <span>{contact.phone}</span>
                    </div>
                    <div className="contact-item">
                        <i className="icon fas fa-envelope"></i>
                        <span>{contact.email}</span>
                    </div>
                    <div className="contact-item">
                        <i className="icon fas fa-map-marker-alt"></i>
                        <span>{contact.city}</span>
                    </div>
                    <div className="contact-item">
                        <i className="icon fas fa-blog"></i>
                        <a href="https://qwangry.github.io/" target="_blank" rel="noopener noreferrer">
                            <span>个人博客</span>
                        </a>
                    </div>
                    <a href={contact.website} className="contact-button" target="_blank">
                        <i className="fab fa-github"></i>
                        GitHub主页
                    </a>
                </div>
            </header>
        </div>
    )
}
export default Home