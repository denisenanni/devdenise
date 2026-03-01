import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Front-end/Full Stack Engineer",
    company: "Outmatic",
    location: "Remote",
    period: "Dec 2022 - Present",
    description:
      "Development of new features, test and bug fixing on CMS web applications and E-commerce platforms. Working with React, ChakraUI, and started with .NET in November 2024.",
    technologies: ["React", "TypeScript", "ChakraUI", ".NET", "E-commerce"],
  },
  {
    title: "DevOps and Test Engineer",
    company: "Nexum AI",
    location: "Rome - Remote",
    period: "Feb - Nov 2022",
    description:
      "Research and implementation of automation tools across software development processes. Managed delivery, testing, and deployment pipelines with Infrastructure as Code.",
    technologies: ["GCP", "GitLab", "Terraform", "NodeJS", "Helm"],
  },
  {
    title: "Full Stack Web Developer",
    company: "Technode",
    location: "Brescia - Remote",
    period: "Dec 2020 - Dec 2021",
    description:
      "New features development and bug fixing on E-commerce platform. Worked with enterprise-level commerce solutions and database optimization.",
    technologies: ["React", "WebSphere", "Java 8", "DB2", "AngularJS"],
  },
  {
    title: "Full Stack Web Developer",
    company: "Catenate",
    location: "Rome",
    period: "Oct 2019 - Dec 2020",
    description:
      "Features development on banking CMS systems. Working with legacy and modern frameworks to implement secure and compliant banking solutions.",
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

const smooth = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1],
};

const Resume = () => {
  const expRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: expScroll } = useScroll({
    target: expRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: certScroll } = useScroll({
    target: certRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: eduScroll } = useScroll({
    target: eduRef,
    offset: ["start end", "end start"],
  });

  // Experience parallax (subtle movement)
  const expY = [
    useTransform(expScroll, [0, 1], [20, -20]),
    useTransform(expScroll, [0, 1], [30, -30]),
    useTransform(expScroll, [0, 1], [15, -15]),
    useTransform(expScroll, [0, 1], [25, -25]),
  ];

  // Certifications parallax
  const certY = [
    useTransform(certScroll, [0, 1], [18, -18]),
    useTransform(certScroll, [0, 1], [25, -25]),
    useTransform(certScroll, [0, 1], [12, -12]),
  ];

  // Education parallax
  const eduY = [
    useTransform(eduScroll, [0, 1], [20, -20]),
    useTransform(eduScroll, [0, 1], [15, -15]),
  ];

  const handleResumeDownload = () => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "resume_download", {
        event_category: "engagement",
        event_label: "CV Download",
        value: 1,
      });
    }
  };

  return (
    <section id="resume" className="section bg-black">
      <div className="section-content">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={smooth}
          className="flex items-center mb-8 md:mb-12 min-w-0"
        >
          <h2 className="section-title">Experience</h2>
          <div className="section-divider"></div>
        </motion.div>

        {/* Experience Cards - All Open */}
        <div ref={expRef} className="max-w-4xl mx-auto mb-16 space-y-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              style={{ y: expY[index] }}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -60 : 60,
                scale: 0.95,
              }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                delay: index * 0.15,
              }}
              className="rounded-lg border border-gray-700 bg-black-lighter p-5 md:p-6
                hover:border-gray-500 transition-colors duration-300"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <h3 className="text-base md:text-lg font-medium text-white">
                  {exp.title} <span className="text-gray-400">@</span>{" "}
                  <span className="text-white">{exp.company}</span>
                </h3>
                <span className="text-sm text-gray-400 font-mono whitespace-nowrap">
                  {exp.period}
                </span>
              </div>

              {/* Location */}
              <p className="text-sm text-gray-400 font-mono mb-3">
                {exp.location}
              </p>

              {/* Description */}
              <p className="text-sm leading-relaxed text-gray-300 mb-4">
                {exp.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-black border border-gray-600
                      rounded-full text-white text-xs font-mono hover:border-white transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={smooth}
          className="max-w-4xl mx-auto mb-12"
        >
          <h3 className="text-2xl text-white mb-6 flex items-center">
            <span className="text-gray-400 font-mono text-lg mr-2">►</span>
            Certifications
          </h3>
          <div
            ref={certRef}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                style={{ y: certY[index] }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: index * 0.1,
                }}
                className="card flex flex-col items-start gap-2 hover:border-white transition-colors"
              >
                <span className="text-2xl">{cert.icon}</span>
                <div>
                  <p className="text-white font-medium text-sm">{cert.name}</p>
                  <p className="text-gray-400 text-xs font-mono">{cert.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={smooth}
          className="max-w-4xl mx-auto mb-12"
        >
          <h3 className="text-2xl text-white mb-6 flex items-center">
            <span className="text-gray-400 font-mono text-lg mr-2">►</span>
            Education
          </h3>
          <div ref={eduRef} className="space-y-4">
            <motion.div
              style={{ y: eduY[0] }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="card hover:border-white transition-colors"
            >
              <h4 className="text-white font-medium mb-2">
                Software and App Development Course
              </h4>
              <p className="text-white font-mono text-sm mb-2">
                Accademia Informatica | December 2018 - June 2019
              </p>
              <p className="text-gray-300 text-sm mb-3">
                800-hour intensive course covering full-stack web and mobile
                development
              </p>
              <div className="flex flex-wrap gap-2">
                {["Java SE/EE", "Spring Boot", "Angular", "TypeScript"].map(
                  (tech, i) => (
                    <span key={i} className="tech-tag text-xs">
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </motion.div>

            <motion.div
              style={{ y: eduY[1] }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.1,
              }}
              className="card hover:border-white transition-colors"
            >
              <h4 className="text-white font-medium mb-2">
                Bachelor's Degree in Political Science
              </h4>
              <p className="text-white font-mono text-sm">
                La Sapienza University, Rome | 2010 - 2014
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Download Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smooth}
          className="text-center"
        >
          <a
            href="/cv-Nanni.pdf"
            download
            className="btn-primary inline-block"
            onClick={handleResumeDownload}
          >
            Download Full Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
