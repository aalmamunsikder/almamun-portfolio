import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Layers, Code2, Database, Wrench } from "lucide-react";
import { usePortfolio } from "@/lib/context/PortfolioContext";

const Skills = () => {
  const { portfolioData } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  
  // Extract unique categories from skills for filter buttons
  const categories = ["All", ...Array.from(new Set(portfolioData.skills.map(skill => skill.category)))];
  
  // Filter skills based on active category
  const filteredSkills = activeFilter === "All" 
    ? portfolioData.skills 
    : portfolioData.skills.filter(skill => skill.category === activeFilter);
  
  // Map skills categories to icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Design":
        return <Layers className="h-6 w-6 text-purple-400" />;
      case "Frontend":
        return <Code2 className="h-6 w-6 text-blue-400" />;
      case "Backend":
        return <Database className="h-6 w-6 text-green-400" />;
      case "Tools":
        return <Wrench className="h-6 w-6 text-amber-400" />;
      default:
        return <Code2 className="h-6 w-6 text-blue-400" />;
    }
  };
  
  // Map categories to gradient colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Design":
        return "from-purple-500/20 to-pink-500/20";
      case "Frontend":
        return "from-blue-500/20 to-cyan-500/20";
      case "Backend":
        return "from-green-500/20 to-emerald-500/20";
      case "Tools":
        return "from-amber-500/20 to-orange-500/20";
      default:
        return "from-blue-500/20 to-cyan-500/20";
    }
  };
  
  // Function to determine the level color
  const getLevelColor = (level: number) => {
    if (level >= 80) return "from-theme-purple to-blue-400";
    if (level >= 60) return "from-blue-500 to-cyan-500";
    if (level >= 40) return "from-green-500 to-emerald-500";
    return "from-amber-500 to-orange-500";
  };

  // Group skills by category
  const skillsByCategory = portfolioData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof portfolioData.skills>);

  // Calculate average level for each category
  const categoryLevels = Object.entries(skillsByCategory).map(([category, skills]) => {
    const avgLevel = skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length;
    return {
      category,
      icon: getCategoryIcon(category),
      color: getCategoryColor(category),
      items: skills.map(s => s.name),
      level: Math.round(avgLevel)
    };
  });

  return (
    <section id="skills" className="py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none -z-10"></div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        {/* Hexagon shaped element for visual interest */}
        <div className="absolute left-0 top-1/4 w-64 h-64 opacity-30 -z-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#8B5CF6" d="M42.8,-73.2C56.9,-67.7,70.5,-58.5,78.6,-45.5C86.7,-32.5,89.3,-16.2,88.4,-0.5C87.5,15.2,83.1,30.4,74.3,42.6C65.5,54.7,52.4,63.8,38.5,70.5C24.6,77.2,9.9,81.5,-3.7,87.2C-17.4,92.9,-29.9,100,-42.9,99.2C-55.9,98.4,-69.4,89.6,-79.9,77.4C-90.4,65.2,-97.9,49.5,-99.8,33.5C-101.8,17.4,-98.2,1,-92.3,-13.1C-86.4,-27.3,-78.2,-39.2,-67.1,-47.4C-56,-55.5,-42,-59.8,-29.4,-66.9C-16.9,-73.9,-5.6,-83.6,4.9,-92.2C15.5,-100.8,28.7,-108.3,42.8,-73.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="absolute right-0 bottom-1/4 w-96 h-96 opacity-20 -z-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#3B82F6" d="M41.9,-66.2C55,-62.7,66.9,-52.8,75.9,-39.8C84.9,-26.8,91,-10.7,89.8,4.7C88.6,20.1,80.2,34.9,69.8,47C59.5,59.1,47.2,68.6,33.7,74.2C20.1,79.9,5.4,81.8,-8.8,79.9C-23,78,-36.8,72.3,-49.8,64C-62.8,55.6,-75,44.6,-81.3,30.5C-87.6,16.4,-88.1,-0.9,-83.8,-16.6C-79.5,-32.3,-70.3,-46.6,-57.7,-50.1C-45.1,-53.6,-29,-46.5,-15.8,-49.8C-2.6,-53.1,7.8,-66.7,19.5,-71.7C31.3,-76.7,44.5,-73.1,41.9,-66.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        {/* Section header with glass effect */}
        <div className="relative mb-24">
          <div className="absolute inset-0 bg-gradient-to-r from-theme-purple/10 to-blue-500/10 rounded-3xl blur-3xl -z-10"></div>
          <div className="glass-morphism rounded-3xl p-12 text-center border border-white/10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-purple/20 rounded-2xl mb-8">
              <span className="text-3xl">🚀</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-tech mb-6 text-gradient">
              Technical Expertise
          </h2>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-tech">
              {portfolioData.personalInfo.title ? `${portfolioData.personalInfo.title} with a passion for excellence` : "A developer with a passion for creating seamless digital experiences"}
          </p>
          </div>
        </div>

        {/* No skills placeholder */}
        {portfolioData.skills.length === 0 ? (
          <div className="glass-morphism border border-white/10 rounded-3xl p-12 text-center mb-24">
            <h3 className="text-3xl font-tech text-white mb-4">
              No Skills Added
            </h3>
            <p className="text-white/70 text-lg font-tech">
              No skills added yet.
            </p>
          </div>
        ) : (
          <>
            {/* Category filter - Make it scrollable on mobile */}
            <div className="overflow-x-auto pb-4 mb-12">
              <div className="flex flex-nowrap justify-start md:justify-center gap-3 min-w-max px-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-5 py-2 rounded-full font-tech text-sm whitespace-nowrap transition-all duration-300 ${
                      activeFilter === category
                        ? "bg-gradient-to-r from-theme-purple to-blue-500 text-white"
                        : "bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Skills cards in a responsive grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {categoryLevels.map((skill, index) => (
                <div 
                  key={skill.category}
                  className={`group relative ${activeFilter !== "All" && activeFilter !== skill.category ? "hidden" : ""}`}
                  style={{animationDelay: `${0.1 + index * 0.1}s`}}
                >
                  {/* Background glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
                  
                  <div className="glass-morphism h-full rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 overflow-hidden relative">
                    {/* Geometric background pattern */}
                    <div className="absolute -right-8 -bottom-8 opacity-10">
                      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="60" cy="60" r="30" stroke="white" strokeWidth="2" />
                        <rect x="40" y="40" width="40" height="40" stroke="white" strokeWidth="2" />
                        <path d="M30 30L90 90" stroke="white" strokeWidth="2" />
                        <path d="M90 30L30 90" stroke="white" strokeWidth="2" />
                      </svg>
                    </div>
                    
                    <div className="flex items-start gap-4 sm:gap-6 mb-6">
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                        {skill.icon}
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-tech mb-2 truncate">{skill.category}</h3>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-2">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${getLevelColor(skill.level)}`}
                            style={{ 
                              width: `${skill.level}%`,
                              animation: 'growWidth 1.5s ease-out forwards',
                              animationDelay: `${0.5 + index * 0.2}s`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {skill.items.map((item) => (
                        <div key={item} className="flex items-center py-2 group/item">
                          <div className="w-1.5 h-1.5 rounded-full bg-theme-purple mr-3 group-hover/item:scale-125 transition-transform"></div>
                          <p className="text-white/80 font-tech text-base sm:text-lg truncate group-hover/item:text-white transition-colors">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
          
        {/* Experience section - Make it responsive */}
        {portfolioData.experiences.length > 0 && (
          <div className="relative animate-fade-in mt-16 sm:mt-24" style={{ animationDelay: "0.7s" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-theme-purple/10 rounded-3xl blur-3xl -z-10"></div>
            <div className="glass-morphism rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10">
              <h3 className="text-2xl sm:text-3xl font-tech mb-8 sm:mb-12 text-center">Professional Journey</h3>
              
              <div className="relative">
                {/* Timeline connector */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-theme-purple via-blue-400 to-transparent"></div>
                
                {/* Experience points */}
                {portfolioData.experiences.slice(0, 4).map((exp, index) => (
                  <div key={exp.id} className="ml-6 sm:ml-8 md:ml-12 mb-8 sm:mb-12 last:mb-0 relative">
                    {/* Timeline node */}
                    <div className="absolute -left-[24px] sm:-left-[32px] top-0 w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-gradient-to-r from-theme-purple to-blue-400 flex items-center justify-center">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white"></div>
                    </div>
                    
                    <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-3">
                        <span className="text-theme-purple font-tech text-lg sm:text-xl">
                          {exp.startDate}{exp.endDate ? ` - ${exp.endDate}` : " - Present"}
                        </span>
                        <h4 className="text-white font-tech text-lg sm:text-xl">{exp.jobTitle}</h4>
                      </div>
                      <p className="text-white/70 text-sm sm:text-base">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
