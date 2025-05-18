import React, { useState } from "react";
import { usePortfolio } from "@/lib/context/PortfolioContext";
import { Link } from "react-router-dom";
import { 
  User, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Eye, 
  Star, 
  Edit, 
  ChevronRight,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { portfolioData, resetToDefault } = usePortfolio();
  
  // Add confirmation dialog state
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  
  // Count items in each section of the portfolio
  const stats = [
    {
      title: "Projects",
      count: portfolioData.projects.length,
      icon: <Code className="h-6 w-6 text-theme-purple" />,
      featured: portfolioData.projects.filter(p => p.featured).length,
      path: "/admin/projects"
    },
    {
      title: "Skills",
      count: portfolioData.skills.length,
      icon: <Code className="h-6 w-6 text-theme-purple" />,
      featured: null,
      path: "/admin/skills"
    },
    {
      title: "Work Experience",
      count: portfolioData.experiences.length,
      icon: <Briefcase className="h-6 w-6 text-theme-purple" />,
      featured: null,
      path: "/admin/experience"
    },
    {
      title: "Education",
      count: portfolioData.education.length,
      icon: <GraduationCap className="h-6 w-6 text-theme-purple" />,
      featured: null,
      path: "/admin/education"
    }
  ];
  
  // Get featured projects
  const featuredProjects = portfolioData.projects
    .filter(project => project.featured)
    .slice(0, 5);
  
  // Handle reset confirmation
  const handleReset = () => {
    resetToDefault();
    setIsResetConfirmOpen(false);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-tech text-white mb-2">Dashboard</h1>
          <p className="text-white/70 text-lg font-tech">
            Welcome to your portfolio admin panel
          </p>
        </div>
        
        <Button
          variant="outline"
          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20"
          onClick={() => setIsResetConfirmOpen(true)}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Data
        </Button>
      </div>
      
      {/* Reset Confirmation Dialog */}
      {isResetConfirmOpen && (
        <div className="glass-morphism border border-red-500/20 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-red-500/20 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-tech text-white mb-2">Reset Portfolio Data?</h3>
              <p className="text-white/70 font-tech mb-4">
                This will restore all data to default values. All your changes will be lost. This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  onClick={() => setIsResetConfirmOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={handleReset}
                >
                  Reset Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.title} 
            className="glass-morphism border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                {stat.icon}
              </div>
              
              <Link 
                to={stat.path}
                className="text-white/70 hover:text-white hover:bg-white/5 p-2 rounded-full transition-colors"
              >
                <Edit className="h-4 w-4" />
              </Link>
            </div>
            
            <h3 className="mt-4 text-2xl md:text-3xl font-tech text-white">{stat.count}</h3>
            <p className="text-white/70 font-tech">{stat.title}</p>
            
            {stat.featured !== null && (
              <div className="flex items-center gap-1 mt-2 text-xs text-white/50 font-tech">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>{stat.featured} featured</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Portfolio Preview */}
      <div className="glass-morphism border border-white/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-tech text-white">Portfolio Preview</h2>
            <p className="text-white/70 font-tech">View your live portfolio</p>
          </div>
          
          <Link to="/" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white">
              <Eye className="mr-2 h-4 w-4" />
              View Live Site
            </Button>
          </Link>
        </div>
        
        <div className="bg-theme-purple/5 border border-theme-purple/20 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-5 w-5 text-theme-purple" />
            <h3 className="text-lg font-tech text-white">Personal Info</h3>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 mt-4">
            <div className="flex-shrink-0">
              <img 
                src={portfolioData.personalInfo.avatar} 
                alt={portfolioData.personalInfo.name} 
                className="w-20 h-20 rounded-full object-cover border-2 border-theme-purple/30"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-tech text-white">{portfolioData.personalInfo.name}</h3>
              <p className="text-theme-purple font-tech">{portfolioData.personalInfo.title}</p>
              <p className="text-white/70 font-tech text-sm mt-1 line-clamp-2">{portfolioData.personalInfo.bio}</p>
            </div>
            
            <div className="ml-auto">
              <Link to="/admin/personal">
                <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white">
                  Edit Info
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Projects */}
      <div className="glass-morphism border border-white/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-tech text-white">Featured Projects</h2>
            <p className="text-white/70 font-tech">Projects highlighted on your portfolio</p>
          </div>
          
          <Link to="/admin/projects">
            <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white">
              Manage Projects
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:border-white/20 transition-all"
              >
                <div className="h-36 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-tech text-white mb-1 line-clamp-1">{project.title}</h3>
                  
                  <div className="flex flex-wrap gap-1 mt-2 mb-3">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs py-1 px-2 rounded-full bg-white/10 text-white/80 font-tech"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs py-1 px-2 rounded-full bg-white/10 text-white/80 font-tech">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-white/70 text-sm font-tech line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  
                  <Link to={`/admin/projects?edit=${project.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full justify-center bg-white/5 border-white/10 hover:bg-white/10 text-white"
                    >
                      <Edit className="mr-2 h-3 w-3" />
                      Edit Project
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-white/50 font-tech mb-4">No featured projects yet</p>
              <Link to="/admin/projects">
                <Button className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white">
                  Add Project
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 