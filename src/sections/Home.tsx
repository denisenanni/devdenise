import { motion } from "framer-motion";

const smooth = {
  duration: 1,
  ease: [0.25, 0.1, 0.25, 1],
};

const Home = () => {
  return (
    <section id="home" className="section bg-black">
      <div className="section-content">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smooth, delay: 0.5 }}
          className="text-gray-400 font-mono text-sm mb-4"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smooth, delay: 0.7 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4"
        >
          Denise Nanni
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smooth, delay: 0.9 }}
          className="text-3xl md:text-5xl font-bold text-gray-300 mb-6"
        >
          Full Stack Engineer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smooth, delay: 1.1 }}
          className="text-gray-400 max-w-2xl text-lg mb-8"
        >
          5+ years building web applications and cloud infrastructure.
          Specialized in React, .NET, and DevOps automation.
        </motion.p>

        <motion.a
          href="#resume"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smooth, delay: 1.3 }}
          className="btn-primary inline-block"
        >
          View Experience
        </motion.a>
      </div>
    </section>
  );
};

export default Home;
