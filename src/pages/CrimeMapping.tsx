import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import CrimeHeatmap from "@/components/CrimeHeatmap";
import ReportIncident from "@/components/ReportIncident";

const CrimeMapping = () => {
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
        <h1 className="text-3xl font-bold">Crime Mapping & Community Reports</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Crime Heatmap</h2>
            <CrimeHeatmap />
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Report an Incident</h2>
            <ReportIncident />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CrimeMapping;