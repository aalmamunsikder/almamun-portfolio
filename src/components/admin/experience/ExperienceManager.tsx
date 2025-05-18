import React, { useState } from "react";
import { usePortfolio } from "@/lib/context/PortfolioContext";
import { Link } from "react-router-dom";
import { 
  Plus, Trash2, Edit, Search, Briefcase, CalendarClock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ExperienceForm from "./ExperienceForm";

const ExperienceManager = () => {
  const { portfolioData, deleteExperience } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [editingExperience, setEditingExperience] = useState<string | null>(null);
  
  // Filter experiences based on search term
  const filteredExperiences = portfolioData.experiences
    .filter(experience => 
      experience.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
      experience.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experience.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experience.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    // Sort by startDate in descending order (most recent first)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  
  // Format date to display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
    }).format(date);
  };
  
  // Calculate duration between dates
  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    
    if (months < 0) {
      return `${years - 1} yr${years - 1 !== 1 ? 's' : ''} ${months + 12} mo${months + 12 !== 1 ? 's' : ''}`;
    }
    
    if (years === 0) {
      return `${months} mo${months !== 1 ? 's' : ''}`;
    }
    
    return `${years} yr${years !== 1 ? 's' : ''} ${months} mo${months !== 1 ? 's' : ''}`;
  };
  
  // Handle experience deletion with confirmation
  const handleDeleteExperience = (id: string) => {
    if (window.confirm(`Are you sure you want to delete this experience?`)) {
      deleteExperience(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-tech text-white mb-2">
            Work Experience
          </h1>
          <p className="text-white/70 text-lg font-tech">
            Manage your professional experience
          </p>
        </div>
        
        <Button 
          className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white font-tech"
          onClick={() => {
            setIsAddingExperience(true);
            setEditingExperience(null);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>
      
      {/* Experience form for adding/editing */}
      {(isAddingExperience || editingExperience !== null) && (
        <div className="glass-morphism border border-white/10 rounded-xl p-6">
          <ExperienceForm 
            experienceId={editingExperience} 
            onClose={() => {
              setIsAddingExperience(false);
              setEditingExperience(null);
            }}
          />
        </div>
      )}
      
      {/* Search */}
      <div className="glass-morphism border border-white/10 rounded-xl p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search experiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white font-tech"
          />
        </div>
      </div>
      
      {/* Experiences list */}
      {filteredExperiences.length > 0 ? (
        <div className="space-y-6">
          {filteredExperiences.map((experience) => (
            <div 
              key={experience.id} 
              className="glass-morphism border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-theme-purple/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row gap-4 md:items-start">
                {/* Company logo placeholder */}
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                  <Briefcase className="h-6 w-6 text-theme-purple" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-xl font-tech text-white">{experience.jobTitle}</h3>
                    <div className="flex items-center gap-2 text-white/70 text-sm font-tech">
                      <CalendarClock className="h-4 w-4" />
                      <span>{formatDate(experience.startDate)} - {formatDate(experience.endDate)}</span>
                      <span className="text-theme-purple">
                        ({calculateDuration(experience.startDate, experience.endDate)})
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-white/80 font-tech">
                    <span className="font-semibold">{experience.company}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{experience.location}</span>
                  </div>
                  
                  <p className="mt-3 text-white/70 font-tech">
                    {experience.description}
                  </p>
                  
                  {experience.technologies.length > 0 && (
                    <div className="mt-4">
                      <p className="text-white/80 text-sm font-tech mb-2">Technologies:</p>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, index) => (
                          <span 
                            key={index} 
                            className="text-xs py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/80 font-tech"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3 mt-5">
                    <Button
                      variant="outline"
                      className="bg-white/5 border-white/10 hover:bg-white/10 text-white font-tech text-sm"
                      onClick={() => {
                        setEditingExperience(experience.id);
                        setIsAddingExperience(false);
                      }}
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-500 font-tech text-sm"
                      onClick={() => handleDeleteExperience(experience.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-morphism border border-white/10 rounded-xl p-8 text-center">
          <p className="text-white/70 font-tech mb-4">
            {searchTerm 
              ? "No experiences match your search criteria"
              : "No work experiences added yet"}
          </p>
          {!searchTerm && !isAddingExperience && (
            <Button 
              className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white font-tech"
              onClick={() => setIsAddingExperience(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExperienceManager; 