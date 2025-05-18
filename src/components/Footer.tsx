import React from "react";
import { ArrowUp } from "lucide-react";
import { usePortfolio } from "@/lib/context/PortfolioContext";

const Footer = () => {
  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  const currentYear = new Date().getFullYear();

  // Navigation items
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Best Work", href: "#bestwork" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <footer className="py-10 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/80 to-background/100"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none -z-10"></div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center border-t border-white/10 pt-8">
          {/* Simple navigation */}
          <div className="flex flex-wrap gap-6 justify-center mb-6">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="text-white/70 hover:text-white font-tech transition-colors text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>
          
          {/* Copyright */}
          <p className="text-white/50 font-tech text-center mb-6">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          
          {/* Scroll to top button */}
            <button
              onClick={scrollToTop}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-theme-purple/20 transition-all duration-300"
            aria-label="Scroll to top"
            >
            <ArrowUp className="h-5 w-5 hover:text-theme-purple transition-colors" />
            </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
