import { lazy, Suspense } from "react";
import Home from "./sections/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./sections/About";

const Projects = lazy(() => import("./sections/Projects"));
const Resume = lazy(() => import("./sections/Resume"));
const Contact = lazy(() => import("./sections/Contact"));

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Home />
      <About />
      <Suspense fallback={<div className="section bg-navy-900" />}>
        <Projects />
        <Resume />
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
