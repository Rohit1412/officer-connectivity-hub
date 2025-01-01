import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import DataManagement from "./pages/DataManagement";
import LiveStreaming from "./pages/LiveStreaming";
import Alerts from "./pages/Alerts";
import OfficerTracking from "./pages/OfficerTracking";
import DigitalEvidence from "./pages/DigitalEvidence";
import SecurityCenter from "./pages/SecurityCenter";
import Documentation from "./pages/Documentation";
import CrimeMapping from "./pages/CrimeMapping";
import VehicleDispatch from "./pages/VehicleDispatch";
import ConnectionHistory from "./pages/ConnectionHistory";
import CameraConnections from "./pages/CameraConnections";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/data" element={<DataManagement />} />
            <Route path="/live" element={<LiveStreaming />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/tracking" element={<OfficerTracking />} />
            <Route path="/evidence" element={<DigitalEvidence />} />
            <Route path="/security" element={<SecurityCenter />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/crime-mapping" element={<CrimeMapping />} />
            <Route path="/dispatch" element={<VehicleDispatch />} />
            <Route path="/connection-history" element={<ConnectionHistory />} />
            <Route path="/camera-connections" element={<CameraConnections />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;