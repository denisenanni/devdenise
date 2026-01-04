import { motion } from "framer-motion";

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

const smooth = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1],
};

const About = () => {
  return (
    <section id="about" className="section bg-black">
      <div className="section-content">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={smooth}
          className="flex items-center mb-12"
        >
          <h2 className="section-title">About</h2>
          <div className="section-divider"></div>
        </motion.div>

        {/* Content */}
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...smooth, delay: 0.1 }}
            className="text-gray-300 text-lg mb-6"
          >
            Full Stack Engineer with 5+ years of experience building web applications,
            e-commerce platforms, and cloud infrastructure.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...smooth, delay: 0.2 }}
            className="text-gray-300 text-lg mb-6"
          >
            Currently working with React, TypeScript, .NET, and cloud technologies.
            Google Cloud certified with expertise in DevOps automation and CI/CD pipelines.
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...smooth, delay: 0.3 }}
            className="mt-8"
          >
            <h3 className="text-white text-xl font-bold mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.4 + index * 0.04,
                  }}
                  className="tech-tag"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
