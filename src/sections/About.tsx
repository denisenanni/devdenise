import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInUp, createAnimationProps } from "../utils/animations";

const technologies = ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Vite", "Git"];

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="about"
      ref={ref}
      className="section bg-navy-900"
    >
      <motion.div
        {...createAnimationProps(fadeInUp, inView)}
        className="section-content"
      >
        <div className="flex items-center mb-12">
          <span className="section-number">02.</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
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
            <h3 className="text-slate-100 font-mono text-lg mb-4">Technologies I work with:</h3>
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
