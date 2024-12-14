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
    if (!videoRef.current || !url) return;

    const video = videoRef.current;
    let hls: Hls | null = null;

    const initializeHls = () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      if (Hls.isSupported()) {
        hls = new Hls({
          debug: true,
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
          maxBufferLength: 30,
          maxMaxBufferLength: 600,
          maxBufferSize: 60 * 1000 * 1000,
          maxBufferHole: 0.5,
          highBufferWatchdogPeriod: 2,
          nudgeOffset: 0.1,
          nudgeMaxRetry: 5,
        });

        hlsRef.current = hls;
        hls.attachMedia(video);

        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          console.log("HLS Media attached");
          hls?.loadSource(url);
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("HLS Manifest parsed");
          video.play().catch((e) => {
            console.error("Error auto-playing video:", e);
            setError("Failed to auto-play video");
          });
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS error:", data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.log("Fatal network error encountered, trying to recover...");
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log("Fatal media error encountered, trying to recover...");
                hls?.recoverMediaError();
                break;
              default:
                console.log("Fatal error, cannot recover");
                hls?.destroy();
                setError(`Stream error: ${data.type}`);
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // For Safari which has built-in HLS support
        video.src = url;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch((e) => {
            console.error("Error auto-playing video:", e);
            setError("Failed to auto-play video");
          });
        });
      } else {
        setError("HLS is not supported in this browser");
      }
    };

    initializeHls();

    video.addEventListener('playing', () => {
      setIsPlaying(true);
      setError(null);
    });

    video.addEventListener('pause', () => setIsPlaying(false));
    video.addEventListener('error', (e) => {
      console.error('Video error:', e);
      setError('Failed to load video stream');
      setIsPlaying(false);
    });

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      video.removeEventListener('playing', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));
      video.removeEventListener('error', () => setIsPlaying(false));
    };
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

  return (
    <div className="space-y-2">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full rounded-lg bg-black"
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
            <div className="text-center p-4">
              <VideoOff className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {isPlaying ? "Stream is playing" : "Stream is not playing"}
        </p>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
        >
          Delete Connection
        </Button>
      </div>
    </div>
  );
};

export default VideoPreview;