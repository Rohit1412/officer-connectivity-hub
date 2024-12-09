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
  { title: "मुख्य डैशबोर्ड", url: "/", icon: Activity },
  { title: "डेटा प्रबंधन", url: "/data", icon: Database },
  { title: "डिवाइस प्रबंधन", url: "/devices", icon: Smartphone },
  { title: "एमएल एनालिटिक्स", url: "/analytics", icon: Brain },
  { title: "लाइव स्ट्रीमिंग", url: "/live", icon: Video },
  { title: "अलर्ट", url: "/alerts", icon: Bell },
  { title: "अधिकारी ट्रैकिंग", url: "/tracking", icon: Navigation },
  { title: "डिजिटल साक्ष्य", url: "/evidence", icon: FileText },
  { title: "सुरक्षा केंद्र", url: "/security", icon: Shield },
  { title: "अपराध मैपिंग", url: "/crime-mapping", icon: MapPin },
  { title: "वाहन डिस्पैच", url: "/dispatch", icon: Car },
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
              <span className="text-lg font-semibold text-white">भारतीय पुलिस बल</span>
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