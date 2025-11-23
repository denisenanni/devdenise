import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const experiences = [
  {
    title: "Front-end/Full Stack Engineer",
    company: "Outmatic",
    location: "Remote",
    period: "Dec 2022 - Present",
    description:
      "Development of new features, test and bug fixing on CMS web applications and E-commerce platforms. Working with React, ChakraUI, and started with .NET in November 2024.",
    technologies: ["React", "TypeScript", "ChakraUI", ".NET", "E-commerce"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Purple
  },
  {
    title: "DevOps and Test Engineer",
    company: "Nexum AI",
    location: "Rome - Remote",
    period: "Feb - Nov 2022",
    description:
      "Research and implementation of automation tools across software development processes. Managed delivery, testing, and deployment pipelines with Infrastructure as Code.",
    technologies: ["GCP", "GitLab", "Terraform", "NodeJS", "Helm"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", // Pink-Red
  },
  {
    title: "Full Stack Web Developer",
    company: "Technode",
    location: "Brescia - Remote",
    period: "Dec 2020 - Dec 2021",
    description:
      "New features development and bug fixing on E-commerce platform. Worked with enterprise-level commerce solutions and database optimization.",
    technologies: ["React", "WebSphere", "Java 8", "DB2", "AngularJS"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", // Blue
  },
  {
    title: "Full Stack Web Developer",
    company: "Catenate",
    location: "Rome",
    period: "Oct 2019 - Dec 2020",
    description:
      "Features development on banking CMS systems. Working with legacy and modern frameworks to implement secure and compliant banking solutions.",
    technologies: ["Java 6/7", "AngularJS", "Angular 7+"],
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", // Green-Cyan
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

const Resume = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="resume"
      ref={ref}
      className="section bg-navy-900 overflow-x-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="section-content"
      >
        {/* Header */}
        <div className="flex items-center mb-8 md:mb-12 min-w-0">
          <span className="section-number">04.</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-divider"></div>
        </div>

        {/* Interactive Experience Cards */}
        <div className="mx-auto mx-auto mb-12">
          <div className="space-y-2">
            {experiences.map((exp, index) => (
              <div
                key={index}
                data-active={index === activeIndex}
                className="relative overflow-hidden rounded-lg border border-slate-400/20 bg-navy-800
                cursor-pointer group transition-all duration-[600ms] ease-out w-full"
                style={{
                  height: index === activeIndex ? "auto" : "60px",
                  minHeight: "60px",
                }}
                onClick={() => handleInteraction(index)}
                onMouseEnter={() => handleInteraction(index)}
                onFocus={() => handleInteraction(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleInteraction(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={index === activeIndex}
              >
                {/* Background Gradient with Mask */}
                <div
                  className="absolute inset-0 transition-all duration-[720ms] ease-out
                  opacity-40
                  group-data-[active=true]:opacity-60"
                  style={{
                    background: exp.gradient,
                    maskImage:
                      "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%)",
                  }}
                />

                {/* Content */}
                <div className="relative py-3 md:p-5">
                  {/* Always Visible: Role, Company, Period */}
                  <div className="flex items-center justify-between gap-2 md:gap-4 min-h-[28px] min-w-0">
                    <div className="flex-1 flex items-center gap-2 md:gap-4 min-w-0 overflow-hidden">
                      {/* Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 flex-shrink-0 text-primary-400 opacity-60 
                        transition-opacity duration-[600ms] group-data-[active=true]:opacity-100"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M7 7h10" />
                        <path d="M7 12h10" />
                        <path d="M7 17h10" />
                      </svg>

                      {/* Title */}
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h3 className="text-xs md:text-base font-medium text-slate-100 truncate group-data-[active=true]:text-primary-400 transition-colors">
                          {exp.title} <span className="text-slate-400">@</span>
                          <span className="text-primary-400">
                            {exp.company}
                          </span>
                        </h3>
                      </div>
                    </div>

                    {/* Period */}
                    <span className="text-[10px] md:text-sm text-slate-100 font-mono whitespace-nowrap flex-shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  {/* Expandable Content */}
                  <div
                    className="overflow-hidden transition-all duration-[600ms] ease-out"
                    style={{
                      maxHeight: index === activeIndex ? "500px" : "0px",
                      opacity: index === activeIndex ? 1 : 0,
                    }}
                  >
                    <div className="pt-4 space-y-4">
                      {/* Location */}
                      <p className="text-sm text-slate-300 font-mono">
                        📍 {exp.location}
                      </p>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-slate-300">
                        {exp.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-navy-900/80 border border-primary-400/30 
                            rounded-full text-primary-400 text-xs font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mb-12"
        >
          <h3 className="text-2xl text-slate-100 mb-6 flex items-center">
            <span className="text-primary-400 font-mono text-lg mr-2">►</span>
            Certifications
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="card flex flex-col items-start gap-2 hover:border-primary-400/50 transition-colors"
              >
                <span className="text-2xl">{cert.icon}</span>
                <div>
                  <p className="text-slate-100 font-medium text-sm">
                    {cert.name}
                  </p>
                  <p className="text-slate-400 text-xs font-mono">
                    {cert.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mx-auto mb-12"
        >
          <h3 className="text-2xl text-slate-100 mb-6 flex items-center">
            <span className="text-primary-400 font-mono text-lg mr-2">►</span>
            Education
          </h3>
          <div className="space-y-4">
            <div className="card hover:border-primary-400/50 transition-colors">
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
                {["Java SE/EE", "Spring Boot", "Angular", "TypeScript"].map(
                  (tech, i) => (
                    <span key={i} className="tech-tag text-xs">
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="card hover:border-primary-400/50 transition-colors">
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
            href="/CV-Nanni-Software-Dev.pdf"
            download
            className="btn-primary inline-block"
          >
            Download Full Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;
