import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Brain, Activity, Database, ArrowLeft } from "lucide-react";
import { supabase } from '@/lib/supabase';

const MLAnalytics = () => {
  const navigate = useNavigate();

  const { data: liveAnalytics, isLoading: isLiveLoading } = useQuery({
    queryKey: ['liveAnalytics'],
    queryFn: async () => {
      // Return mock data if Supabase is not configured
      if (!supabase) {
        return {
          objectDetection: { confidence: 0.95, label: 'Person detected' },
          activityRecognition: { confidence: 0.88, label: 'Walking' },
          anomalyDetection: { confidence: 0.12, label: 'Normal behavior' }
        };
      }

      try {
        const { data, error } = await supabase
          .from('analytics')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) throw error;
        
        return data[0] || {
          objectDetection: { confidence: 0.95, label: 'Person detected' },
          activityRecognition: { confidence: 0.88, label: 'Walking' },
          anomalyDetection: { confidence: 0.12, label: 'Normal behavior' }
        };
      } catch (error) {
        console.error('Error fetching analytics:', error);
        return {
          objectDetection: { confidence: 0.95, label: 'Person detected' },
          activityRecognition: { confidence: 0.88, label: 'Walking' },
          anomalyDetection: { confidence: 0.12, label: 'Normal behavior' }
        };
      }
    },
    refetchInterval: 5000
  });

  const modelConfigs = [
    {
      name: "Object Detection",
      model: "facebook/detr-resnet-50",
      description: "Detects and localizes objects in video streams"
    },
    {
      name: "Activity Recognition",
      model: "microsoft/swin-tiny-patch4-window7-224",
      description: "Recognizes officer activities and movements"
    },
    {
      name: "Anomaly Detection",
      model: "facebook/deit-tiny-patch16-224",
      description: "Identifies unusual patterns or behaviors"
    },
    {
      name: "Audio Analysis",
      model: "openai/whisper-tiny",
      description: "Analyzes audio for important events or commands"
    },
    {
      name: "Biometric Analysis",
      model: "google/vit-base-patch16-224",
      description: "Monitors officer vital signs and health metrics"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      <header className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">ML Analytics</h1>
            <p className="text-muted-foreground">Real-time and historical analysis</p>
          </div>
        </div>
        <Badge variant="outline" className="animate-pulse">
          <Activity className="w-4 h-4 mr-2" />
          Live Processing
        </Badge>
      </header>

      <Tabs defaultValue="live" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="live">Live Analysis</TabsTrigger>
          <TabsTrigger value="stored">Stored Data</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modelConfigs.map((model, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-2 mb-4">
                  <Brain className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold">{model.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{model.model}</Badge>
                  <Badge variant="outline" className="bg-accent/10">Active</Badge>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stored" className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <Database className="w-6 h-6 text-accent" />
            <div>
              <h3 className="font-semibold">Historical Data Analysis</h3>
              <p className="text-sm text-muted-foreground">Access and analyze stored data</p>
            </div>
          </div>
          <Card className="p-6">
            <p className="text-center text-muted-foreground">
              Select a date range and model to analyze stored data
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MLAnalytics;