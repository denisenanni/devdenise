import { motion } from "framer-motion";

const Navbar = () => {
  const links = ["home", "about", "projects", "resume", "contact"];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed top-0 w-full glass border-b border-slate-400/20 z-50 animate-slide-down">
      <div className="max-w-6xl mx-auto px-6">
        <ul className="flex justify-center md:justify-end space-x-8 py-6">
          {links.map((link, index) => (
            <motion.li
              key={link}
              className="cursor-pointer nav-link"
              onClick={() => scrollToSection(link)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="section-number">0{index + 1}.</span>
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
