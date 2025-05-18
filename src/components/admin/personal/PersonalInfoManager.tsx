import React from "react";
import { usePortfolio } from "@/lib/context/PortfolioContext";
import PersonalInfoForm from "./PersonalInfoForm";
import { Link2, Mail, Phone, MapPin, Briefcase, CheckCircle } from "lucide-react";

const PersonalInfoManager = () => {
  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;
  
  // Get social icon by platform name
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return '🐙';
      case 'linkedin':
        return '👔';
      case 'twitter':
        return '🐦';
      case 'instagram':
        return '📸';
      case 'youtube':
        return '📹';
      case 'facebook':
        return '👥';
      default:
        return '🔗';
    }
  };
  
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-tech text-white mb-2">
          Personal Information
        </h1>
        <p className="text-white/70 text-lg font-tech">
          Manage your personal details and contact information
        </p>
      </div>
      
      {/* Profile summary */}
      <div className="glass-morphism rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar and basic info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-theme-purple/30">
              <img 
                src={personalInfo.avatar} 
                alt={personalInfo.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl md:text-3xl font-tech text-white">{personalInfo.name}</h2>
              <p className="text-theme-purple font-tech">{personalInfo.title}</p>
              <p className="text-white/70 text-sm font-tech mt-1">{personalInfo.tagline}</p>
            </div>
            
            {personalInfo.contactInfo.availableForWork && (
              <div className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-tech">
                <CheckCircle className="h-3 w-3" />
                <span>Available for work</span>
              </div>
            )}
          </div>
          
          {/* Contact information */}
          <div className="flex-1 flex flex-col justify-center md:ml-6 md:border-l border-white/10 md:pl-8">
            <h3 className="text-xl font-tech text-white mb-4 text-center md:text-left">Contact Information</h3>
            
            <div className="space-y-3">
              {personalInfo.contactInfo.email && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                    <Mail className="h-5 w-5 text-theme-purple" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm font-tech">Email</p>
                    <p className="text-white font-tech">{personalInfo.contactInfo.email}</p>
                  </div>
                </div>
              )}
              
              {personalInfo.contactInfo.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                    <Phone className="h-5 w-5 text-theme-purple" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm font-tech">Phone</p>
                    <p className="text-white font-tech">{personalInfo.contactInfo.phone}</p>
                  </div>
                </div>
              )}
              
              {personalInfo.contactInfo.location && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                    <MapPin className="h-5 w-5 text-theme-purple" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm font-tech">Location</p>
                    <p className="text-white font-tech">{personalInfo.contactInfo.location}</p>
                  </div>
                </div>
              )}
              
              {personalInfo.resumeUrl && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                    <Briefcase className="h-5 w-5 text-theme-purple" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm font-tech">Resume</p>
                    <a 
                      href={personalInfo.resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-theme-purple hover:underline font-tech"
                    >
                      View Resume
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Bio */}
        <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <h3 className="text-xl font-tech text-white mb-4">Bio</h3>
          <p className="text-white/70 font-tech leading-relaxed">{personalInfo.bio}</p>
        </div>
        
        {/* Social links */}
        {personalInfo.socialLinks.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-tech text-white mb-4">Social Links</h3>
            <div className="flex flex-wrap gap-3">
              {personalInfo.socialLinks.map((link) => (
                <a 
                  key={link.id}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 px-4 py-2 transition-colors"
                >
                  <span className="text-xl">{getSocialIcon(link.platform)}</span>
                  <span className="text-white font-tech">{link.platform}</span>
                  <Link2 className="h-3 w-3 text-white/50" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Edit form */}
      <div>
        <h2 className="text-2xl font-tech text-white mb-6">Edit Personal Information</h2>
        <PersonalInfoForm />
      </div>
    </div>
  );
};

export default PersonalInfoManager; 