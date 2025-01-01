import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Shield, AlertTriangle, Lock, Activity, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SecurityCenter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [securityScore, setSecurityScore] = useState(85);
  const [systemStatus, setSystemStatus] = useState({
    firewall: "Active",
    encryption: "Enabled",
    lastScan: "2 hours ago",
    activeThreats: 0,
    networkStatus: "Secure",
  });

  useEffect(() => {
    // Simulate real-time security monitoring
    const interval = setInterval(() => {
      setSecurityScore((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.min(100, Math.max(0, prev + change));
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const runSecurityScan = () => {
    toast({
      title: "Security Scan Initiated",
      description: "Running comprehensive system scan...",
    });
    // Simulate scan completion
    setTimeout(() => {
      toast({
        title: "Security Scan Complete",
        description: "No threats detected",
      });
    }, 3000);
  };

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
          <Button onClick={runSecurityScan}>Run Security Scan</Button>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-semibold">Security Score</h2>
            </div>
            <Badge variant={securityScore > 80 ? "default" : "destructive"}>
              {securityScore}%
            </Badge>
          </div>
          <Progress value={securityScore} className="mb-4" />
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Lock className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold">System Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Firewall Status</span>
                <Badge>{systemStatus.firewall}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Encryption</span>
                <Badge>{systemStatus.encryption}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Last Security Scan</span>
                <span className="text-sm text-muted-foreground">{systemStatus.lastScan}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold">Threat Monitor</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Active Threats</span>
                <Badge variant={systemStatus.activeThreats === 0 ? "default" : "destructive"}>
                  {systemStatus.activeThreats}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Network Status</span>
                <Badge variant="outline">{systemStatus.networkStatus}</Badge>
              </div>
              <div className="flex items-center justify-center p-4">
                <Wifi className="w-8 h-8 text-accent animate-pulse" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;