import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Expertise from "./components/Expertise";
import Education from "./components/Education";
import Workflow from "./components/Workflow";
import CVSection from "./components/CVSection";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Expertise />
        <Education />
        <Workflow />
        <CVSection />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
