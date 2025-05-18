import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Code, Briefcase, User, Mail, LucideIcon, Star, Home, ChevronDown } from "lucide-react";
import { usePortfolio } from "@/lib/context/PortfolioContext";

const Navbar = () => {
  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background based on scroll position
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ["home", "bestwork", "about", "skills", "projects", "contact"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { title: "Home", href: "#home", icon: Home },
    { title: "Best Work", href: "#bestwork", icon: Star },
    { title: "About", href: "#about", icon: User },
    { title: "Skills", href: "#skills", icon: Code },
    { title: "Projects", href: "#projects", icon: Briefcase },
    { title: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 px-4 sm:px-6 md:px-12",
        scrolled
          ? "py-2 sm:py-3 bg-background/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/10"
          : "py-3 sm:py-5 bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <a 
          href="#" 
          className="text-xl sm:text-2xl md:text-3xl font-bold font-tech relative group flex items-center"
        >
          <span className="text-white group-hover:opacity-90 transition-opacity">
            {personalInfo?.name?.split(' ')[0] || 'Port'}
          </span>
          <span className="text-gradient">
            {personalInfo?.name?.split(' ')[1] || 'folio'}
          </span>
          <span className="text-theme-purple">.</span>
          
          {/* Decorative dot animation */}
          <span className="absolute -bottom-1 left-0 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-theme-purple rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-full"></span>
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          <div className="glass-morphism border border-white/10 rounded-full flex items-center p-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 font-tech text-sm",
                  activeSection === item.href.substring(1) 
                    ? "bg-gradient-to-r from-theme-purple/30 to-blue-500/20 text-white" 
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                <span>{item.title}</span>
              </a>
            ))}
          </div>
          
          <Button 
            asChild 
            className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white px-5 py-5 rounded-xl font-tech"
          >
            <a href="#contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {personalInfo.contactInfo.availableForWork ? 'Hire Me' : 'Contact Me'}
            </a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="md:hidden p-1.5 sm:p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed top-[56px] sm:top-[72px] inset-x-0 bg-background/95 backdrop-blur-xl border-b border-white/10 md:hidden transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-[500px] py-4 sm:py-6" : "max-h-0 py-0"
        )}
      >
        <div className="container max-w-7xl mx-auto flex flex-col gap-2 sm:gap-3 px-4 sm:px-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-all duration-300 font-tech text-sm sm:text-base",
                activeSection === item.href.substring(1)
                  ? "glass-morphism text-white border-white/20"
                  : "text-white/80 hover:text-white bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10"
              )}
              onClick={closeMenu}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{item.title}</span>
              </div>
              {activeSection === item.href.substring(1) && (
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-theme-purple" />
              )}
            </a>
          ))}
          <Button 
            asChild 
            className="mt-3 sm:mt-4 bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white w-full rounded-xl py-2.5 sm:py-6 font-tech text-sm sm:text-base"
          >
            <a href="#contact" onClick={closeMenu} className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              {personalInfo.contactInfo.availableForWork ? 'Hire Me' : 'Contact Me'}
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
