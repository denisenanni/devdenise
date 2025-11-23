import { motion, AnimatePresence } from "framer-motion";
import { memo, useCallback, useState, useEffect } from "react";

const links = ["home", "about", "projects", "resume", "contact"];

const Navbar = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <nav className="fixed top-0 w-full glass border-b border-slate-400/20 z-50 animate-slide-down">
      <div className="max-w-6xl mx-auto px-6">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex justify-center md:justify-end space-x-8 py-6">
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

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden justify-end py-6">
          <button
            onClick={toggleMobileMenu}
            className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary-400 rounded"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-primary-400 transition-all"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-primary-400 transition-all"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-primary-400 transition-all"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-navy-900/95 backdrop-blur-md border-l border-slate-400/20 z-50 md:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full pt-20 px-8">
                <nav aria-label="Mobile navigation">
                  <ul className="flex flex-col space-y-8">
                    {links.map((link, index) => (
                      <motion.li
                        key={link}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="cursor-pointer"
                        onClick={() => scrollToSection(link)}
                      >
                        <div className="flex items-center space-x-3 text-slate-300 hover:text-primary-400 transition-colors duration-200">
                          <span className="text-primary-400 font-mono text-base">
                            0{index + 1}.
                          </span>
                          <span className="font-mono text-lg">
                            {link.charAt(0).toUpperCase() + link.slice(1)}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
