import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy-800 border-t border-slate-400/20 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="https://github.com/denisenanni"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-primary-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/denise-nanni"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-primary-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:info@devdenise.com"
              className="text-slate-300 hover:text-primary-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>

          {/* Branding */}
          <p className="text-slate-300 font-mono text-sm">
            Denise Nanni &copy; {new Date().getFullYear()}
          </p>
        </div>

        {/* Built with */}
        <div className="text-center">
          <p className="text-slate-400 text-sm font-mono">
            Built with React, TypeScript, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
