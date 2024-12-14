import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ConnectionBlock from "@/components/camera/ConnectionBlock";
import VideoPreview from "@/components/video/VideoPreview";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const TEST_STREAMS = [
  {
    name: "NASA Live Stream",
    url: "https://nasa-live.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8",
    protocol: "hls"
  },
  {
    name: "Red Bull TV",
    url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
    protocol: "hls"
  },
  {
    name: "Bloomberg TV",
    url: "https://bloomberg-bloomberg-1-eu.rakuten.wurl.tv/playlist.m3u8",
    protocol: "hls"
  },
  {
    name: "Weather Channel",
    url: "https://weather-lh.akamaihd.net/i/twc_1@92006/master.m3u8",
    protocol: "hls"
  }
];

const LiveStreaming = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
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

  const deleteConnection = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("stream_connections")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stream_connections"] });
      toast({
        title: "Success",
        description: "Connection deleted successfully",
      });
    },
    onError: (error) => {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete connection",
        variant: "destructive",
      });
    },
  });

  const handleQuickAdd = async (stream: typeof TEST_STREAMS[0]) => {
    try {
      await supabase
        .from("stream_connections")
        .upsert({
          url: stream.url,
          protocol: stream.protocol,
          connection_name: stream.name,
          status: "connected",
          is_active: true,
        })
        .select()
        .single();

      refetch();
      toast({
        title: "Success",
        description: "Test stream added successfully",
      });
    } catch (error) {
      console.error("Error adding test stream:", error);
      toast({
        title: "Error",
        description: "Failed to add test stream",
        variant: "destructive",
      });
    }
  };

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
              <div className="bg-muted/50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Test Streams</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {TEST_STREAMS.map((stream) => (
                    <Card key={stream.url} className="p-4">
                      <h3 className="font-medium mb-2">{stream.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Protocol: {stream.protocol.toUpperCase()}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4 break-all">
                        URL: {stream.url}
                      </p>
                      <Button 
                        className="w-full"
                        onClick={() => handleQuickAdd(stream)}
                      >
                        Add Test Stream
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>

              {showNewConnection && (
                <ConnectionBlock
                  onSave={() => {
                    refetch();
                    setShowNewConnection(false);
                  }}
                />
              )}

              {connections?.map((connection) => (
                <div key={connection.id} className="space-y-4">
                  <ConnectionBlock
                    connection={connection}
                    onSave={refetch}
                  />
                  <VideoPreview 
                    url={connection.url} 
                    protocol={connection.protocol}
                    onDelete={() => deleteConnection.mutate(connection.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LiveStreaming;