import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="py-8 px-6"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--window-border)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="https://github.com/denisenanni"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-80"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/denise-nanni"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-80"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="mailto:info@devdenise.com"
              className="transition-colors hover:opacity-80"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>

          {/* Branding */}
          <p
            className="text-sm"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Denise Nanni &copy; {new Date().getFullYear()}
          </p>
        </div>

        {/* Built with */}
        <div className="text-center">
          <p
            className="text-xs"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Built with React, TypeScript, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
