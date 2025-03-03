
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Feature = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        <h1 className="text-3xl font-bold tracking-tight">Features</h1>
        
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center justify-center min-h-[400px] text-center">
            <div className="max-w-md">
              <Star className="h-12 w-12 text-muted-foreground/60 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Property Features</h2>
              <p className="text-muted-foreground">
                This page will allow you to manage property features and amenities.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Feature;
