import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
    { path: '/', name: '首页' },
    { path: '/education', name: '教育经历' },
    { path: '/internship', name: '实习经历' },
    { path: '/projects', name: '项目经历' },
    { path: '/skills', name: '技能' },
]


export const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const mobileMenuVariants = {
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                staggerChildren: 0.1,
                staggerDirection: -1
            }
        }
    };

    const linkVariants = {
        open: { y: 0, opacity: 1 },
        closed: { y: -20, opacity: 0 }
    };

    return (
        <nav className="navbar">
            {/* 桌面导航 */}
            {/* <header className="nav-header">
                <div className='navbar-logo'>
                    <img src="/logo.png" alt="Logo" />
                    <span>Wang Ruying</span>
                </div>
            </header> */}
            <div className="desktop-nav">
                {links.map((link) => (
                    <NavLink key={link.path} link={link} location={location} />
                ))}
            </div>

            {/* 移动端汉堡菜单 */}
            <div className="mobile-nav-wrapper">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`hamburger-btn ${isOpen ? 'active' : ''}`}
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={mobileMenuVariants}
                            className="mobile-menu"
                        >
                            {links.map((link) => (
                                <motion.div key={link.path} variants={linkVariants}>
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`mobile-link ${location.pathname === link.path ? 'active' : ''
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

const NavLink = ({ link, location }: { link: { path: string; name: string }; location: { pathname: string } }) => (
    <Link
        to={link.path}
        className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
    >
        {link.name}
        {location.pathname === link.path && (
            <motion.div
                className="underline"
                layoutId="underline"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
        )}
    </Link>
);