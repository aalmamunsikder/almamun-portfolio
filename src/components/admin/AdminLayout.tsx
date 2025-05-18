import React, { useState, ReactNode } from "react";
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  User, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/lib/context/PortfolioContext";
import { useAuth } from '@/lib/auth/AuthContext';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { portfolioData } = usePortfolio();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const navItems: NavItem[] = [
    { 
      title: "Dashboard", 
      path: "/admin", 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      title: "Personal Info", 
      path: "/admin/personal", 
      icon: <User className="h-5 w-5" /> 
    },
    { 
      title: "Projects", 
      path: "/admin/projects", 
      icon: <Code className="h-5 w-5" /> 
    },
    { 
      title: "Skills", 
      path: "/admin/skills", 
      icon: <Code className="h-5 w-5" /> 
    },
    { 
      title: "Experience", 
      path: "/admin/experience", 
      icon: <Briefcase className="h-5 w-5" /> 
    },
    { 
      title: "Education", 
      path: "/admin/education", 
      icon: <GraduationCap className="h-5 w-5" /> 
    },
    { 
      title: "Settings", 
      path: "/admin/settings", 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className={`
        fixed top-0 left-0 z-40 h-full w-[280px] transform transition-transform duration-300 ease-in-out 
        bg-background/95 backdrop-blur-lg border-r border-white/10
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
            <Link to="/" className="flex items-center">
              <span className="font-tech text-xl">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">AAL</span>
                <span className="text-white/70">MAHMOUD</span>
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden text-white/70 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className={`
                        flex items-center gap-3 px-3 py-3 text-sm font-tech rounded-lg transition-all duration-300
                        ${isActive 
                          ? 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 text-white border border-white/10' 
                          : 'text-white/70 hover:bg-white/5'}
                      `}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto bg-pink-500 text-xs text-white font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                      {isActive && !item.badge && <ChevronRight className="h-4 w-4 ml-auto" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full text-white/70 hover:text-white hover:bg-white/5 gap-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 border-b border-white/10 bg-background/95 backdrop-blur-lg">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="lg:hidden mx-auto">
            <span className="font-tech text-lg">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">AAL</span>
              <span className="text-white/70">MAHMOUD</span>
            </span>
          </div>
          
          <div className="ml-auto">
            {/* Any header controls can go here */}
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
      
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default AdminLayout; 