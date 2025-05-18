import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePortfolio } from "@/lib/context/PortfolioContext";
import { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, X, Save, ArrowLeft, Plus, Trash2 } from "lucide-react";

const ProjectForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { portfolioData, addProject, updateProject } = usePortfolio();
  
  // Form state
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: "",
    description: "",
    imageUrl: "",
    tags: [],
    liveUrl: "",
    githubUrl: "",
    featured: false
  });
  
  // Tag input state
  const [tagInput, setTagInput] = useState("");
  
  // Load existing project data if editing
  useEffect(() => {
    if (projectId) {
      const project = portfolioData.projects.find(p => p.id === projectId);
      if (project) {
        const { id, ...projectData } = project;
        setFormData(projectData);
      } else {
        navigate("/admin/projects");
      }
    }
  }, [projectId, portfolioData.projects, navigate]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle featured toggle
  const handleFeaturedToggle = (checked: boolean) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  };
  
  // Handle adding a new tag
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    e.preventDefault();
    
    if (tagInput.trim()) {
      // Check if tag already exists
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput("");
    }
  };
  
  // Handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.imageUrl) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (projectId) {
      updateProject(projectId, formData);
      navigate("/admin/projects");
    } else {
      addProject(formData);
      navigate("/admin/projects");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-tech text-white mb-2">
            {projectId ? "Edit Project" : "Add New Project"}
          </h1>
          <p className="text-white/70 text-lg font-tech">
            {projectId ? "Update your project information" : "Create a new portfolio project"}
          </p>
        </div>
        
        <Button
          variant="outline"
          className="bg-white/5 border-white/10 hover:bg-white/10 text-white font-tech"
          onClick={() => navigate("/admin/projects")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-morphism border border-white/10 rounded-xl p-6 space-y-6">
          {/* Project Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-tech">
              Project Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              className="bg-white/5 border-white/10 text-white font-tech"
              required
            />
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
              placeholder="Enter project description"
              className="bg-white/5 border-white/10 text-white font-tech min-h-[100px]"
              required
            />
          </div>
          
          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-white font-tech">
              Image URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="bg-white/5 border-white/10 text-white font-tech"
              required
            />
            {formData.imageUrl && (
              <div className="mt-2 relative w-full aspect-video rounded-lg overflow-hidden">
                <img
                  src={formData.imageUrl}
                  alt="Project Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}
          </div>
          
          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-white font-tech">
              Tags
            </Label>
            <div className="flex gap-2">
              <Input
                id="tagInput"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag(e)}
                placeholder="Add tags (press Enter)"
                className="bg-white/5 border-white/10 text-white font-tech"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                className="bg-theme-purple hover:bg-theme-purple/90 text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-white/10 text-white px-3 py-1 rounded-full text-sm font-tech"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-white/70 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {formData.tags.length === 0 && (
                <span className="text-white/50 text-sm font-tech">No tags added yet</span>
              )}
            </div>
          </div>
          
          {/* Live URL */}
          <div className="space-y-2">
            <Label htmlFor="liveUrl" className="text-white font-tech">
              Live Demo URL
            </Label>
            <Input
              id="liveUrl"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="Enter live demo URL"
              className="bg-white/5 border-white/10 text-white font-tech"
            />
          </div>
          
          {/* GitHub URL */}
          <div className="space-y-2">
            <Label htmlFor="githubUrl" className="text-white font-tech">
              GitHub Repository URL
            </Label>
            <Input
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="Enter GitHub repo URL"
              className="bg-white/5 border-white/10 text-white font-tech"
            />
          </div>
          
          {/* Featured */}
          <div className="flex items-center justify-between">
            <Label htmlFor="featured" className="text-white font-tech cursor-pointer">
              Mark as Featured Project
            </Label>
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={handleFeaturedToggle}
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="bg-white/5 border-white/10 hover:bg-white/10 text-white font-tech"
            onClick={() => navigate("/admin/projects")}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white font-tech"
          >
            <Save className="mr-2 h-4 w-4" />
            {projectId ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm; 