import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Desktop } from "./components/desktop";
import Home from "./sections/Home";
import Footer from "./components/Footer";
import About from "./sections/About";

const Resume = lazy(() => import("./sections/Resume"));
const Contact = lazy(() => import("./sections/Contact"));

function App() {
  return (
    <ThemeProvider>
      <Desktop>
        <Home />
        <About />
        <Suspense fallback={<div className="section bg-distro-bg-primary" />}>
          <Resume />
          <Contact />
        </Suspense>
        <Footer />
      </Desktop>
    </ThemeProvider>
  );
}

export default App;
