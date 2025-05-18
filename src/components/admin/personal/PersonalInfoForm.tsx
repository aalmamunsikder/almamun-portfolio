import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/lib/context/PortfolioContext";
import { PersonalInfo, SocialLink } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Save, Plus, Trash2, Link2, Mail, Phone, MapPin,
  Github, Linkedin, Twitter, Instagram, Youtube, Facebook
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid';

// Custom WhatsApp icon component with proper branding
const WhatsAppIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    className="fill-current text-theme-purple"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
  </svg>
);

const socialPlatformIcons = {
  Github: Github,
  Linkedin: Linkedin,
  Twitter: Twitter,
  Instagram: Instagram,
  Youtube: Youtube,
  Facebook: Facebook,
  WhatsApp: WhatsAppIcon
};

const socialPlatformOptions = [
  "Github", "Linkedin", "Twitter", "Instagram", "Youtube", "Facebook", "WhatsApp"
];

// WhatsApp URL format helper
const getPlaceholderForPlatform = (platform: string) => {
  if (platform.toLowerCase() === 'whatsapp') {
    return 'https://wa.me/1234567890 (use country code without +)';
  }
  return `${platform} URL`;
};

// Fix WhatsApp URL to ensure it's absolute
const getFixedUrl = (url: string, platform: string): string => {
  if (platform === 'WhatsApp' && url && !url.startsWith('http')) {
    // If it's a WhatsApp URL that doesn't start with http, make it absolute
    if (url.includes('wa.me')) {
      return `https://${url}`;
    } else if (url.match(/^\d+$/)) {
      // If it's just a phone number, format it properly
      return `https://wa.me/${url}`;
    }
  }
  return url;
};

