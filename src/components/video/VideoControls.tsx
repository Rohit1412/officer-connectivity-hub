import React from "react";
import { Button } from "@/components/ui/button";

interface VideoControlsProps {
  isPlaying: boolean;
  onDelete?: () => void;
}

const VideoControls = ({ isPlaying, onDelete }: VideoControlsProps) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">
        {isPlaying ? "Stream is playing" : "Stream is not playing"}
      </p>
      {onDelete && (
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
        >
          Delete Connection
        </Button>
      )}
    </div>
  );
};

export default VideoControls;