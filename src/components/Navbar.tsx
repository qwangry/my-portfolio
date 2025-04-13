import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
    { path: '/', name: '首页' },
    { path: '/education', name: '教育经历' },
    { path: '/internship', name: '实习经历' },
    { path: '/projects', name: '项目经历' },
    { path: '/skills', name: '技能' },
];

export const Navbar = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // 初始化主题
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // 切换主题
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setIsOpen(false);
    };

    // 动画配置
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
            <div className="desktop-nav">
                {links.map((link) => (
                    <NavLink key={link.path} link={link} location={location} />
                ))}
                <motion.button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </motion.button>
            </div>

            {/* 移动端导航 */}
            <div className="mobile-nav-wrapper">
                <button
                    className={`hamburger-btn ${isOpen ? 'active' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="mobile-menu"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={mobileMenuVariants}
                        >
                            {links.map((link) => (
                                <motion.div key={link.path} variants={linkVariants}>
                                    <Link
                                        to={link.path}
                                        className={`mobile-link ${location.pathname === link.path ? 'active' : ''
                                            }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div variants={linkVariants}>
                                <button
                                    className="mobile-theme-toggle"
                                    onClick={toggleTheme}
                                >
                                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

const NavLink = ({ link, location }: {
    link: { path: string; name: string };
    location: { pathname: string }
}) => (
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

// SVG图标组件
const MoonIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);