import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import VideoFeed from "./video/VideoFeed";

const VideoAnalysis = () => {
  const [selectedModels, setSelectedModels] = useState<Record<string, string>>({});

  const mockFeeds = [
    {
      deviceId: "BC001",
      status: "active" as const,
      detections: [
        {
          type: "Motion Detected",
          confidence: 95,
          timestamp: "2m ago",
        },
        {
          type: "Person Identified",
          confidence: 88,
          timestamp: "1m ago",
        },
      ],
    },
    {
      deviceId: "BC002",
      status: "active" as const,
      detections: [
        {
          type: "Object Detected",
          confidence: 92,
          timestamp: "30s ago",
        },
      ],
    },
  ];

  const handleModelChange = (deviceId: string, model: string) => {
    setSelectedModels(prev => ({
      ...prev,
      [deviceId]: model
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Video Analysis</h2>
        <Badge variant="outline" className="text-accent">
          Live Analysis
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockFeeds.map((feed, index) => (
          <VideoFeed 
            key={index} 
            {...feed} 
            onModelChange={(model) => handleModelChange(feed.deviceId, model)}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoAnalysis;