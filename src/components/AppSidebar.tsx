import {
  Activity,
  Bell,
  Database,
  FileText,
  MapPin,
  Navigation,
  Shield,
  Smartphone,
  Video,
  Brain,
  Car,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Main Dashboard", url: "/", icon: Activity },
  { title: "Data Management", url: "/data", icon: Database },
  { title: "Device Management", url: "/devices", icon: Smartphone },
  { title: "ML Analytics", url: "/analytics", icon: Brain },
  { title: "Live Streaming", url: "/live", icon: Video },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Officer Tracking", url: "/tracking", icon: Navigation },
  { title: "Digital Evidence", url: "/evidence", icon: FileText },
  { title: "Security Center", url: "/security", icon: Shield },
  { title: "Crime Mapping", url: "/crime-mapping", icon: MapPin },
  { title: "Vehicle Dispatch", url: "/dispatch", icon: Car },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar className="border-r border-border bg-slate-900">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-2 px-4 py-6">
            <Shield className="h-8 w-8 text-accent" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-white">Indian Police Force</span>
              <span className="text-sm text-gray-400">Command Center</span>
            </div>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    className={`cursor-pointer hover:bg-accent/10 transition-colors ${
                      location.pathname === item.url ? "bg-accent/20" : ""
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="ml-2">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}