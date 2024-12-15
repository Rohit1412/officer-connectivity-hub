import React, { useState } from "react";
import { Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import HLSPlayer from "./HLSPlayer";
import ErrorOverlay from "./ErrorOverlay";
import VideoControls from "./VideoControls";

interface VideoPreviewProps {
  url?: string;
  protocol?: string;
  onDelete?: () => void;
}

const VideoPreview = ({ url, protocol = 'hls', onDelete }: VideoPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  if (!url) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-40 flex items-center justify-center">
        <Eye className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      toast({
        title: "Connection Deleted",
        description: "Stream connection has been removed.",
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <HLSPlayer 
          url={url}
          protocol={protocol}
          onPlayingStateChange={setIsPlaying}
          onError={setError}
        />
        <ErrorOverlay error={error || ""} />
      </div>
      <VideoControls 
        isPlaying={isPlaying}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default VideoPreview;