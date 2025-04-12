import type { IProject } from "../data/resumeData";
import { Section } from "../components/Section";

const Projects = ({ projects }: { projects: IProject[] }) => {
    return (
        <div className="container">
            {/* <Section title="项目经历"> */}
            <Section>
                {projects.map((project, index) => (
                    <div key={index} className="project-item">
                        <h3>{project.name}</h3>
                        <p>{project.date}</p>
                        <p>{project.description}</p>
                        <p>技术栈: {project.stack.join(", ")}</p>
                        <ul>
                            {project.work.map((desc, i) => (
                                <li key={i}>{desc}</li>
                            ))}
                            {project.contributionLink && (
                                <li>
                                    <a href={project.contributionLink} target="_blank">
                                        贡献链接
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                ))}
            </Section>
        </div>
    );
};

export default Projects;
