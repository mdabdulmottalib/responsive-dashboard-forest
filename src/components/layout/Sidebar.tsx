
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Building2, 
  MapPin, 
  Star, 
  Cloud, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  submenu?: { title: string; href: string }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      title: "Houses",
      href: "/houses",
      icon: <Building2 className="w-5 h-5" />,
      submenu: [
        { title: "All Houses", href: "/houses" },
        { title: "Add Houses", href: "/houses/add" },
      ],
    },
    {
      title: "Location",
      href: "/location",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      title: "Feature",
      href: "/feature",
      icon: <Star className="w-5 h-5" />,
    },
    {
      title: "Season",
      href: "/season",
      icon: <Cloud className="w-5 h-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 bottom-0 z-40 h-full w-64 bg-background border-r border-border transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <h1 className={cn(
              "text-xl font-bold tracking-tight transition-opacity duration-300",
              isOpen ? "opacity-100" : "opacity-0 lg:hidden"
            )}>
              Dashboard
            </h1>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-muted lg:flex hidden items-center justify-center"
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isOpen ? 
                <ChevronLeft className="w-5 h-5" /> : 
                <ChevronRight className="w-5 h-5" />
              }
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={`nav-${item.href}-${index}`}>
                  {item.submenu ? (
                    <div>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) => cn(
                          "flex items-center px-3 py-2 rounded-md transition-colors",
                          isActive 
                            ? "bg-accent text-accent-foreground" 
                            : "hover:bg-accent/50 text-foreground/80 hover:text-foreground"
                        )}
                        end
                      >
                        {item.icon}
                        <span className={cn(
                          "ml-3 transition-opacity duration-200",
                          isOpen ? "opacity-100" : "opacity-0 hidden lg:block"
                        )}>
                          {item.title}
                        </span>
                      </NavLink>
                      
                      {isOpen && item.submenu.map((subItem, subIndex) => (
                        <NavLink
                          key={`subnav-${subItem.href}-${subIndex}`}
                          to={subItem.href}
                          className={({ isActive }) => cn(
                            "flex items-center px-3 py-2 pl-10 rounded-md transition-colors text-sm",
                            isActive 
                              ? "bg-accent/70 text-accent-foreground" 
                              : "hover:bg-accent/30 text-foreground/70 hover:text-foreground"
                          )}
                          end
                        >
                          {subItem.title}
                        </NavLink>
                      ))}
                    </div>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) => cn(
                        "flex items-center px-3 py-2 rounded-md transition-colors",
                        isActive 
                          ? "bg-accent text-accent-foreground" 
                          : "hover:bg-accent/50 text-foreground/80 hover:text-foreground",
                        !isOpen && "lg:justify-center"
                      )}
                      end
                    >
                      {item.icon}
                      <span className={cn(
                        "ml-3 transition-opacity duration-200",
                        isOpen ? "opacity-100" : "opacity-0 hidden lg:block"
                      )}>
                        {item.title}
                      </span>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Version info */}
          <div className={cn(
            "p-4 text-xs text-foreground/60 border-t border-border",
            !isOpen && "lg:flex lg:items-center lg:justify-center"
          )}>
            {isOpen ? "Dashboard v1.0" : <span className="lg:block hidden">v1.0</span>}
          </div>
        </div>
      </aside>
    </>
  );
};
