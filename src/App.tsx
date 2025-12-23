import { lazy, Suspense, useState, useCallback, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { Desktop, BootAnimation } from "./components/desktop";
import Home from "./sections/Home";
import Footer from "./components/Footer";
import About from "./sections/About";

const Resume = lazy(() => import("./sections/Resume"));
const Contact = lazy(() => import("./sections/Contact"));

function App() {
  const [showBoot, setShowBoot] = useState(() => {
    // Only show boot animation once per session
    return !sessionStorage.getItem('bootComplete');
  });

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem('bootComplete', 'true');
    setShowBoot(false);
  }, []);

  // Preload Resume and Contact during boot animation
  useEffect(() => {
    if (showBoot) {
      import("./sections/Resume");
      import("./sections/Contact");
    }
  }, [showBoot]);

  return (
    <ThemeProvider>
      <NotificationProvider>
        {showBoot && <BootAnimation onComplete={handleBootComplete} />}
        <Desktop>
          <Home />
          <About />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <span className="animate-pulse" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Loading...
              </span>
            </div>
          }>
            <Resume />
            <Contact />
          </Suspense>
          <Footer />
        </Desktop>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