const PersonalInfoForm = () => {
  const { portfolioData, updatePersonalInfo } = usePortfolio();
  
  const [formData, setFormData] = useState<PersonalInfo>({
    ...portfolioData.personalInfo
  });
  
  useEffect(() => {
    setFormData(portfolioData.personalInfo);
  }, [portfolioData.personalInfo]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle nested contact info changes
  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [name]: value
      }
    }));
  };
  
  // Handle availability toggle
  const handleAvailabilityToggle = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        availableForWork: checked
      }
    }));
  };
  
  // Handle adding a new social link
  const handleAddSocialLink = () => {
    const newId = uuidv4();
      
    const newPlatform = socialPlatformOptions.find(
      platform => !formData.socialLinks.some(link => link.platform === platform)
    ) || socialPlatformOptions[0];
    
    // For WhatsApp, provide a template URL
    const defaultUrl = newPlatform === 'WhatsApp' ? 'https://wa.me/' : '';
    
    setFormData(prev => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks, 
        { id: newId, platform: newPlatform, url: defaultUrl, icon: newPlatform }
      ]
    }));
  };
  
  // Handle removing a social link
  const handleRemoveSocialLink = (id: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(link => link.id !== id)
    }));
  };
  
  // Handle social link change
  const handleSocialLinkChange = (id: string, field: keyof SocialLink, value: string) => {
    // If this is a WhatsApp URL being updated, make sure it has https://
    if (field === 'url') {
      const link = formData.socialLinks.find(l => l.id === id);
      if (link && link.platform === 'WhatsApp') {
        value = getFixedUrl(value, 'WhatsApp');
      }
    }

    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link => 
        link.id === id ? { ...link, [field]: value, ...(field === 'platform' ? { icon: value } : {}) } : link
      )
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.title || !formData.bio) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Make sure all WhatsApp URLs are properly formatted
    const fixedLinks = formData.socialLinks.map(link => {
      if (link.platform === 'WhatsApp') {
        return { ...link, url: getFixedUrl(link.url, 'WhatsApp') };
      }
      return link;
    });

    updatePersonalInfo({...formData, socialLinks: fixedLinks});
    alert("Personal information updated successfully!");
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="glass-morphism border border-white/10 rounded-xl p-6 space-y-6">
        <h3 className="text-xl font-tech text-white mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white font-tech">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="bg-white/5 border-white/10 text-white font-tech"
              required
            />
          </div>
          
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-tech">
              Professional Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Web Developer & UI/UX Designer"
              className="bg-white/5 border-white/10 text-white font-tech"
              required
            />
          </div>
          
          {/* Tagline */}
          <div className="space-y-2">
            <Label htmlFor="tagline" className="text-white font-tech">
              Tagline
            </Label>
            <Input
              id="tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="e.g. Crafting Digital Experiences"
              className="bg-white/5 border-white/10 text-white font-tech"
            />
          </div>
          
          {/* Avatar */}
          <div className="space-y-2">
            <Label htmlFor="avatar" className="text-white font-tech">
              Avatar URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="URL to your profile image"
              className="bg-white/5 border-white/10 text-white font-tech"
              required
            />
            {formData.avatar && (
              <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border-2 border-theme-purple/30">
                <img 
                  src={formData.avatar} 
                  alt="Avatar Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/200x200?text=Invalid+URL";
                  }}
                />
              </div>
            )}
          </div>
          
          {/* Resume URL */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="resumeUrl" className="text-white font-tech">
              Resume URL
            </Label>
            <div className="flex gap-2">
              <Input
                id="resumeUrl"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleChange}
                placeholder="URL to your resume/CV"
                className="bg-white/5 border-white/10 text-white font-tech"
              />
              {formData.resumeUrl && (
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  onClick={() => window.open(formData.resumeUrl, "_blank")}
                >
                  <Link2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio" className="text-white font-tech">
            Bio <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a short bio about yourself"
            className="bg-white/5 border-white/10 text-white font-tech min-h-[100px]"
            required
          />
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="glass-morphism border border-white/10 rounded-xl p-6 space-y-6">
        <h3 className="text-xl font-tech text-white mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-tech">
              Email <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                id="email"
                name="email"
                value={formData.contactInfo.email}
                onChange={handleContactInfoChange}
                placeholder="Your email address"
                className="pl-10 bg-white/5 border-white/10 text-white font-tech"
                required
              />
            </div>
          </div>
          
          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white font-tech">
              Phone
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                id="phone"
                name="phone"
                value={formData.contactInfo.phone}
                onChange={handleContactInfoChange}
                placeholder="Your phone number"
                className="pl-10 bg-white/5 border-white/10 text-white font-tech"
              />
            </div>
          </div>
          
          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-white font-tech">
              Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                id="location"
                name="location"
                value={formData.contactInfo.location}
                onChange={handleContactInfoChange}
                placeholder="Your location"
                className="pl-10 bg-white/5 border-white/10 text-white font-tech"
              />
            </div>
          </div>
          
          {/* Available for work */}
          <div className="flex items-center justify-between">
            <Label htmlFor="availableForWork" className="text-white font-tech cursor-pointer">
              Available for Work
            </Label>
            <Switch
              id="availableForWork"
              checked={formData.contactInfo.availableForWork}
              onCheckedChange={handleAvailabilityToggle}
            />
          </div>
        </div>
      </div>
      
      {/* Social Links */}
      <div className="glass-morphism border border-white/10 rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-tech text-white">Social Links</h3>
          <Button
            type="button"
            onClick={handleAddSocialLink}
            className="bg-theme-purple hover:bg-theme-purple/90 text-white font-tech text-sm"
            disabled={formData.socialLinks.length >= socialPlatformOptions.length}
          >
            <Plus className="mr-1 h-3 w-3" />
            Add Link
          </Button>
        </div>
        
        <div className="space-y-4">
          {formData.socialLinks.map((link) => {
            const IconComponent = socialPlatformIcons[link.platform as keyof typeof socialPlatformIcons] || Link2;
            const isWhatsApp = link.platform === 'WhatsApp';
            
            return (
              <div key={link.id} className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <IconComponent className="h-5 w-5 text-theme-purple" />
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Select
                    value={link.platform}
                    onValueChange={(value) => handleSocialLinkChange(link.id, 'platform', value)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white font-tech">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-white/10">
                      {socialPlatformOptions.map((platform) => (
                        <SelectItem 
                          key={platform} 
                          value={platform}
                          className="font-tech text-white/90 focus:bg-white/10 focus:text-white"
                          disabled={formData.socialLinks.some(l => l.id !== link.id && l.platform === platform)}
                        >
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="space-y-1">
                    <Input
                      value={link.url}
                      onChange={(e) => handleSocialLinkChange(link.id, 'url', e.target.value)}
                      placeholder={getPlaceholderForPlatform(link.platform)}
                      className="bg-white/5 border-white/10 text-white font-tech"
                    />
                    {isWhatsApp && (
                      <p className="text-xs text-white/50 font-tech">
                        Format: https://wa.me/1234567890 (include country code)
                      </p>
                    )}
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-500"
                  onClick={() => handleRemoveSocialLink(link.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
          
          {formData.socialLinks.length === 0 && (
            <p className="text-white/50 text-center font-tech">
              No social links added yet
            </p>
          )}
        </div>
      </div>
      
      {/* Submit button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white font-tech px-8 py-6"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm; 