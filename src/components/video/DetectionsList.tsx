import React from "react";
import { AlertCircle } from "lucide-react";

interface DetectionsListProps {
  detections: {
    type: string;
    confidence: number;
    timestamp: string;
  }[];
}

const DetectionsList = ({ detections }: DetectionsListProps) => {
  return (
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
  );
};

export default DetectionsList;