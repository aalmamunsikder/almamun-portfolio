import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/lib/context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { X, Plus, Trash2 } from "lucide-react";

interface EducationFormProps {
  educationId?: string;
  onClose: () => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ educationId, onClose }) => {
  const { portfolioData, addEducation, updateEducation } = usePortfolio();
  
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    current: false,
    achievements: [""]
  });

  useEffect(() => {
    if (educationId) {
      const education = portfolioData.education.find(e => e.id === educationId);
      if (education) {
        // Initialize with existing education data
        setFormData({
          institution: education.institution,
          degree: education.degree,
          fieldOfStudy: education.fieldOfStudy || "",
          startDate: formatDateForInput(education.startDate),
          endDate: formatDateForInput(education.endDate),
          location: education.location || "",
          description: education.description || "",
          current: education.current || false,
          achievements: education.achievements?.length ? [...education.achievements] : [""]
        });
      }
    }
  }, [educationId, portfolioData.education]);

  // Format date string for input element
  const formatDateForInput = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle current status
  const handleCurrentToggle = () => {
    setFormData({ 
      ...formData, 
      current: !formData.current,
      // Clear end date if current is true
      endDate: !formData.current ? "" : formData.endDate 
    });
  };

  // Handle achievement input changes
  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData({ ...formData, achievements: newAchievements });
  };

  // Add new achievement field
  const handleAddAchievement = () => {
    setFormData({ 
      ...formData, 
      achievements: [...formData.achievements, ""] 
    });
  };

  // Remove achievement field
  const handleRemoveAchievement = (index: number) => {
    const newAchievements = formData.achievements.filter((_, i) => i !== index);
    setFormData({ ...formData, achievements: newAchievements.length ? newAchievements : [""] });
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.institution || !formData.degree || !formData.startDate || (!formData.endDate && !formData.current)) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Filter out empty achievements
    const filteredAchievements = formData.achievements.filter(a => a.trim() !== "");
    
    if (educationId) {
      // Update existing education
      updateEducation(educationId, {
        ...formData,
        achievements: filteredAchievements
      });
    } else {
      // Add new education
      addEducation({
        ...formData,
        achievements: filteredAchievements
      });
    }
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-tech text-white">
          {educationId ? "Edit Education" : "Add Education"}
        </h3>
        <Button 
          type="button" 
          variant="outline" 
          size="icon" 
          onClick={onClose}
          className="border-white/10 bg-white/5 hover:bg-white/10"
        >
          <X className="h-4 w-4 text-white" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Institution */}
        <div className="space-y-2">
          <Label htmlFor="institution" className="text-white font-tech">
            Institution <span className="text-red-500">*</span>
          </Label>
          <Input
            id="institution"
            name="institution"
            value={formData.institution}
            onChange={handleInputChange}
            placeholder="University or School Name"
            className="bg-white/5 border-white/10 text-white"
            required
          />
        </div>
        
        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-white font-tech">
            Location
          </Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="City, Country"
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
        
        {/* Degree */}
        <div className="space-y-2">
          <Label htmlFor="degree" className="text-white font-tech">
            Degree <span className="text-red-500">*</span>
          </Label>
          <Input
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleInputChange}
            placeholder="Bachelor's, Master's, etc."
            className="bg-white/5 border-white/10 text-white"
            required
          />
        </div>
        
        {/* Field of Study */}
        <div className="space-y-2">
          <Label htmlFor="fieldOfStudy" className="text-white font-tech">
            Field of Study
          </Label>
          <Input
            id="fieldOfStudy"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleInputChange}
            placeholder="Computer Science, Design, etc."
            className="bg-white/5 border-white/10 text-white"
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
            onChange={handleInputChange}
            className="bg-white/5 border-white/10 text-white"
            required
          />
        </div>
        
        {/* End Date / Current */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="endDate" className="text-white font-tech">
              End Date {!formData.current && <span className="text-red-500">*</span>}
            </Label>
            <div className="flex items-center space-x-2">
              <Switch 
                id="current"
                checked={formData.current}
                onCheckedChange={handleCurrentToggle}
              />
              <Label htmlFor="current" className="text-white/70 font-tech text-sm">
                Current
              </Label>
            </div>
          </div>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleInputChange}
            disabled={formData.current}
            className="bg-white/5 border-white/10 text-white disabled:opacity-50"
            required={!formData.current}
          />
        </div>
      </div>
      
      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-white font-tech">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Brief description of your education..."
          className="bg-white/5 border-white/10 text-white min-h-[100px]"
        />
      </div>
      
      {/* Achievements */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-white font-tech">Achievements & Activities</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddAchievement}
            className="border-white/10 bg-white/5 hover:bg-white/10"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>
        
        {formData.achievements.map((achievement, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={achievement}
              onChange={(e) => handleAchievementChange(index, e.target.value)}
              placeholder="Scholarship, award, project, etc."
              className="bg-white/5 border-white/10 text-white flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={() => handleRemoveAchievement(index)}
              disabled={formData.achievements.length === 1 && achievement === ""}
              className="border-white/10 bg-white/5 hover:bg-red-500/20 hover:border-red-500/30"
            >
              <Trash2 className="h-4 w-4 text-white hover:text-red-500" />
            </Button>
          </div>
        ))}
      </div>
      
      {/* Submit buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90 transition-opacity"
        >
          {educationId ? "Update Education" : "Add Education"}
        </Button>
      </div>
    </form>
  );
};

export default EducationForm; 