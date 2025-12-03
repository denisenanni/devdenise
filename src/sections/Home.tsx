import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="home"
      ref={ref}
      className="section overflow-x-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="section-content text-center"
      >
        <div className="mb-4">
          <span className="text-primary-400 font-mono text-lg">
            Hi, my name is
          </span>
        </div>
        <h1 className="mb-4 gradient-text">Denise Nanni</h1>
        <h2 className="text-slate-300 mb-6">Frontend Engineer</h2>
        <p className="mt-4 text-xl text-slate-200 max-w-2xl mx-auto">
          I specialize in building exceptional digital experiences with React &
          TypeScript.
        </p>
      </motion.div>
    </section>
  );
};

export default Home;
