import Home from "./sections/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./sections/Contact";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Resume from "./sections/Resume";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
