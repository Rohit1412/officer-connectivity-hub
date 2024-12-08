import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react";

const SecurityCenter = () => {
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
          <h1 className="text-3xl font-bold">Security Center</h1>
        </div>

        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold">Security Status</h2>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span>System Status</span>
              </div>
              <span className="font-medium">All Systems Operational</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SecurityCenter;