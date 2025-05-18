import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, FolderGit2, Code2, Eye, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/lib/context/PortfolioContext";

const Projects = () => {
  const { portfolioData } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  // Get unique tags from all projects
  const uniqueTags = Array.from(
    new Set(portfolioData.projects.flatMap(project => project.tags))
  );
  
  // Create filter options - "all" plus all unique tags
  const filters = ["all", ...uniqueTags];

  const filteredProjects = activeFilter === "all" 
    ? portfolioData.projects 
    : portfolioData.projects.filter(project => project.tags.includes(activeFilter));
    
  // Scroll filters horizontally
  const scrollFilters = (direction: 'left' | 'right') => {
    if (filtersRef.current) {
      const scrollAmount = 200;
      filtersRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  // Track if filter scrolling is needed
  const [isScrollNeeded, setIsScrollNeeded] = useState<boolean>(false);
  
  useEffect(() => {
    const checkScroll = () => {
      if (filtersRef.current) {
        setIsScrollNeeded(filtersRef.current.scrollWidth > filtersRef.current.clientWidth);
      }
    };
    
    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [filters]);
  
  return (
    <section id="projects" className="py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none -z-10"></div>
      
      {/* Background blob */}
      <div className="absolute right-0 top-1/3 w-80 h-80 opacity-20 -z-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#8B5CF6" d="M47.7,-73.6C59.3,-67.3,64.8,-49.5,69.8,-33.2C74.7,-16.9,79.2,-2.2,76.3,10.8C73.5,23.8,63.2,35.1,51.9,42.9C40.5,50.7,28,55.1,14.4,61.1C0.9,67.1,-13.7,74.8,-26.4,72.6C-39.1,70.3,-49.8,58,-56.1,44.7C-62.4,31.4,-64.3,17.1,-65.7,2.4C-67.2,-12.3,-68.3,-27.3,-62.3,-39.2C-56.3,-51,-43.4,-59.7,-30.1,-65.5C-16.8,-71.3,-3.2,-74.2,9.9,-70.2C23,-66.2,36.1,-55.2,47.7,-73.6Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="absolute left-0 bottom-1/4 w-96 h-96 opacity-15 -z-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#3B82F6" d="M46.3,-78.6C58.5,-71.4,66.1,-56.1,73.4,-41.1C80.6,-26.1,87.5,-11.3,87,3.5C86.6,18.3,78.9,33.1,69.1,46.4C59.3,59.8,47.4,71.7,33.4,77.5C19.4,83.3,3.4,83.1,-11.4,79.1C-26.1,75.1,-39.7,67.2,-50.7,56.9C-61.7,46.6,-70.1,33.9,-75.8,19.6C-81.6,5.2,-84.7,-11,-80.6,-25.2C-76.4,-39.4,-65,-51.7,-51.5,-58.8C-38,-65.9,-22.4,-67.9,-6.9,-67.3C8.7,-66.7,19.3,-63.5,29.9,-60.2C40.4,-56.8,50.9,-53.3,57.2,-44.7C63.5,-36.1,65.7,-22.5,69.6,-8.3L73.5,5.9L77.3,20.1" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header with glass effect */}
        <div className="relative mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-theme-purple/10 rounded-3xl blur-3xl -z-10"></div>
          <div className="glass-morphism rounded-3xl p-12 text-center border border-white/10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-purple/20 rounded-2xl mb-8">
              <FolderGit2 className="w-8 h-8 text-theme-purple" />
        </div>

            <h2 className="text-5xl md:text-6xl font-tech mb-6 text-gradient">
              Featured Projects
            </h2>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-tech">
              Explore my latest work showcasing creative solutions and technical expertise
            </p>
            
            {/* Filter pills with scroll buttons */}
            <div className="relative mt-10 max-w-4xl mx-auto">
              {isScrollNeeded && (
                <>
                  <button 
                    onClick={() => scrollFilters('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 rounded-full bg-theme-purple/30 backdrop-blur-sm flex items-center justify-center border border-white/10"
                    aria-label="Scroll filters left"
                  >
                    <ChevronLeft className="h-5 w-5 text-white" />
                  </button>
                  <button 
                    onClick={() => scrollFilters('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 rounded-full bg-theme-purple/30 backdrop-blur-sm flex items-center justify-center border border-white/10"
                    aria-label="Scroll filters right"
                  >
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>
                </>
              )}
              
              <div 
                ref={filtersRef}
                className="flex gap-3 overflow-x-auto py-2 no-scrollbar justify-start md:justify-center"
              >
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className={cn(
                activeFilter === filter 
                        ? "bg-theme-purple hover:bg-theme-purple/90 text-white" 
                        : "bg-white/5 border-white/10 hover:bg-white/10",
                      "capitalize rounded-full px-6 text-lg font-tech whitespace-nowrap flex-shrink-0"
              )}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects grid with advanced hover effects */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
                className="group relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ 
                  animationDelay: `${0.2 + 0.1 * index}s`,
                  transform: `scale(${hoveredProject === project.id ? 1.02 : 1})`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                {/* Enhanced glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-theme-purple/20 to-blue-500/20 rounded-2xl blur-xl transition-all duration-500 -z-10 ${
                  hoveredProject === project.id ? 'opacity-100 scale-105' : 'opacity-60'
                }`}></div>
                
                <div className="glass-morphism rounded-2xl border border-white/10 h-full overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:shadow-theme-purple/20 group-hover:border-white/20">
                  {/* Image container with improved overlay */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                      src={project.imageUrl} 
                  alt={project.title} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=No+Image";
                      }}
                    />
                    
                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 py-1 px-3 rounded-full bg-theme-purple/70 backdrop-blur-md text-xs font-tech text-white/90 border border-theme-purple/30 flex items-center gap-1 z-10">
                        <span className="h-1.5 w-1.5 bg-white rounded-full animate-pulse"></span>
                        Featured
                      </div>
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent opacity-95 transition-opacity duration-300 group-hover:opacity-90"></div>
                    
                    {/* Enhanced preview buttons with labels */}
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                        >
                          <Eye className="h-4 w-4 text-white" />
                          <span className="text-xs font-tech">Live Demo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                        >
                          <Code2 className="h-4 w-4 text-white" />
                          <span className="text-xs font-tech">Code</span>
                        </a>
                      )}
                    </div>
                    
                    {/* Title overlay with improved layout */}
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <h3 className="text-2xl font-tech text-white mb-2 group-hover:text-gradient transition-all duration-300 transform group-hover:-translate-y-1">
                        {project.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                      <span 
                            key={`${project.id}-${index}`} 
                            className="text-xs py-1 px-3 rounded-full backdrop-blur-md bg-white/10 border border-white/10 font-tech text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
                  {/* Description and links with improved layout */}
                  <div className="p-6 pt-2">
                    <p className="text-white/70 text-base mb-6 font-tech line-clamp-3 hover:line-clamp-none transition-all duration-300">
                      {project.description}
                    </p>
                    
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <Button 
                          asChild 
                          className="rounded-xl bg-gradient-to-r from-theme-purple/20 to-blue-500/20 hover:from-theme-purple/30 hover:to-blue-500/30 text-white border border-theme-purple/30 flex-1 group/button"
                        >
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-5"
                    >
                            <span className="font-tech text-sm">View Live Demo</span>
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
                    </a>
                  </Button>
                      )}
                      
                      {project.githubUrl && (
                        <Button 
                          asChild 
                          variant="outline" 
                          className="rounded-xl bg-white/5 hover:bg-white/10 border-white/10 flex-1"
                        >
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-5"
                    >
                      <Github className="h-4 w-4" />
                            <span className="font-tech text-sm">Source Code</span>
                    </a>
                  </Button>
                      )}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="text-center py-20 glass-morphism rounded-2xl border border-white/10">
            <FolderGit2 className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-2xl font-tech text-white mb-2">No projects found</h3>
            <p className="text-white/50 text-lg font-tech mb-6">No projects match the selected filter.</p>
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 hover:bg-white/10 rounded-xl text-white"
              onClick={() => setActiveFilter('all')}
            >
              Show all projects
          </Button>
        </div>
        )}
      </div>
    </section>
  );
};

// Add custom CSS for hiding scrollbars while maintaining functionality
const style = document.createElement('style');
style.textContent = `
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);

export default Projects;
