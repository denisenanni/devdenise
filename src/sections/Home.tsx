import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInDown, createAnimationProps } from "../utils/animations";

const Home = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="home"
      ref={ref}
      className="section bg-navy-900 overflow-x-hidden"
    >
      <motion.div
        {...createAnimationProps(fadeInDown, inView)}
        className="section-content text-center"
      >
        <div className="mb-4">
          <span className="text-primary-400 font-mono text-lg">Hi, my name is</span>
        </div>
        <h1 className="mb-4 gradient-text">Denise Nanni</h1>
        <h2 className="text-slate-300 mb-6">Frontend Engineer</h2>
        <p className="mt-4 text-xl text-slate-200 max-w-2xl mx-auto">
          I specialize in building exceptional digital experiences with React & TypeScript.
        </p>
      </motion.div>
    </section>
  );
};

export default Home;
