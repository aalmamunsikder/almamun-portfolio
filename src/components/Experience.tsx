import React from "react";
import { BriefcaseIcon, Calendar, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/lib/context/PortfolioContext";

const Experience = () => {
  const { portfolioData } = usePortfolio();
  
  return (
    <section className="py-24 relative bg-background" id="experience">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none"></div>
      
      {/* Blue blob */}
      <div className="absolute right-0 top-1/4 w-96 h-96 opacity-20 blur-3xl">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#3B82F6" d="M46.3,-78.6C58.5,-71.4,66.1,-56.1,73.4,-41.1C80.6,-26.1,87.5,-11.3,87,3.5C86.6,18.3,78.9,33.1,69.1,46.4C59.3,59.8,47.4,71.7,33.4,77.5C19.4,83.3,3.4,83.1,-11.4,79.1C-26.1,75.1,-39.7,67.2,-50.7,56.9C-61.7,46.6,-70.1,33.9,-75.8,19.6C-81.6,5.2,-84.7,-11,-80.6,-25.2C-76.4,-39.4,-65,-51.7,-51.5,-58.8C-38,-65.9,-22.4,-67.9,-6.9,-67.3C8.7,-66.7,19.3,-63.5,29.9,-60.2C40.4,-56.8,50.9,-53.3,57.2,-44.7C63.5,-36.1,65.7,-22.5,69.6,-8.3L73.5,5.9L77.3,20.1" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 mb-6">
            <span className="text-theme-purple font-bold">✦</span> <span className="text-white/80 font-tech tracking-wide">EXPERIENCE</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-tech text-white mb-6">
            Work <span className="text-gradient">Experience</span>
          </h2>
          
          <p className="text-white/70 text-xl max-w-2xl mx-auto font-tech">
            My professional journey across various roles and companies
          </p>
        </div>
        
        {portfolioData.experiences.length === 0 ? (
          <div className="glass-morphism border border-white/10 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-tech text-white mb-4">
              No Work Experience Records
            </h3>
            <p className="text-white/70 text-lg font-tech">
              Add work experience details in the admin panel to showcase your professional journey.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-16 top-3 bottom-3 w-0.5 bg-gradient-to-b from-theme-purple via-blue-400 to-blue-500 hidden lg:block"></div>
            
            <div className="space-y-12">
              {portfolioData.experiences.map((exp, index) => (
                <div 
                  key={exp.id}
                  className="glass-morphism border border-white/10 rounded-3xl p-8 md:pl-24 relative overflow-hidden transition-transform hover:scale-[1.02] duration-300"
                >
                  {/* Timeline dot - visible only on large screens */}
                  <div className="absolute left-16 top-11 w-4 h-4 rounded-full bg-theme-purple border-4 border-background hidden lg:block"></div>
                  
                  {/* Briefcase icon - visible on all screens */}
                  <div className="absolute left-6 top-8 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-theme-purple/20 border border-theme-purple/30 lg:left-4">
                    <BriefcaseIcon className="w-6 h-6 text-theme-purple" />
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <h3 className="text-2xl font-tech text-white">
                        {exp.jobTitle}
                      </h3>
                      <p className="text-white/70 font-tech">
                        {exp.company} {exp.location ? `• ${exp.location}` : ''}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4 text-white/60 font-tech">
                      <Calendar size={18} />
                      <span>
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>
                    
                    <p className="text-white/70 font-tech leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience; 