import React from "react";
import { GraduationCap, Calendar } from "lucide-react";
import { usePortfolio } from "@/lib/context/PortfolioContext";

const Education = () => {
  const { portfolioData } = usePortfolio();
  
  return (
    <section className="py-24 relative bg-background" id="education">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none"></div>
      
      {/* Purple blob */}
      <div className="absolute left-0 top-1/3 w-96 h-96 opacity-20 blur-3xl">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#8B5CF6" d="M47.7,-73.6C59.3,-67.3,64.8,-49.5,69.8,-33.2C74.7,-16.9,79.2,-2.2,76.3,10.8C73.5,23.8,63.2,35.1,51.9,42.9C40.5,50.7,28,55.1,14.4,61.1C0.9,67.1,-13.7,74.8,-26.4,72.6C-39.1,70.3,-49.8,58,-56.1,44.7C-62.4,31.4,-64.3,17.1,-65.7,2.4C-67.2,-12.3,-68.3,-27.3,-62.3,-39.2C-56.3,-51,-43.4,-59.7,-30.1,-65.5C-16.8,-71.3,-3.2,-74.2,9.9,-70.2C23,-66.2,36.1,-55.2,47.7,-73.6Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 mb-4 sm:mb-6">
            <span className="text-theme-purple font-bold">✦</span> <span className="text-white/80 font-tech tracking-wide text-xs sm:text-sm">EDUCATION</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-tech text-white mb-4 sm:mb-6">
            Academic <span className="text-gradient">Background</span>
          </h2>
          
          <p className="text-white/70 text-base sm:text-xl max-w-2xl mx-auto font-tech">
            My educational journey that has shaped my professional path
          </p>
        </div>
        
        {portfolioData.education.length === 0 ? (
          <div className="glass-morphism border border-white/10 rounded-3xl p-6 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-tech text-white mb-4">
              No Education Records
            </h3>
            <p className="text-white/70 text-base sm:text-lg font-tech">
              No education entries yet.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 sm:space-y-12">
              {portfolioData.education.map((edu) => (
                <div 
                  key={edu.id}
                  className="glass-morphism border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-transform hover:scale-[1.02] duration-300"
                >
                  {/* Graduation icon in background */}
                  <div className="absolute -right-8 -bottom-8 text-white/5">
                    <GraduationCap size={80} className="sm:size-120" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-theme-purple/20 border border-theme-purple/30">
                        <GraduationCap size={16} className="sm:size-24 text-theme-purple" />
                      </span>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-tech text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-white/70 font-tech text-sm sm:text-base">
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3 sm:mb-4 text-white/60 font-tech text-sm sm:text-base">
                      <Calendar size={16} className="sm:size-18" />
                      <span>
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </span>
                    </div>
                    
                    {edu.description && (
                      <p className="text-white/70 font-tech leading-relaxed text-sm sm:text-base">
                        {edu.description}
                      </p>
                    )}
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

export default Education; 