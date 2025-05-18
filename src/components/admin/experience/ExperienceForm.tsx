import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/lib/context/PortfolioContext";
import { Experience } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { X, Save, Plus, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface ExperienceFormProps {
  experienceId: string | null;
  onClose: () => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experienceId, onClose }) => {
  const { portfolioData, addExperience, updateExperience } = usePortfolio();
  
  const [formData, setFormData] = useState<Omit<Experience, "id">>({
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    technologies: [],
    current: false
  });
  
  // Load existing experience data if editing
  useEffect(() => {
    if (experienceId !== null) {
      const experience = portfolioData.experiences.find(e => e.id === experienceId);
      if (experience) {
        const { id, ...experienceData } = experience;
        setFormData(experienceData);
      }
    }
  }, [experienceId, portfolioData.experiences]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle current job toggle
  const handleCurrentJobToggle = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      current: checked,
      endDate: checked ? null : ""
    }));
  };
  
  // Handle adding a new technology
  const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    e.preventDefault();
    const techInput = (document.getElementById('techInput') as HTMLInputElement).value;
    
    if (techInput.trim()) {
      // Check if technology already exists
      if (!formData.technologies.includes(techInput.trim())) {
        setFormData(prev => ({
          ...prev,
          technologies: [...prev.technologies, techInput.trim()]
        }));
      }
      (document.getElementById('techInput') as HTMLInputElement).value = '';
    }
  };
  
  // Handle removing a technology
  const handleRemoveTech = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jobTitle || !formData.company || !formData.startDate || (!formData.endDate && !formData.current)) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (experienceId !== null) {
      updateExperience(experienceId, formData);
    } else {
      addExperience(formData);
    }
    
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-tech text-white">
          {experienceId !== null ? "Edit Experience" : "Add New Experience"}
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
        {/* Job Title */}
        <div className="space-y-2">
          <Label htmlFor="jobTitle" className="text-white font-tech">
            Job Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Senior Frontend Developer"
            className="bg-white/5 border-white/10 text-white font-tech"
            required
          />
        </div>
        
        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="company" className="text-white font-tech">
            Company <span className="text-red-500">*</span>
          </Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Acme Inc."
            className="bg-white/5 border-white/10 text-white font-tech"
            required
          />
        </div>
        
        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-white font-tech">
            Location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. San Francisco, CA"
            className="bg-white/5 border-white/10 text-white font-tech"
            required
          />
        </div>
        
        {/* Start Date */}
        <div className="space-y-2">
          <Label htmlFor="startDate" className="text-white font-tech">
            Start Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            className="bg-white/5 border-white/10 text-white font-tech"
            required
          />
        </div>
        
        {/* End Date */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="endDate" className="text-white font-tech">
              End Date {!formData.current && <span className="text-red-500">*</span>}
            </Label>
            <div className="flex items-center gap-2">
              <Switch
                id="current"
                checked={formData.current || false}
                onCheckedChange={handleCurrentJobToggle}
              />
              <Label htmlFor="current" className="text-white/70 text-sm font-tech">
                Current Job
              </Label>
            </div>
          </div>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate || ""}
            onChange={handleChange}
            className="bg-white/5 border-white/10 text-white font-tech"
            disabled={formData.current}
            required={!formData.current}
          />
        </div>
      </div>
      
      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-white font-tech">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your responsibilities and achievements in this role"
          className="bg-white/5 border-white/10 text-white font-tech min-h-[100px]"
          required
        />
      </div>
      
      {/* Technologies */}
      <div className="space-y-2">
        <Label htmlFor="technologies" className="text-white font-tech">
          Technologies
        </Label>
        <div className="flex gap-2">
          <Input
            id="techInput"
            placeholder="Add technologies (press Enter)"
            className="bg-white/5 border-white/10 text-white font-tech"
            onKeyPress={(e) => e.key === "Enter" && handleAddTech(e)}
          />
          <Button
            type="button"
            onClick={handleAddTech}
            className="bg-theme-purple hover:bg-theme-purple/90 text-white"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-white/10 text-white px-3 py-1 rounded-full text-sm font-tech"
            >
              <span>{tech}</span>
              <button
                type="button"
                onClick={() => handleRemoveTech(tech)}
                className="text-white/70 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {formData.technologies.length === 0 && (
            <span className="text-white/50 text-sm font-tech">No technologies added yet</span>
          )}
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
          {experienceId !== null ? "Update Experience" : "Add Experience"}
        </Button>
      </div>
    </form>
  );
};

export default ExperienceForm; 