import { Window } from "../components/desktop";

const technologies = Object.freeze([
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Vite",
  "Git",
  "Docker",
  "Terraform",
]);

const infoIcon = (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center p-6">
      <Window
        title="About Me"
        icon={infoIcon}
        className="w-full max-w-4xl"
      >
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
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
              <h3
                className="text-lg mb-4"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              >
                Technologies I work with:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span style={{ color: 'var(--accent)' }} className="mr-2">▹</span>
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Window>
    </section>
  );
};

export default About;
