import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const technologies = Object.freeze([
  "React",
  "TypeScript",
  "JavaScript",
  ".NET",
  "Node.js",
  "GCP",
  "Docker",
  "Terraform",
  "Git",
  "Tailwind CSS",
]);

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" ref={ref} className="section bg-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="section-content"
      >
        {/* Header */}
        <div className="flex items-center mb-12">
          <h2 className="section-title">About</h2>
          <div className="section-divider"></div>
        </div>

        {/* Content */}
        <div className="max-w-3xl">
          <p className="text-gray-300 text-lg mb-6">
            Full Stack Engineer with 5+ years of experience building web applications,
            e-commerce platforms, and cloud infrastructure.
          </p>
          <p className="text-gray-300 text-lg mb-6">
            Currently working with React, TypeScript, .NET, and cloud technologies.
            Google Cloud certified with expertise in DevOps automation and CI/CD pipelines.
          </p>

          {/* Tech Stack */}
          <div className="mt-8">
            <h3 className="text-white text-xl font-bold mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
