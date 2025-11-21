import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Resume = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="resume"
      ref={ref}
      className="section bg-navy-900"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="section-content"
      >
        <div className="flex items-center mb-12">
          <span className="section-number">04.</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-divider"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="card">
            <div className="mb-4">
              <h3 className="text-slate-100 mb-2">Frontend Engineer</h3>
              <p className="text-primary-400 font-mono text-sm">Company Name | 2023 - Present</p>
            </div>
            <ul className="space-y-2 text-slate-200">
              <li className="flex">
                <span className="text-primary-400 mr-2">▹</span>
                <span>Developed and maintained web applications using React and TypeScript</span>
              </li>
              <li className="flex">
                <span className="text-primary-400 mr-2">▹</span>
                <span>Collaborated with design and backend teams to deliver features</span>
              </li>
              <li className="flex">
                <span className="text-primary-400 mr-2">▹</span>
                <span>Improved application performance and user experience</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              View Full Resume
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;
