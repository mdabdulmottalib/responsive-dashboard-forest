
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  
  // Generate breadcrumb items based on the current path
  const generateBreadcrumbItems = () => {
    const pathSegments = location.pathname.split("/").filter(segment => segment !== "");
    
    // Start with home
    const breadcrumbItems = [
      { name: "Home", path: "/", icon: <Home className="h-4 w-4" /> }
    ];
    
    // Add each path segment
    let currentPath = "";
    
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      
      // Convert kebab-case or snake_case to title case
      const formattedName = segment
        .replace(/[-_]/g, " ")
        .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
      
      breadcrumbItems.push({
        name: formattedName,
        path: currentPath,
        icon: null
      });
    });
    
    return breadcrumbItems;
  };
  
  const breadcrumbItems = generateBreadcrumbItems();
  
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 md:space-x-2">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-3 w-3 text-muted-foreground mx-1 md:mx-2 flex-shrink-0" />
              )}
              
              <Link
                to={item.path}
                className={cn(
                  "flex items-center text-sm hover:text-primary transition-colors",
                  isLast 
                    ? "font-medium text-foreground pointer-events-none" 
                    : "text-muted-foreground"
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                <span className={cn(
                  "truncate max-w-[100px] md:max-w-none",
                  isLast && "text-balance"
                )}>
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
