import React from "react";
import { VideoOff } from "lucide-react";

interface ErrorOverlayProps {
  error: string;
}

const ErrorOverlay = ({ error }: ErrorOverlayProps) => {
  if (!error) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
      <div className="text-center p-4">
        <VideoOff className="w-8 h-8 text-white mx-auto mb-2" />
        <p className="text-white text-sm">{error}</p>
      </div>
    </div>
  );
};

export default ErrorOverlay;