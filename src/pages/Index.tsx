import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Officer Connectivity Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button onClick={() => navigate("/data")}>Data Management</Button>
        <Button onClick={() => navigate("/devices")}>Device Management</Button>
        <Button onClick={() => navigate("/analytics")}>ML Analytics</Button>
        <Button onClick={() => navigate("/live")}>Live Streaming</Button>
        <Button onClick={() => navigate("/alerts")}>Alerts</Button>
        <Button onClick={() => navigate("/tracking")}>Officer Tracking</Button>
        <Button onClick={() => navigate("/evidence")}>Digital Evidence</Button>
        <Button onClick={() => navigate("/security")}>Security Center</Button>
        <Button onClick={() => navigate("/docs")}>Documentation</Button>
        <Button onClick={() => navigate("/crime-mapping")}>Crime Mapping</Button>
        <Button onClick={() => navigate("/dispatch")}>Vehicle Dispatch</Button>
        <Button onClick={() => navigate("/connection-history")}>Connection History</Button>
        <Button onClick={() => navigate("/camera-connections")}>Camera Connections</Button>
      </div>
    </div>
  );
};

export default Index;