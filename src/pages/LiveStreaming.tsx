import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ConnectionBlock from "@/components/camera/ConnectionBlock";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const LiveStreaming = () => {
  const navigate = useNavigate();

  const { data: connections, refetch } = useQuery({
    queryKey: ["stream_connections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stream_connections")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const [showNewConnection, setShowNewConnection] = React.useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1 p-6 bg-background">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <Button onClick={() => setShowNewConnection(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Stream
            </Button>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Live Streaming</h1>
            <p className="text-muted-foreground">
              Connect and manage your video streams from various sources including RTSP,
              HTTP, RTMP, and more.
            </p>

            <div className="grid gap-4">
              {showNewConnection && (
                <ConnectionBlock
                  onSave={() => {
                    refetch();
                    setShowNewConnection(false);
                  }}
                />
              )}

              {connections?.map((connection) => (
                <ConnectionBlock
                  key={connection.id}
                  connection={connection}
                  onSave={refetch}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LiveStreaming;