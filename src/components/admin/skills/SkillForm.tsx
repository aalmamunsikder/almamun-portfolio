import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/lib/context/PortfolioContext";
import { Skill } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillFormProps {
  skillId: number | null;
  onClose: () => void;
}

const categoryOptions = [
  "Frontend", 
  "Backend", 
  "Languages", 
  "Design", 
  "DevOps", 
  "Mobile", 
  "Database",
  "Other"
];

const iconOptions = [
  "Code", 
  "Server", 
  "Database", 
  "Palette", 
  "FileCode", 
  "Smartphone", 
  "Cloud",
  "Terminal",
  "Globe",
  "Layers"
];

const SkillForm: React.FC<SkillFormProps> = ({ skillId, onClose }) => {
  const { portfolioData, addSkill, updateSkill } = usePortfolio();
  
  const [formData, setFormData] = useState<Omit<Skill, "id">>({
    name: "",
    icon: "Code",
    level: 70,
    category: "Frontend",
  });
  
  // Load existing skill data if editing
  useEffect(() => {
    if (skillId !== null) {
      const skill = portfolioData.skills.find(s => s.id === skillId);
      if (skill) {
        const { id, ...skillData } = skill;
        setFormData(skillData);
      }
    }
  }, [skillId, portfolioData.skills]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle slider changes
  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, level: value[0] }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (skillId !== null) {
      updateSkill({ ...formData, id: skillId });
    } else {
      addSkill(formData);
    }
    
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-tech text-white">
          {skillId !== null ? "Edit Skill" : "Add New Skill"}
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white/70 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skill Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white font-tech">
            Skill Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, UI Design"
            className="bg-white/5 border-white/10 text-white font-tech"
            required
          />
        </div>
        
        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-white font-tech">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleSelectChange("category", value)}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white font-tech">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-background border-white/10">
              {categoryOptions.map((category) => (
                <SelectItem 
                  key={category} 
                  value={category}
                  className="font-tech text-white/90 focus:bg-white/10 focus:text-white"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Icon */}
        <div className="space-y-2">
          <Label htmlFor="icon" className="text-white font-tech">
            Icon
          </Label>
          <Select
            value={formData.icon}
            onValueChange={(value) => handleSelectChange("icon", value)}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white font-tech">
              <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent className="bg-background border-white/10">
              {iconOptions.map((icon) => (
                <SelectItem 
                  key={icon} 
                  value={icon}
                  className="font-tech text-white/90 focus:bg-white/10 focus:text-white"
                >
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Skill Level */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="level" className="text-white font-tech">
              Proficiency Level
            </Label>
            <span className="text-white font-tech">{formData.level}%</span>
          </div>
          <Slider
            id="level"
            value={[formData.level]}
            onValueChange={handleSliderChange}
            max={100}
            step={5}
            className="py-4"
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="bg-white/5 border-white/10 hover:bg-white/10 text-white font-tech"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white font-tech"
        >
          <Save className="mr-2 h-4 w-4" />
          {skillId !== null ? "Update Skill" : "Add Skill"}
        </Button>
      </div>
    </form>
  );
};

export default SkillForm; 