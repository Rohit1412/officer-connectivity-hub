import React, { useEffect, useRef, useState } from "react";
import { Eye, Video, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface VideoPreviewProps {
  url?: string;
  protocol?: string;
  onDelete?: () => void;
}

const VideoPreview = ({ url, protocol, onDelete }: VideoPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (videoRef.current && url) {
      const video = videoRef.current;
      
      video.addEventListener('playing', () => setIsPlaying(true));
      video.addEventListener('pause', () => setIsPlaying(false));
      video.addEventListener('error', () => {
        setError('Failed to load video stream');
        setIsPlaying(false);
      });

      return () => {
        video.removeEventListener('playing', () => setIsPlaying(true));
        video.removeEventListener('pause', () => setIsPlaying(false));
        video.removeEventListener('error', () => setIsPlaying(false));
      };
    }
  }, [url]);

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

  // For HTTP/HTTPS/HLS streams that support direct playback
  if (protocol === "http" || protocol === "https" || protocol === "hls") {
    return (
      <div className="space-y-2">
        <div className="relative">
          <video
            ref={videoRef}
            className="w-full rounded-lg"
            controls
            autoPlay
            muted
            style={{ maxHeight: "240px" }}
          >
            <source src={url} type={protocol === "hls" ? "application/x-mpegURL" : "video/mp4"} />
            Your browser does not support the video tag.
          </video>
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <VideoOff className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="mt-2"
          >
            Delete Connection
          </Button>
        </div>
      </div>
    );
  }

  // For RTSP/RTMP streams, we show a placeholder with the stream URL
  return (
    <div className="space-y-2">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-40 flex flex-col items-center justify-center p-4">
        <Video className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-sm text-center text-muted-foreground break-all">
          {protocol?.toUpperCase()} Stream: {url}
        </p>
        <p className="text-xs text-center text-muted-foreground mt-2">
          RTSP/RTMP streams require VLC or similar player for playback
        </p>
      </div>
      <div className="flex justify-end">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          className="mt-2"
        >
          Delete Connection
        </Button>
      </div>
    </div>
  );
};

export default VideoPreview;