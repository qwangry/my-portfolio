import { Section } from "../components/Section";

const Skill = ({ skills }: { skills: string[] }) => {
    // 图标映射关系
    const iconMap = {
        'HTML5': 'fab fa-html5',
        'CSS3': 'fab fa-css3-alt',
        'JavaScript': 'fab fa-js-square',
        'React': 'fab fa-react',
        'TypeScript': 'fas fa-code',
        'Webpack': 'fas fa-cube',
        'Vite': 'fas fa-bolt',
        'Playwright': 'fas fa-vial',
        '计算机网络': 'fas fa-network-wired',
        '数据结构': 'fas fa-shapes',
        '算法': 'fas fa-sitemap',
        'Java': 'fab fa-java',
        'Python': 'fab fa-python',
        'MySQL': 'fas fa-database',
        'Linux': 'fab fa-linux',
        'Nginx': 'fas fa-server',
        'GitHub': 'fab fa-github'
    };

    // 颜色映射
    const colorMap = {
        '前端技术': '#E44D26',
        '构建工具': '#61DAFB',
        '测试工具': '#FF6B6B',
        '计算机基础': '#4D4DFF',
        '后端技术': '#38B2AC',
        '运维部署': '#2EB872'
    };

    const getSkillInfo = (skill: string) => {
        const match = Object.keys(iconMap).find(key => skill.includes(key));
        const category = Object.keys(colorMap).find(cat => skill.includes(cat)) || '默认';
        
        return {
            icon: match ? iconMap[match as keyof typeof iconMap] : 'fas fa-code',
            color: colorMap[category as keyof typeof colorMap] || '#2a6df5',
            category
        };
    };

    return (
        <div className="container">
            <Section>
                <div className="skills-grid">
                    {skills.map((skill, index) => {
                        const { icon, color, category } = getSkillInfo(skill);
                        
                        return (
                            <div 
                                key={index} 
                                className="skill-card"
                                data-category={category.toLowerCase()}
                            >
                                <div 
                                    className="icon-wrapper"
                                    style={{ '--icon-color': color } as React.CSSProperties}
                                >
                                    <i className={`${icon} skill-icon`}></i>
                                </div>
                                <p className="skill-text">{skill}</p>
                            </div>
                        );
                    })}
                </div>
            </Section>
        </div>
    );
};
export default Skill;
