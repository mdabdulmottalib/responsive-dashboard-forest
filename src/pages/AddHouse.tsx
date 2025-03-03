
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Image, 
  MapPin, 
  Tag, 
  Trash2, 
  Upload, 
  X, 
  Plus,
  ArrowLeft
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const AddHouse = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [images, setImages] = useState<File[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle drag and drop for multiple images
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length) {
      const imageFiles = files.filter(file => file.type.startsWith('image/'));
      setImages(prev => [...prev, ...imageFiles].slice(0, 6));
    }
  };

  // Handle file input change for multiple images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const files = Array.from(e.target.files);
      setImages(prev => [...prev, ...files].slice(0, 6));
    }
  };

  // Handle featured image change
  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFeaturedImage(e.target.files[0]);
    }
  };

  // Remove an image
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Remove featured image
  const removeFeaturedImage = () => {
    setFeaturedImage(null);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Placeholder for form submission
    toast({
      title: "Success!",
      description: "House listing has been created.",
      duration: 3000,
    });
  };

  // Facility options
  const facilities = [
    { id: "wifi", label: "Wi-Fi" },
    { id: "parking", label: "Parking" },
    { id: "pool", label: "Swimming Pool" },
    { id: "gym", label: "Gym" },
    { id: "security", label: "24/7 Security" },
    { id: "ac", label: "Air Conditioning" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10 animate-in">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <Link 
              to="/houses" 
              className="flex items-center text-sm text-muted-foreground mb-2 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Houses
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Add New House</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Main content - 70% */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="shadow-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Enter house title" className="mt-1.5" />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Enter house description" 
                        className="mt-1.5 min-h-32"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <div className="relative mt-1.5">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                          $
                        </span>
                        <Input id="price" type="number" placeholder="0.00" className="pl-7" />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Gallery Images (Max 6)</Label>
                      <div 
                        className={`mt-1.5 border-2 border-dashed rounded-lg p-6 text-center ${
                          isDragging ? "border-primary bg-primary/5" : "border-border"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium mb-1">Drag and drop images here</p>
                          <p className="text-xs text-muted-foreground mb-3">
                            PNG, JPG or WEBP (max. 5MB each)
                          </p>
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="relative"
                            disabled={images.length >= 6}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={handleFileChange}
                              disabled={images.length >= 6}
                            />
                            Select Files
                          </Button>
                        </div>
                      </div>
                      
                      {images.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {images.map((image, index) => (
                            <div 
                              key={index} 
                              className="relative aspect-square rounded-lg overflow-hidden border bg-muted/40 group"
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Uploaded ${index + 1}`}
                                className="w-full h-full object-cover transition-all"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                          {Array.from({ length: Math.max(0, 6 - images.length) }).map((_, index) => (
                            <div 
                              key={`empty-${index}`} 
                              className="aspect-square rounded-lg border border-dashed flex items-center justify-center bg-muted/40"
                            >
                              <Plus className="h-6 w-6 text-muted-foreground/40" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar - 30% */}
            <div className="lg:col-span-3 space-y-6">
              <div className="lg:sticky lg:top-24">
                <Card className="shadow-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="publish-date">Publish Date</Label>
                        <div className="mt-1.5">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : "Select a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <CalendarComponent
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <div className="relative mt-1.5">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                          </span>
                          <Input id="location" placeholder="Enter location" className="pl-10" />
                        </div>
                      </div>
                      
                      <div>
                        <Label>Facilities</Label>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {facilities.map((facility) => (
                            <div key={facility.id} className="flex items-center space-x-2">
                              <Checkbox id={facility.id} />
                              <Label 
                                htmlFor={facility.id} 
                                className="text-sm font-normal cursor-pointer"
                              >
                                {facility.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label>Featured Image</Label>
                        <div className="mt-1.5">
                          {featuredImage ? (
                            <div className="relative aspect-video rounded-lg overflow-hidden border">
                              <img
                                src={URL.createObjectURL(featuredImage)}
                                alt="Featured"
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={removeFeaturedImage}
                                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="border-2 border-dashed rounded-lg p-4 text-center aspect-video flex flex-col items-center justify-center">
                              <Image className="h-8 w-8 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground mb-2">
                                Upload a featured image
                              </p>
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                className="relative"
                              >
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  onChange={handleFeaturedImageChange}
                                />
                                Select Image
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6 flex items-center justify-between gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Discard
                  </Button>
                  <Button type="submit" className="flex-1">
                    Publish
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddHouse;
