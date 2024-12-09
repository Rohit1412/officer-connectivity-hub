import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import VehicleMap from "@/components/VehicleMap";
import DispatchList from "@/components/DispatchList";

const VehicleDispatch = () => {
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
        <h1 className="text-3xl font-bold">Vehicle Dispatch Monitoring</h1>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Live Vehicle Tracking</h2>
              <VehicleMap />
            </Card>
          </div>
          
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Active Dispatches</h2>
              <DispatchList />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDispatch;