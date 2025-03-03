
import React, { useState } from "react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Example notifications
  const notifications = [
    {
      id: 1,
      title: "New Property Listed",
      description: "A new property has been added to your watchlist.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Property Status Updated",
      description: "The status of 123 Main St. has been updated to 'Sold'.",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 3,
      title: "New Message",
      description: "You have a new message from a client regarding their listing.",
      time: "2 hours ago",
      read: true,
    },
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative rounded-full p-2 hover:bg-muted/80 transition-colors">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground animate-in">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80 glass-panel">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="text-xs text-primary cursor-pointer hover:underline">
              Mark all as read
            </span>
          )}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {notifications.length > 0 ? (
          <>
            {notifications.map(notification => (
              <DropdownMenuItem key={notification.id} className="cursor-pointer flex flex-col items-start py-3 px-4">
                <div className="flex items-start justify-between w-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      {!notification.read && (
                        <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                    <span className="text-xs text-muted-foreground mt-1">{notification.time}</span>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="cursor-pointer justify-center text-primary text-sm hover:underline py-2">
              View all notifications
            </DropdownMenuItem>
          </>
        ) : (
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
