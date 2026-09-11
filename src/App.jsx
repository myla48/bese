import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Showreel from "./components/Showreel";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import TimecodeRail from "./components/TimecodeRail";

function App() {
  return (
    <div className="min-h-screen bg-void text-ink">
      <div className="grain-overlay" />
      <CustomCursor />
      <TimecodeRail />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Showreel />
        <Work />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
