import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Activity,
  Database,
  Smartphone,
  Video,
  Bell,
  Navigation,
  FileText,
  Shield,
  MapPin,
  Car,
  History,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";
import { SidebarNav, SidebarNavLink } from "@/components/ui/sidebar-nav";

const navigationItems = [
  { title: "Main Dashboard", url: "/", icon: Activity },
  { title: "Data Management", url: "/data", icon: Database },
  { title: "Device Management", url: "/devices", icon: Smartphone },
  { title: "Live Streaming", url: "/live", icon: Video },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Officer Tracking", url: "/tracking", icon: Navigation },
  { title: "Digital Evidence", url: "/evidence", icon: FileText },
  { title: "Security Center", url: "/security", icon: Shield },
  { title: "Crime Mapping", url: "/crime-mapping", icon: MapPin },
  { title: "Vehicle Dispatch", url: "/dispatch", icon: Car },
  { title: "Connection History", url: "/connection-history", icon: History },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-6">
          <Shield className="h-8 w-8 text-accent" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">Indian Police Force</span>
            <span className="text-sm text-gray-400">Command Center</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav>
          {navigationItems.map((item) => (
            <SidebarNavLink
              key={item.url}
              icon={item.icon}
              title={item.title}
              active={location.pathname === item.url}
              onClick={() => navigate(item.url)}
            />
          ))}
        </SidebarNav>
      </SidebarContent>
    </Sidebar>
  );
}