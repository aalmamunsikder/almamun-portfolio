import React from "react";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePortfolio } from "@/lib/context/PortfolioContext";

const Contact = () => {
  const { toast } = useToast();
  const { portfolioData } = usePortfolio();
  const { contactInfo } = portfolioData.personalInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Open email client directly
    const mailtoUrl = `mailto:${contactInfo.email}`;
    window.open(mailtoUrl, '_blank');
    
    toast({
      title: "Email client opened",
      description: "You can now send your message directly via email.",
    });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background -z-10"></div>
      
      <div className="container max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-tech mb-4 text-gradient">
            Let's Connect
          </h2>
          <p className="text-lg text-white/70 font-tech">
            {contactInfo.availableForWork 
              ? "I'm currently available for freelance work and exciting opportunities"
              : "Have a project in mind? Let's create something amazing together"}
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-theme-purple/20 to-blue-500/20 rounded-2xl blur-xl opacity-60 -z-10"></div>
          <div className="glass-morphism rounded-2xl p-8 md:p-10 border border-white/10 text-center">
            <p className="text-xl text-white/80 font-tech mb-8">
              Ready to discuss your project? Click below to send me an email directly.
            </p>
            
            <button
              onClick={handleSubmit}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-theme-purple to-blue-500 hover:from-theme-purple/90 hover:to-blue-500/90 text-white rounded-xl px-8 py-4 font-tech transition-colors"
            >
              <Mail className="h-5 w-5" />
              Send Email
            </button>

            {contactInfo.email && (
              <div className="mt-6">
                <p className="text-white/50 font-tech text-sm">Or copy my email:</p>
                <p className="text-theme-purple font-tech mt-1">
                  {contactInfo.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 