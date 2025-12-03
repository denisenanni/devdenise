import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const technologies = Object.freeze([
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Vite",
  "Git",
  "Docker",
  "Terraform",
]);

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="about"
      ref={ref}
      className="section overflow-x-hidden"
    >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-content"
        >
          <div className="flex items-center mb-8 md:mb-12 min-w-0">
            <span className="section-number">02.</span>
            <h2 className="section-title">About Me</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            <div className="space-y-4 text-slate-200">
              <p>
                Hello! I'm Denise, a frontend engineer passionate about creating
                beautiful and functional web experiences.
              </p>
              <p>
                I specialize in React, TypeScript, and modern web technologies,
                with a focus on building scalable and maintainable applications.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-slate-100 font-mono text-lg mb-4">
                Technologies I work with:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {technologies.map((tech) => (
                  <div key={tech} className="flex items-center text-slate-300">
                    <span className="text-primary-400 mr-2">▹</span>
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
    </section>
  );
};

export default About;
