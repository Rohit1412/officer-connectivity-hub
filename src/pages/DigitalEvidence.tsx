import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText, Upload } from "lucide-react";

const DigitalEvidence = () => {
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
          <h1 className="text-3xl font-bold">Digital Evidence Management</h1>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Evidence
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold">Recent Evidence</h2>
          </div>
          <div className="text-center p-8 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No evidence files uploaded yet</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DigitalEvidence;