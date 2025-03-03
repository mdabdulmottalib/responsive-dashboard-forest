
import React, { useState } from "react";
import { Menu, Search, Bell } from "lucide-react";
import { UserProfile } from "../ui/UserProfile";
import { NotificationBell } from "../ui/NotificationBell";
import { Breadcrumb } from "../ui/Breadcrumb";
import { cn } from "@/lib/utils";

interface TopbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchExpanded, setSearchExpanded] = useState(false);

  return (
    <header className="z-20 bg-background/80 backdrop-blur supports-backdrop-blur:bg-background/60 sticky top-0 w-full border-b border-border h-16 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3 md:gap-5">
        {/* Mobile sidebar toggle */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        {/* Breadcrumb navigation */}
        <div className={cn(
          "transition-all duration-300",
          searchExpanded ? "opacity-0 md:opacity-100 hidden md:block" : "opacity-100"
        )}>
          <Breadcrumb />
        </div>
        
        {/* Search bar */}
        <div className={cn(
          "relative transition-all duration-300 ease-in-out",
          searchExpanded 
            ? "w-full md:w-96" 
            : "w-9 md:w-64"
        )}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          
          <input
            type="search"
            className={cn(
              "pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
              !searchExpanded && "md:w-full cursor-pointer"
            )}
            placeholder="Search"
            onFocus={() => setSearchExpanded(true)}
            onBlur={() => setSearchExpanded(false)}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification bell */}
        <NotificationBell />
        
        {/* User profile */}
        <UserProfile />
      </div>
    </header>
  );
};
