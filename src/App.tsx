
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AllHouses from "./pages/AllHouses";
import AddHouse from "./pages/AddHouse";
import Location from "./pages/Location";
import Feature from "./pages/Feature";
import Season from "./pages/Season";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Create a new query client with more stable configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/houses" element={<AllHouses />} />
          <Route path="/houses/add" element={<AddHouse />} />
          <Route path="/location" element={<Location />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/season" element={<Season />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
