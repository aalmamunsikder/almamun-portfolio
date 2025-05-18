import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Linkedin, Github, Code, Monitor, BriefcaseBusiness, ChevronRight, Twitter, Instagram, Facebook, Youtube, Twitch, Dribbble, Figma, Mail, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/lib/context/PortfolioContext";

// Custom WhatsApp icon component with proper branding
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
  </svg>
);

const Hero = () => {
  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;

  // Get the icon component for a social platform
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="h-6 w-6 text-white" />;
      case 'linkedin':
        return <Linkedin className="h-6 w-6 text-white" />;
      case 'twitter':
        return <Twitter className="h-6 w-6 text-white" />;
      case 'instagram':
        return <Instagram className="h-6 w-6 text-white" />;
      case 'facebook':
        return <Facebook className="h-6 w-6 text-white" />;
      case 'youtube':
        return <Youtube className="h-6 w-6 text-white" />;
      case 'twitch':
        return <Twitch className="h-6 w-6 text-white" />;
      case 'dribbble':
        return <Dribbble className="h-6 w-6 text-white" />;
      case 'figma':
        return <Figma className="h-6 w-6 text-white" />;
      case 'whatsapp':
        return <WhatsAppIcon className="h-6 w-6 text-white" />;
      case 'email':
        return <Mail className="h-6 w-6 text-white" />;
      default:
        return <ExternalLink className="h-6 w-6 text-white" />;
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 md:pt-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background"></div>
      
      {/* Modern gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-theme-purple/30 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[80px] -z-10"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none -z-10"></div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        {/* Main hero content with glass card */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-theme-purple/10 to-blue-500/10 rounded-3xl blur-3xl -z-10"></div>
          <div className="glass-morphism rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center border border-white/10">
            <div className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 mb-4 sm:mb-8 animate-fade-in">
              <span className="text-theme-purple font-bold">✦</span> <span className="text-white/80 font-tech tracking-wide text-xs sm:text-sm">{personalInfo.title.toUpperCase()}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-tech leading-none mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <span className="text-white block mb-2">{personalInfo.name}</span>
              <span className="text-gradient">{personalInfo.tagline}</span>
            </h1>
            
            <p className="text-white/70 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in font-tech" style={{ animationDelay: "0.2s" }}>
              {personalInfo.bio.split('.')[0]}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white rounded-xl px-4 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-tech"
              >
                <a href="#projects" className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 sm:h-5 sm:w-5" />
                  View My Work
                </a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 text-white px-4 sm:px-8 py-5 sm:py-6 rounded-xl text-base sm:text-lg font-tech"
              >
                <a href="#contact" className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  Get in Touch
                </a>
              </Button>
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-10 sm:mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {[
                { number: `${Math.round(portfolioData.experiences.reduce((acc, exp) => {
                  const startDate = new Date(exp.startDate);
                  const endDate = exp.current ? new Date() : new Date(exp.endDate);
                  return acc + (endDate.getFullYear() - startDate.getFullYear());
                }, 0))}+`, label: "Years Experience" },
                { number: `${portfolioData.projects.length}+`, label: "Projects Completed" },
                { number: "20+", label: "Happy Clients" },
                { number: "100%", label: "Client Satisfaction" }
              ].map((stat, index) => (
                <div key={index} className="p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-tech text-gradient font-bold">{stat.number}</p>
                  <p className="text-white/70 font-tech text-xs sm:text-sm md:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
            </div>
          </div>

        {/* Social links */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 items-center animate-fade-in my-8 sm:my-0" style={{ animationDelay: "0.5s" }}>
          {personalInfo.socialLinks.map((link) => (
            <a 
              key={link.id}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group"
            >
              <div className="p-2 sm:p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-theme-purple/20 transition-all duration-300">
                {getSocialIcon(link.platform)}
              </div>
            </a>
          ))}
          <div className="hidden sm:block h-10 border-l border-white/10 mx-2 sm:mx-4"></div>
          <div className="py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <span className="text-white font-tech text-xs sm:text-sm">{personalInfo.contactInfo.availableForWork ? "Available for work" : "Currently Busy"}</span>
          </div>
        </div>
        
        <div className="flex justify-center mt-8 sm:mt-20 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <a href="#skills" className="flex flex-col items-center group">
            <span className="text-white/50 mb-2 font-tech text-sm group-hover:text-white transition-colors">Scroll Down</span>
            <div className="p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-theme-purple/20 transition-all duration-300">
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
