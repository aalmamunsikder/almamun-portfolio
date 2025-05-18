import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { usePortfolio } from "@/lib/context/PortfolioContext";

export const About = () => {
  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;

  return (
    <section id="about" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none"></div>
      
      {/* Purple blob */}
      <div className="absolute left-0 top-0 w-96 h-96 opacity-20 blur-3xl">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#8B5CF6" d="M47.7,-73.6C59.3,-67.3,64.8,-49.5,69.8,-33.2C74.7,-16.9,79.2,-2.2,76.3,10.8C73.5,23.8,63.2,35.1,51.9,42.9C40.5,50.7,28,55.1,14.4,61.1C0.9,67.1,-13.7,74.8,-26.4,72.6C-39.1,70.3,-49.8,58,-56.1,44.7C-62.4,31.4,-64.3,17.1,-65.7,2.4C-67.2,-12.3,-68.3,-27.3,-62.3,-39.2C-56.3,-51,-43.4,-59.7,-30.1,-65.5C-16.8,-71.3,-3.2,-74.2,9.9,-70.2C23,-66.2,36.1,-55.2,47.7,-73.6Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      {/* Blue blob */}
      <div className="absolute right-0 bottom-0 w-96 h-96 opacity-20 blur-3xl">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#3B82F6" d="M46.3,-78.6C58.5,-71.4,66.1,-56.1,73.4,-41.1C80.6,-26.1,87.5,-11.3,87,3.5C86.6,18.3,78.9,33.1,69.1,46.4C59.3,59.8,47.4,71.7,33.4,77.5C19.4,83.3,3.4,83.1,-11.4,79.1C-26.1,75.1,-39.7,67.2,-50.7,56.9C-61.7,46.6,-70.1,33.9,-75.8,19.6C-81.6,5.2,-84.7,-11,-80.6,-25.2C-76.4,-39.4,-65,-51.7,-51.5,-58.8C-38,-65.9,-22.4,-67.9,-6.9,-67.3C8.7,-66.7,19.3,-63.5,29.9,-60.2C40.4,-56.8,50.9,-53.3,57.2,-44.7C63.5,-36.1,65.7,-22.5,69.6,-8.3L73.5,5.9L77.3,20.1" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <div className="lg:w-1/3">
            <div className="relative">
              {/* Blob shape behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-theme-purple to-blue-500 rounded-3xl blur-xl opacity-20 -z-10 scale-105"></div>
              
              <div className="glass-morphism rounded-3xl border border-white/10 overflow-hidden p-4">
                <div className="aspect-square overflow-hidden rounded-2xl">
                  <img 
                    src={personalInfo.avatar} 
                    alt={personalInfo.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=No+Image";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* About Content */}
          <div className="lg:w-2/3">
            <div className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 mb-6">
              <span className="text-theme-purple font-bold">✦</span> <span className="text-white/80 font-tech tracking-wide">ABOUT ME</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-tech text-white mb-6">
              I'm <span className="text-gradient">{personalInfo.name}</span>, {personalInfo.title}
            </h2>
            
            <p className="text-white/70 text-lg md:text-xl font-tech mb-8 leading-relaxed">
              {personalInfo.tagline}
            </p>
            
            <div className="glass-morphism rounded-2xl border border-white/10 p-6 mb-10">
              <p className="text-white/80 font-tech leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {personalInfo.resumeUrl && (
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white px-6 py-6 rounded-xl text-lg font-tech"
                >
                  <a 
                    href={personalInfo.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-5 w-5" />
                  Download Resume
                </a>
              </Button>
              )}
              
              {personalInfo.contactInfo.availableForWork && (
                <Button 
                  asChild 
                  variant="outline" 
                  className="bg-white/5 hover:bg-white/10 border-white/10 text-white px-6 py-6 rounded-xl text-lg font-tech"
                >
                  <a 
                    href={`mailto:${personalInfo.contactInfo.email}`}
                    className="flex items-center gap-2"
                  >
                    Contact Me
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
