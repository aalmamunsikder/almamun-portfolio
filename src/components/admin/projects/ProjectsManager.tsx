import React, { useState } from "react";
import { usePortfolio } from "@/lib/context/PortfolioContext";
import { Link } from "react-router-dom";
import { 
  Plus, Trash2, Edit, Search, ExternalLink, Github, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ProjectsManager = () => {
  const { portfolioData, deleteProject } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Filter projects based on search term and active filter
  const filteredProjects = portfolioData.projects
    .filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(project => {
      if (activeFilter === "all") return true;
      if (activeFilter === "featured") return project.featured;
      return project.tags.includes(activeFilter);
    });
  
  // Extract unique tags from all projects for filter options
  const allTags = Array.from(
    new Set(portfolioData.projects.flatMap(project => project.tags))
  );
  
  // Handle project deletion with confirmation
  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-tech text-white mb-2">
            Projects
          </h1>
          <p className="text-white/70 text-lg font-tech">
            Manage your portfolio projects
          </p>
        </div>
        
        <Link to="/admin/projects/new">
          <Button className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white font-tech">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </div>
      
      {/* Search and filters */}
      <div className="glass-morphism border border-white/10 rounded-xl p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white font-tech"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            className={cn(
              activeFilter === "all" 
                ? "bg-theme-purple hover:bg-theme-purple/90" 
                : "bg-white/5 border-white/10 hover:bg-white/10",
              "text-sm font-tech"
            )}
            onClick={() => setActiveFilter("all")}
          >
            All
          </Button>
          
          <Button
            variant={activeFilter === "featured" ? "default" : "outline"}
            className={cn(
              activeFilter === "featured" 
                ? "bg-theme-purple hover:bg-theme-purple/90" 
                : "bg-white/5 border-white/10 hover:bg-white/10",
              "text-sm font-tech"
            )}
            onClick={() => setActiveFilter("featured")}
          >
            Featured
          </Button>
          
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={activeFilter === tag ? "default" : "outline"}
              className={cn(
                activeFilter === tag 
                  ? "bg-theme-purple hover:bg-theme-purple/90" 
                  : "bg-white/5 border-white/10 hover:bg-white/10",
                "text-sm font-tech"
              )}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Projects list */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass-morphism border border-white/10 rounded-xl overflow-hidden group">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>
                
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-theme-purple/90 text-white text-xs py-1 px-2 rounded-full font-tech">
                    Featured
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-xl font-tech text-white">{project.title}</h3>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-white/70 font-tech text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={`${project.id}-${tag}`}
                      className="text-xs py-1 px-2 rounded-full bg-white/5 border border-white/10 font-tech"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs py-1 px-2 rounded-full bg-white/5 border border-white/10 font-tech">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2 mb-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/80 font-tech text-sm"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Live</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/80 font-tech text-sm"
                  >
                    <Github className="w-3 h-3" />
                    <span>Code</span>
                  </a>
                </div>
                
                <div className="flex gap-2">
                  <Link to={`/admin/projects/edit/${project.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white font-tech text-sm"
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-500 font-tech text-sm"
                    onClick={() => handleDeleteProject(project.id, project.title)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-morphism border border-white/10 rounded-xl p-8 text-center">
          <p className="text-white/70 font-tech mb-4">
            {searchTerm || activeFilter !== "all"
              ? "No projects match your search criteria"
              : "No projects yet"}
          </p>
          {!searchTerm && activeFilter === "all" && (
            <Link to="/admin/projects/new">
              <Button className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white font-tech">
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsManager; 