import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddHouse = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New House</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>House Information</CardTitle>
            <CardDescription>Enter the details for the new house listing</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter house title" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="Enter price" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="san-francisco">San Francisco</SelectItem>
                      <SelectItem value="los-angeles">Los Angeles</SelectItem>
                      <SelectItem value="chicago">Chicago</SelectItem>
                      <SelectItem value="miami">Miami</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="season">Best Season</Label>
                  <Select>
                    <SelectTrigger id="season">
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                      <SelectItem value="fall">Fall</SelectItem>
                      <SelectItem value="winter">Winter</SelectItem>
                      <SelectItem value="all-year">All Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input id="bedrooms" type="number" placeholder="Number of bedrooms" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input id="bathrooms" type="number" placeholder="Number of bathrooms" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the house, its features, and surroundings" 
                    rows={5}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="features">Features</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {/* Features could be checkboxes, but we'll keep it simple for now */}
                    <Input id="features" placeholder="Enter features separated by commas" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6 space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add House</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddHouse;
