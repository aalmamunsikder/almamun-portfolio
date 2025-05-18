import React, { useState } from "react";
import { usePortfolio } from "@/lib/context/PortfolioContext";
import { Plus, Trash2, Edit, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import SkillForm from "./SkillForm";

const SkillsManager = () => {
  const { portfolioData, deleteSkill } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editingSkill, setEditingSkill] = useState<number | null>(null);
  
  // Filter skills based on search term and active filter
  const filteredSkills = portfolioData.skills
    .filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(skill => activeFilter === "all" || skill.category === activeFilter);
  
  // Extract unique categories for filter options
  const categories = Array.from(
    new Set(portfolioData.skills.map(skill => skill.category))
  );
  
  // Handle skill deletion with confirmation
  const handleDeleteSkill = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteSkill(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-tech text-white mb-2">
            Skills
          </h1>
          <p className="text-white/70 text-lg font-tech">
            Manage your skills and expertise
          </p>
        </div>
        
        <Button 
          className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white font-tech"
          onClick={() => {
            setIsAddingSkill(true);
            setEditingSkill(null);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>
      
      {/* Skill form for adding/editing */}
      {(isAddingSkill || editingSkill !== null) && (
        <div className="glass-morphism border border-white/10 rounded-xl p-6">
          <SkillForm 
            skillId={editingSkill} 
            onClose={() => {
              setIsAddingSkill(false);
              setEditingSkill(null);
            }}
          />
        </div>
      )}
      
      {/* Search and filters */}
      <div className="glass-morphism border border-white/10 rounded-xl p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search skills..."
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
          
          {categories.map(category => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              className={cn(
                activeFilter === category 
                  ? "bg-theme-purple hover:bg-theme-purple/90" 
                  : "bg-white/5 border-white/10 hover:bg-white/10",
                "text-sm font-tech"
              )}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Skills list */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="glass-morphism border border-white/10 rounded-xl p-5 hover:shadow-lg hover:shadow-theme-purple/5 transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                    <span className="text-theme-purple text-xl">{skill.icon}</span>
                  </div>
                  <h3 className="text-xl font-tech text-white">{skill.name}</h3>
                </div>
                <div className="text-sm text-white/70 px-2 py-1 rounded-full bg-white/10 font-tech">
                  {skill.category}
                </div>
              </div>
              
              {/* Skill level indicator */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white/70 text-sm font-tech">Proficiency</span>
                  <span className="text-white font-tech">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-theme-purple to-blue-500" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-white/5 border-white/10 hover:bg-white/10 text-white font-tech text-sm"
                  onClick={() => {
                    setEditingSkill(skill.id);
                    setIsAddingSkill(false);
                  }}
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-500 font-tech text-sm"
                  onClick={() => handleDeleteSkill(skill.id, skill.name)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-morphism border border-white/10 rounded-xl p-8 text-center">
          <p className="text-white/70 font-tech mb-4">
            {searchTerm || activeFilter !== "all"
              ? "No skills match your search criteria"
              : "No skills added yet"}
          </p>
          {!searchTerm && activeFilter === "all" && !isAddingSkill && (
            <Button 
              className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white font-tech"
              onClick={() => setIsAddingSkill(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsManager; 