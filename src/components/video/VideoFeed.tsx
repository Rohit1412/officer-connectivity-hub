import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VideoFeedProps {
  deviceId: string;
  status: "active" | "inactive";
  detections: {
    type: string;
    confidence: number;
    timestamp: string;
  }[];
  onModelChange?: (model: string) => void;
}

const VideoFeed = ({ deviceId, status, detections, onModelChange }: VideoFeedProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Video className="w-5 h-5 text-accent" />
          <span className="font-medium">Camera {deviceId}</span>
        </div>
        <div className="flex items-center gap-2">
          <Select onValueChange={onModelChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yolov8">YOLOv8</SelectItem>
              <SelectItem value="efficientdet">EfficientDet</SelectItem>
              <SelectItem value="mobilenet">MobileNet</SelectItem>
            </SelectContent>
          </Select>
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className={status === "active" ? "bg-accent" : ""}
          >
            {status}
          </Badge>
        </div>
      </div>
      <VideoPreview />
      <DetectionsList detections={detections} />
    </Card>
  );
};

export default VideoFeed;