import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin } from "lucide-react";

const OfficerTracking = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Officer Tracking</h1>
        </div>

        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold">Live Location</h2>
          </div>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Map view will be integrated here</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OfficerTracking;