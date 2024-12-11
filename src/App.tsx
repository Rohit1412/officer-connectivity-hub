import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
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
    <SessionContextProvider supabaseClient={supabase}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/data" element={<ProtectedRoute><DataManagement /></ProtectedRoute>} />
              <Route path="/devices" element={<ProtectedRoute><DeviceManagement /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><MLAnalytics /></ProtectedRoute>} />
              <Route path="/live" element={<ProtectedRoute><LiveStreaming /></ProtectedRoute>} />
              <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
              <Route path="/tracking" element={<ProtectedRoute><OfficerTracking /></ProtectedRoute>} />
              <Route path="/evidence" element={<ProtectedRoute><DigitalEvidence /></ProtectedRoute>} />
              <Route path="/security" element={<ProtectedRoute><SecurityCenter /></ProtectedRoute>} />
              <Route path="/docs" element={<ProtectedRoute><Documentation /></ProtectedRoute>} />
              <Route path="/crime-mapping" element={<ProtectedRoute><CrimeMapping /></ProtectedRoute>} />
              <Route path="/dispatch" element={<ProtectedRoute><VehicleDispatch /></ProtectedRoute>} />
              <Route path="/connection-history" element={<ProtectedRoute><ConnectionHistory /></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = supabase.auth.getSession();
  
  if (!session) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

export default App;