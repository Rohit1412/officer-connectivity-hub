import React from "react";
import ConnectionBlock from "@/components/camera/ConnectionBlock";
import VideoPreview from "@/components/video/VideoPreview";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface StreamsListProps {
  connections: any[];
  onRefetch: () => void;
}

const StreamsList = ({ connections, onRefetch }: StreamsListProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

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

  return (
    <div className="space-y-4">
      {connections?.map((connection) => (
        <div key={connection.id} className="space-y-4">
          <ConnectionBlock
            connection={connection}
            onSave={onRefetch}
          />
          <VideoPreview 
            url={connection.url} 
            protocol={connection.protocol}
            onDelete={() => deleteConnection.mutate(connection.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default StreamsList;