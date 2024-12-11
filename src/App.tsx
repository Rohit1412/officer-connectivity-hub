import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DataManagement from "./pages/DataManagement";
import DeviceManagement from "./pages/DeviceManagement";
import MLAnalytics from "./pages/MLAnalytics";
import LiveStreaming from "./pages/LiveStreaming";
import Alerts from "./pages/Alerts";
import OfficerTracking from "./pages/OfficerTracking";
import DigitalEvidence from "./pages/DigitalEvidence";
import SecurityCenter from "./pages/SecurityCenter";
import Documentation from "./pages/Documentation";
import CrimeMapping from "./pages/CrimeMapping";
import VehicleDispatch from "./pages/VehicleDispatch";
import ConnectionHistory from "./pages/ConnectionHistory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Index />} />
            <Route path="/data" element={<DataManagement />} />
            <Route path="/devices" element={<DeviceManagement />} />
            <Route path="/analytics" element={<MLAnalytics />} />
            <Route path="/live" element={<LiveStreaming />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/tracking" element={<OfficerTracking />} />
            <Route path="/evidence" element={<DigitalEvidence />} />
            <Route path="/security" element={<SecurityCenter />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/crime-mapping" element={<CrimeMapping />} />
            <Route path="/dispatch" element={<VehicleDispatch />} />
            <Route path="/connection-history" element={<ConnectionHistory />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;