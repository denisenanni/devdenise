import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./sections/Home";
import About from "./sections/About";
import Resume from "./sections/Resume";
import Contact from "./sections/Contact";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Home />
      <About />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
