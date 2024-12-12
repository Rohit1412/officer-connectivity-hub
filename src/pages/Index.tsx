import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ConnectionBlock from "@/components/camera/ConnectionBlock";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
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
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Camera Connections</h1>
        <Button onClick={() => setShowNewConnection(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Connection
        </Button>
      </div>

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
  );
};

export default Index;