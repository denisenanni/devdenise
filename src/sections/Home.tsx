import { motion } from "framer-motion";

const Home = () => {
  return (
    <section id="home" className="section bg-black">
      <div className="section-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-400 font-mono text-sm mb-4">Hi, my name is</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Denise Nanni
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-300 mb-6">
            Full Stack Engineer
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg mb-8">
            5+ years building web applications and cloud infrastructure.
            Specialized in React, .NET, and DevOps automation.
          </p>
          <a href="#resume" className="btn-primary">
            View Experience
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
