import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import { usePortfolio } from "@/lib/context/PortfolioContext";

const BestWork = () => {
  const { portfolioData } = usePortfolio();
  
  // Get featured projects or the first project if none are featured
  const featuredProjects = portfolioData.projects.filter(project => project.featured);
  const projectToDisplay = featuredProjects.length > 0 
    ? featuredProjects[0] 
    : portfolioData.projects.length > 0 
      ? portfolioData.projects[0] 
      : null;
  
  // If no projects are available, show a placeholder
  if (!projectToDisplay) {
    return (
      <section id="bestwork" className="relative bg-background py-24 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          <div className="glass-morphism border border-white/10 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-tech text-white mb-4">
              No Projects Available
            </h2>
            <p className="text-white/70 text-lg font-tech mb-8">
              Add projects in the admin panel to showcase your best work here.
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="bestwork" className="relative bg-background py-24 overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none"></div>
      
      {/* Purple blob */}
      <div className="absolute -left-40 top-0 w-96 h-96 opacity-20 blur-3xl">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#8B5CF6" d="M47.7,-73.6C59.3,-67.3,64.8,-49.5,69.8,-33.2C74.7,-16.9,79.2,-2.2,76.3,10.8C73.5,23.8,63.2,35.1,51.9,42.9C40.5,50.7,28,55.1,14.4,61.1C0.9,67.1,-13.7,74.8,-26.4,72.6C-39.1,70.3,-49.8,58,-56.1,44.7C-62.4,31.4,-64.3,17.1,-65.7,2.4C-67.2,-12.3,-68.3,-27.3,-62.3,-39.2C-56.3,-51,-43.4,-59.7,-30.1,-65.5C-16.8,-71.3,-3.2,-74.2,9.9,-70.2C23,-66.2,36.1,-55.2,47.7,-73.6Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      {/* Blue blob */}
      <div className="absolute -right-40 bottom-0 w-96 h-96 opacity-20 blur-3xl">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#3B82F6" d="M46.3,-78.6C58.5,-71.4,66.1,-56.1,73.4,-41.1C80.6,-26.1,87.5,-11.3,87,3.5C86.6,18.3,78.9,33.1,69.1,46.4C59.3,59.8,47.4,71.7,33.4,77.5C19.4,83.3,3.4,83.1,-11.4,79.1C-26.1,75.1,-39.7,67.2,-50.7,56.9C-61.7,46.6,-70.1,33.9,-75.8,19.6C-81.6,5.2,-84.7,-11,-80.6,-25.2C-76.4,-39.4,-65,-51.7,-51.5,-58.8C-38,-65.9,-22.4,-67.9,-6.9,-67.3C8.7,-66.7,19.3,-63.5,29.9,-60.2C40.4,-56.8,50.9,-53.3,57.2,-44.7C63.5,-36.1,65.7,-22.5,69.6,-8.3L73.5,5.9L77.3,20.1" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <div className="glass-morphism border border-white/10 rounded-3xl p-6 md:p-12 relative overflow-hidden">
          {/* Content with glass effect */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 relative z-10">
            {/* Image section */}
            <div className="lg:w-1/2 relative">
              <div className="aspect-video overflow-hidden rounded-xl border border-white/10 shadow-xl">
                <img 
                  src={projectToDisplay.imageUrl} 
                  alt={projectToDisplay.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/800x600?text=No+Image";
                  }}
                />
                
                {/* Tags overlay */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {projectToDisplay.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index} 
                      className="py-1 px-3 text-xs rounded-full bg-theme-purple/30 backdrop-blur-sm border border-theme-purple/30 font-tech text-white"
                    >
                      {tag}
                    </span>
                  ))}
                  {projectToDisplay.tags.length > 3 && (
                    <span className="py-1 px-3 text-xs rounded-full bg-white/10 backdrop-blur-sm border border-white/10 font-tech text-white">
                      +{projectToDisplay.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Text content */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-tech text-white mb-6">
                {projectToDisplay.title}
              </h2>
              
              <p className="text-white/70 text-lg md:text-xl font-tech mb-8">
                {projectToDisplay.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {projectToDisplay.liveUrl && (
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white px-6 py-6 rounded-xl text-lg font-tech"
                  >
                    <a 
                      href={projectToDisplay.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      View Live Demo
                    </a>
                  </Button>
                )}
                
                {projectToDisplay.githubUrl && (
                  <Button 
                    asChild 
                    variant="outline" 
                    className="bg-white/5 hover:bg-white/10 border-white/10 text-white px-6 py-6 rounded-xl text-lg font-tech"
                  >
                    <a 
                      href={projectToDisplay.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Github className="mr-2 h-5 w-5" />
                      View Source Code
                    </a>
                  </Button>
                )}
              </div>
              
              <a 
                href="#projects" 
                className="mt-8 inline-flex items-center text-white/70 hover:text-white transition-colors text-lg font-tech"
              >
                View all projects 
                <ChevronRight className="ml-1 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestWork; 