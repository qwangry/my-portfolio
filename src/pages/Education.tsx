import type { IEducation } from "../data/resumeData";
import { Section } from "../components/Section";

const Education = ({ education }: { education: IEducation[] }) => {
    return (
        <div className="container">
            <Section>
                {education.map((edu, index) => (
                    <div key={index} className="education-card">
                        {/* 左侧Logo区域 */}
                        <a 
                            href={edu.schoolLink || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="logo-wrapper"
                        >
                            <img 
                                src={edu.logo} 
                                alt={edu.school} 
                                className="school-logo" 
                            />
                        </a>

                        {/* 右侧内容区域 */}
                        <div className="content-wrapper">
                            <div className="school-header">
                                <h3>{edu.school}</h3>
                                <p className="degree">{edu.degree}</p>
                                <p className="time">{edu.time}</p>
                            </div>

                            <div className="stats-container">
                                <div className="stat-item">
                                    <span className="stat-label">GPA:</span>
                                    <span className="stat-value">{edu.gpa}</span>
                                </div>
                                {edu.ranking && (
                                    <div className="stat-item">
                                        <span className="stat-label">排名:</span>
                                        <span className="stat-value">{edu.ranking}</span>
                                    </div>
                                )}
                            </div>

                            {edu.awards.length > 0 && (
                                <div className="awards-container">
                                    <h4>荣誉奖项</h4>
                                    <ul className="awards-list">
                                        {edu.awards.map((award, i) => (
                                            <li key={i} className="award-item">
                                                <span className="trophy-icon">🏆</span>
                                                {award}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </Section>
        </div>
    );
};
export default Education;
