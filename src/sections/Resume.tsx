import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInUp, fadeInLeft, createAnimationProps } from "../utils/animations";

const experiences = [
  {
    title: "Front-end/Full Stack Engineer",
    company: "Outmatic",
    location: "Remote",
    period: "December 2022 - Present",
    description: [
      "Development of new features, test and bug fixing on CMS web applications and E-commerce platforms",
      "Working with React, ChakraUI for frontend development",
      "Started working with .NET framework in November 2024",
      "Collaborating with cross-functional teams to deliver high-quality solutions",
    ],
    technologies: ["React", "TypeScript", "ChakraUI", ".NET", "E-commerce"],
  },
  {
    title: "DevOps and Test Engineer",
    company: "Nexum AI",
    location: "Rome - Remote",
    period: "February 2022 - November 2022",
    description: [
      "Research and implementation of automation tools across software development processes",
      "Managed delivery, testing, and deployment pipelines",
      "Infrastructure as Code using Terraform",
      "CI/CD pipeline development and optimization",
    ],
    technologies: [
      "Google Cloud Platform",
      "GitLab",
      "Terraform",
      "NodeJS",
      "Helm",
    ],
  },
  {
    title: "Full Stack Web Developer",
    company: "Technode",
    location: "Brescia - Remote",
    period: "December 2020 - December 2021",
    description: [
      "New features development and bug fixing on E-commerce platform",
      "Worked with enterprise-level commerce solutions",
      "Database management and optimization with DB2",
      "Frontend development with modern JavaScript frameworks",
    ],
    technologies: [
      "React",
      "WebSphere Commerce",
      "Java 8",
      "DB2",
      "JSTL",
      "AngularJS",
    ],
  },
  {
    title: "Full Stack Web Developer",
    company: "Catenate",
    location: "Rome",
    period: "October 2019 - December 2020",
    description: [
      "Features development on banking CMS systems",
      "Working with legacy and modern frameworks",
      "Implementing secure and compliant banking solutions",
    ],
    technologies: ["Java 6/7", "AngularJS", "Angular 7+"],
  },
];

const certifications = [
  {
    name: "Google Professional Cloud DevOps Engineer",
    date: "November 2022",
    icon: "☁️",
  },
  {
    name: "Google Associate Cloud Engineer",
    date: "June 2022",
    icon: "☁️",
  },
  {
    name: "Oracle Certified Associate, Java SE 8 Programmer",
    date: "June 2020",
    icon: "☕",
  },
];

const educationTechnologies = [
  "Java SE/EE",
  "Spring Boot",
  "Angular",
  "TypeScript",
  "Android",
  "MySQL",
];

const Resume = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="resume" ref={ref} className="section bg-navy-900">
      <motion.div
        {...createAnimationProps(fadeInUp, inView)}
        className="section-content"
      >
        {/* Header */}
        <div className="flex items-center mb-12">
          <span className="section-number">04.</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-divider"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Work Experience */}
          <div className="space-y-8 mb-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                {...createAnimationProps(
                  {
                    ...fadeInLeft,
                    transition: { ...fadeInLeft.transition, delay: index * 0.1 },
                  },
                  inView
                )}
                className="card-hover group"
              >
                <div className="mb-4">
                  <h3 className="text-xl text-slate-100 mb-2 group-hover:text-primary-400 transition-colors">
                    {exp.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <p className="text-primary-400 font-mono text-sm">
                      {exp.company}
                    </p>
                    <span className="text-slate-400">•</span>
                    <p className="text-slate-300 text-sm">{exp.location}</p>
                  </div>
                  <p className="text-slate-400 font-mono text-xs">
                    {exp.period}
                  </p>
                </div>

                <ul className="space-y-2 text-slate-300 mb-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex">
                      <span className="text-primary-400 mr-2 mt-1 flex-shrink-0">
                        ▹
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            {...createAnimationProps(
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.5 },
              },
              inView
            )}
            className="mb-12"
          >
            <h3 className="text-2xl text-slate-100 mb-6 flex items-center">
              <span className="text-primary-400 font-mono text-lg mr-2">►</span>
              Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="card flex items-start gap-3">
                  <span className="text-2xl">{cert.icon}</span>
                  <div>
                    <p className="text-slate-100 font-medium">{cert.name}</p>
                    <p className="text-slate-400 text-sm font-mono">
                      {cert.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            {...createAnimationProps(
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.6 },
              },
              inView
            )}
            className="mb-12"
          >
            <h3 className="text-2xl text-slate-100 mb-6 flex items-center">
              <span className="text-primary-400 font-mono text-lg mr-2">►</span>
              Education
            </h3>
            <div className="space-y-4">
              <div className="card">
                <h4 className="text-slate-100 font-medium mb-2">
                  Software and App Development Course
                </h4>
                <p className="text-primary-400 font-mono text-sm mb-2">
                  Accademia Informatica | December 2018 - June 2019
                </p>
                <p className="text-slate-300 text-sm mb-3">
                  800-hour intensive course covering full-stack web and mobile
                  development
                </p>
                <div className="flex flex-wrap gap-2">
                  {educationTechnologies.map((tech, i) => (
                    <span key={i} className="tech-tag text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card">
                <h4 className="text-slate-100 font-medium mb-2">
                  Bachelor's Degree in Political Science
                </h4>
                <p className="text-primary-400 font-mono text-sm">
                  La Sapienza University, Rome | 2010 - 2014
                </p>
              </div>
            </div>
          </motion.div>

          {/* Download Resume Button */}
          <div className="text-center">
            <a
              href="/CV-Nanni-ENG.pdf"
              download
              className="btn-primary inline-block"
            >
              Download Full Resume
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;
