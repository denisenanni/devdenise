import { Window } from "../components/desktop";

const terminalIcon = (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-7-2h5v-2h-5v2zm-5.5-1.5l1.41 1.41L6 14l2.91-2.91-1.41-1.41L4.59 12.5l2.91 2z" />
  </svg>
);

const Home = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center p-6">
      <Window
        title="denise@portfolio: ~"
        icon={terminalIcon}
        className="w-full max-w-3xl"
      >
        <div className="p-8 text-center" style={{ fontFamily: 'var(--font-mono)' }}>
          <div className="mb-6">
            <span style={{ color: 'var(--accent)' }}>$</span>
            <span className="ml-2" style={{ color: 'var(--text-secondary)' }}>whoami</span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Denise Nanni
          </h1>

          <h2
            className="text-xl md:text-2xl mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            Frontend Engineer
          </h2>

          <p
            className="text-lg max-w-xl mx-auto mb-8"
            style={{ color: 'var(--text-muted)' }}
          >
            I specialize in building exceptional digital experiences with React &
            TypeScript.
          </p>

          <div className="flex items-center justify-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--accent)' }}>$</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </Window>
    </section>
  );
};

export default Home;
