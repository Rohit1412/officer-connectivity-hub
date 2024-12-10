import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import { useStreamConnections } from "@/hooks/useSupabase";

const ConnectionHistory = () => {
  const navigate = useNavigate();
  const { data: connections, isLoading } = useStreamConnections();

  return (
    <div className="min-h-screen bg-background p-6">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate("/devices")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Devices
      </Button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Connection History</h1>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <Card className="p-4">Loading history...</Card>
        ) : (
          connections?.map((connection) => (
            <Card key={connection.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">{connection.url}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Last Connected: {new Date(connection.last_ping).toLocaleString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  connection.status === 'active' 
                    ? 'bg-accent/10 text-accent' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {connection.status}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ConnectionHistory;