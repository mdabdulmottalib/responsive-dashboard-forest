
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const Location = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
        
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center justify-center min-h-[400px] text-center">
            <div className="max-w-md">
              <MapPin className="h-12 w-12 text-muted-foreground/60 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Location Management</h2>
              <p className="text-muted-foreground">
                This page will allow you to manage property locations and view them on a map.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Location;
