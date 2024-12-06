import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Eye, AlertCircle } from "lucide-react";

interface VideoFeedProps {
  deviceId: string;
  status: "active" | "inactive";
  detections: {
    type: string;
    confidence: number;
    timestamp: string;
  }[];
}

const VideoFeed = ({ deviceId, status, detections }: VideoFeedProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Video className="w-5 h-5 text-accent" />
          <span className="font-medium">Camera {deviceId}</span>
        </div>
        <Badge
          variant={status === "active" ? "default" : "secondary"}
          className={status === "active" ? "bg-accent" : ""}
        >
          {status}
        </Badge>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-40 mb-4 flex items-center justify-center">
        <Eye className="w-8 h-8 text-gray-400" />
      </div>
      <div className="space-y-2">
        {detections.map((detection, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm p-2 bg-gray-50 dark:bg-gray-900 rounded"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              <span>{detection.type}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-secondary">{detection.confidence}%</span>
              <span className="text-xs text-secondary">{detection.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const VideoAnalysis = () => {
  const mockFeeds: VideoFeedProps[] = [
    {
      deviceId: "BC001",
      status: "active",
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
      status: "active",
      detections: [
        {
          type: "Object Detected",
          confidence: 92,
          timestamp: "30s ago",
        },
      ],
    },
  ];

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
          <VideoFeed key={index} {...feed} />
        ))}
      </div>
    </div>
  );
};

export default VideoAnalysis;