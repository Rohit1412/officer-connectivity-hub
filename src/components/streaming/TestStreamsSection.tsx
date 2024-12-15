import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const TEST_STREAMS = [
  {
    name: "Big Buck Bunny (HLS)",
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    protocol: "hls"
  },
  {
    name: "HTTP Stream Example",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    protocol: "http"
  },
  {
    name: "HTTPS Stream Example",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    protocol: "https"
  },
  {
    name: "Live Test Stream (HLS)",
    url: "https://cdn.jwplayer.com/manifests/pZxWPRg4.m3u8",
    protocol: "hls"
  }
];

interface TestStreamsSectionProps {
  onStreamAdd: () => void;
}

const TestStreamsSection = ({ onStreamAdd }: TestStreamsSectionProps) => {
  const { toast } = useToast();

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

      onStreamAdd();
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
  );
};

export default TestStreamsSection;