import type { IInternship } from "../data/resumeData";
import { Section } from "../components/Section";

const Internship = ({ internship }: { internship: IInternship[] }) => {
    return (
        <div className="container">
            {/* <Section title="实习经历"> */}
            <Section >
                {internship.map((intern, index) => (
                    <div key={index} className="internship-item">
                        <h3>💼{intern.company}</h3>
                        <p>{intern.position}</p>
                        <p>{intern.date}</p>
                        <ul>
                            {intern.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </Section>
        </div>
    );
};

export default Internship;
