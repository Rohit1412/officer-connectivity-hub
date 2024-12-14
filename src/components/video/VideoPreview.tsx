import React, { useEffect, useRef, useState } from "react";
import { Eye, Video, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Hls from "hls.js";

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
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (videoRef.current && url) {
      const video = videoRef.current;

      if (protocol === "hls" && Hls.isSupported()) {
        // Cleanup previous HLS instance
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        // Create new HLS instance
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hlsRef.current = hls;

        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch((e) => {
            console.error("Error auto-playing video:", e);
          });
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            setError(`Stream error: ${data.type}`);
            console.error('HLS error:', data);
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // For Safari which has built-in HLS support
        video.src = url;
        video.play().catch((e) => {
          console.error("Error auto-playing video:", e);
        });
      }

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
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }
      };
    }
  }, [url, protocol]);

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
        <video
          ref={videoRef}
          className="w-full rounded-lg"
          controls
          playsInline
          autoPlay
          muted
          style={{ maxHeight: "240px" }}
        >
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
};

export default VideoPreview;