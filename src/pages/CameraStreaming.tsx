import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Camera } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ConnectionBlock from "@/components/camera/ConnectionBlock";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import TestStreamsSection from "@/components/streaming/TestStreamsSection";
import StreamsList from "@/components/streaming/StreamsList";

const CameraStreaming = () => {
  const navigate = useNavigate();
  const [showNewConnection, setShowNewConnection] = useState(false);

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
              Add Camera Stream
            </Button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Camera className="h-6 w-6" />
              <h1 className="text-3xl font-bold">Camera Streaming</h1>
            </div>
            <p className="text-muted-foreground">
              Connect and manage your video streams from various sources including RTSP,
              HTTP, RTMP, and more.
            </p>

            <div className="grid gap-4">
              <TestStreamsSection onStreamAdd={refetch} />

              {showNewConnection && (
                <ConnectionBlock
                  onSave={() => {
                    refetch();
                    setShowNewConnection(false);
                  }}
                />
              )}

              <StreamsList 
                connections={connections || []} 
                onRefetch={refetch}
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CameraStreaming;