import { useState } from "react";
import { Window } from "../components/desktop";
import resumePdf from "../assets/CV-Nanni-Software-Dev.pdf";

const experiences = Object.freeze([
  {
    id: "outmatic-2022",
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
    id: "nexum-2022",
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
    id: "technode-2020",
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
    id: "catenate-2019",
    title: "Full Stack Web Developer",
    company: "Catenate",
    location: "Rome",
    period: "Oct 2019 - Dec 2020",
    description:
      "Features development on banking CMS systems. Working with legacy and modern frameworks to implement secure and compliant banking solutions.",
    technologies: ["Java 6/7", "AngularJS", "Angular 7+"],
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", // Green-Cyan
  },
]);

const certifications = Object.freeze([
  {
    id: "gcp-devops-2022",
    name: "Google Professional Cloud DevOps Engineer",
    date: "November 2022",
    icon: "☁️",
  },
  {
    id: "gcp-ace-2022",
    name: "Google Associate Cloud Engineer",
    date: "June 2022",
    icon: "☁️",
  },
  {
    id: "oracle-java-2020",
    name: "Oracle Certified Associate, Java SE 8 Programmer",
    date: "June 2020",
    icon: "☕",
  },
]);

const documentIcon = (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
);

const Resume = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="resume" className="min-h-screen flex items-center justify-center p-6 py-20">
      <Window
        title="Resume - Experience & Education"
        icon={documentIcon}
        className="w-full max-w-4xl"
      >
        <div className="p-6 max-h-[70vh] overflow-y-auto">

        {/* Experience Section Header */}
        <h3
          className="text-xl mb-6 flex items-center"
          style={{ color: 'var(--text-primary)' }}
        >
          <span style={{ color: 'var(--accent)' }} className="mr-2">►</span>
          Experience
        </h3>

        {/* Interactive Experience Cards */}
        <div className="mb-8">
          <div className="space-y-2">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                data-active={index === activeIndex}
                className="relative overflow-hidden rounded-lg cursor-pointer group transition-all duration-[600ms] ease-out w-full"
                style={{
                  height: index === activeIndex ? "auto" : "60px",
                  minHeight: "60px",
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--window-border)',
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
                  className="absolute inset-0 transition-all duration-[720ms] ease-out opacity-40 group-data-[active=true]:opacity-60"
                  style={{
                    background: exp.gradient,
                    maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%)",
                  }}
                />

                {/* Content */}
                <div className="relative py-3 md:p-5 p-2">
                  <div className="flex items-center justify-between gap-2 md:gap-4 min-h-[28px] min-w-0">
                    <div className="flex-1 flex items-center gap-2 md:gap-4 min-w-0 overflow-hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 flex-shrink-0 opacity-60 transition-opacity duration-[600ms] group-data-[active=true]:opacity-100"
                        style={{ color: 'var(--accent)' }}
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M7 7h10" />
                        <path d="M7 12h10" />
                        <path d="M7 17h10" />
                      </svg>

                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h3 className="text-xs md:text-base font-medium truncate transition-colors" style={{ color: 'var(--text-primary)' }}>
                          {exp.title} <span style={{ color: 'var(--text-muted)' }}>@</span>
                          <span style={{ color: 'var(--accent)' }}> {exp.company}</span>
                        </h3>
                      </div>
                    </div>

                    <span
                      className="text-[10px] md:text-sm whitespace-nowrap flex-shrink-0"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
                    >
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
                      <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        📍 {exp.location}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs"
                            style={{
                              backgroundColor: 'var(--bg-primary)',
                              border: '1px solid var(--accent)',
                              color: 'var(--accent)',
                              fontFamily: 'var(--font-mono)',
                            }}
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
        <div className="mb-8">
          <h3
            className="text-xl mb-6 flex items-center"
            style={{ color: 'var(--text-primary)' }}
          >
            <span style={{ color: 'var(--accent)' }} className="mr-2">►</span>
            Certifications
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-lg flex flex-col items-start gap-2 transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--window-border)',
                }}
              >
                <span className="text-2xl">{cert.icon}</span>
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                    {cert.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {cert.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h3
            className="text-xl mb-6 flex items-center"
            style={{ color: 'var(--text-primary)' }}
          >
            <span style={{ color: 'var(--accent)' }} className="mr-2">►</span>
            Education
          </h3>
          <div className="space-y-4">
            <div
              className="p-4 rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--window-border)',
              }}
            >
              <h4 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Software and App Development Course
              </h4>
              <p className="text-sm mb-2" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                Accademia Informatica | December 2018 - June 2019
              </p>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                800-hour intensive course covering full-stack web and mobile development
              </p>
              <div className="flex flex-wrap gap-2">
                {["Java SE/EE", "Spring Boot", "Angular", "TypeScript"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      border: '1px solid var(--accent)',
                      color: 'var(--accent)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="p-4 rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--window-border)',
              }}
            >
              <h4 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Bachelor's Degree in Political Science
              </h4>
              <p className="text-sm" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                La Sapienza University, Rome | 2010 - 2014
              </p>
            </div>
          </div>
        </div>

        {/* Download Resume Button */}
        <div className="text-center">
          <a
            href={resumePdf}
            download="CV-Nanni-Software-Dev.pdf"
            className="inline-block px-6 py-3 rounded transition-colors"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-primary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Download Full Resume
          </a>
        </div>
        </div>
      </Window>
    </section>
  );
};

export default Resume;
