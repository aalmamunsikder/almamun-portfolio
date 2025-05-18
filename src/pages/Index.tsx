import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BestWork from "@/components/BestWork";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Add a class to the body element for global styling
    document.body.classList.add("min-h-screen", "bg-background");
    
    // Update the page title
    document.title = "Portfolio | Web Designer & Developer";
    
    return () => {
      document.body.classList.remove("min-h-screen", "bg-background");
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <BestWork />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
