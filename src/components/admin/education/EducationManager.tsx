import React, { useState } from "react";
import { usePortfolio } from "@/lib/context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Edit2, Trash2, GraduationCap, Calendar } from "lucide-react";
import EducationForm from "./EducationForm";

const EducationManager = () => {
  const { portfolioData, deleteEducation } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);

  // Filter and sort education entries
  const filteredEducation = portfolioData.education
    .filter(edu => 
      edu.institution.toLowerCase().includes(searchTerm.toLowerCase()) || 
      edu.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
      edu.fieldOfStudy.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle education deletion
  const handleDeleteEducation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this education entry?")) {
      deleteEducation(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-tech text-white mb-2">
          Education
        </h1>
        <p className="text-white/70 text-lg font-tech">
          Manage your educational background
        </p>
      </div>

      {/* Actions row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Button 
          onClick={() => setIsAddingEducation(true)}
          className="w-full sm:w-auto bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90 transition-opacity"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Education
        </Button>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input
            type="text"
            placeholder="Search education..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full bg-white/5 border-white/10 text-white placeholder:text-white/30"
          />
        </div>
      </div>

      {/* Education form */}
      {isAddingEducation && (
        <div className="glass-morphism rounded-2xl border border-white/10 p-6">
          <EducationForm 
            onClose={() => setIsAddingEducation(false)} 
          />
        </div>
      )}
      
      {editingEducationId && (
        <div className="glass-morphism rounded-2xl border border-white/10 p-6">
          <EducationForm 
            educationId={editingEducationId} 
            onClose={() => setEditingEducationId(null)} 
          />
        </div>
      )}

      {/* Education list */}
      <div className="space-y-4">
        {filteredEducation.length === 0 ? (
          <div className="text-center py-10 glass-morphism rounded-2xl border border-white/10">
            <GraduationCap className="mx-auto h-12 w-12 text-white/30 mb-4" />
            <h3 className="text-xl font-tech text-white">No education found</h3>
            <p className="text-white/70 font-tech mt-2">
              {searchTerm ? "Try a different search term" : "Add your educational background"}
            </p>
          </div>
        ) : (
          filteredEducation.map((education) => (
            <div 
              key={education.id}
              className="glass-morphism rounded-2xl border border-white/10 p-6 transition-all hover:border-white/20"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <GraduationCap className="h-6 w-6 text-theme-purple" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-tech text-white">{education.degree} in {education.fieldOfStudy}</h3>
                  <p className="text-theme-purple font-tech">{education.institution}</p>
                  
                  <div className="flex items-center mt-2 mb-4">
                    <Calendar className="h-4 w-4 text-white/50 mr-2" />
                    <span className="text-white/70 font-tech text-sm">
                      {formatDate(education.startDate)} - {education.current ? 'Present' : formatDate(education.endDate)}
                    </span>
                  </div>
                  
                  {education.description && (
                    <p className="text-white/70 font-tech mt-3">{education.description}</p>
                  )}
                  
                  {education.achievements && education.achievements.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-tech text-white/80 mb-2">Achievements & Activities</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {education.achievements.map((achievement, index) => (
                          <li key={index} className="text-white/70 font-tech text-sm">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex md:flex-col gap-2 md:gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setEditingEducationId(education.id)}
                    className="border-white/10 bg-white/5 hover:bg-white/10"
                  >
                    <Edit2 className="h-4 w-4 text-white" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteEducation(education.id)}
                    className="border-white/10 bg-white/5 hover:bg-red-500/20 hover:border-red-500/30"
                  >
                    <Trash2 className="h-4 w-4 text-white hover:text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EducationManager; 