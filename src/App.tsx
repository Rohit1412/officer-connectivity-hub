import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import DataManagement from "./pages/DataManagement";
import DeviceManagement from "./pages/DeviceManagement";
import MLAnalytics from "./pages/MLAnalytics";
import LiveStreaming from "./pages/LiveStreaming";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/data" element={<DataManagement />} />
            <Route path="/devices" element={<DeviceManagement />} />
            <Route path="/analytics" element={<MLAnalytics />} />
            <Route path="/live" element={<LiveStreaming />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;