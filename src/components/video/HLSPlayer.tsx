import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { VideoOff } from "lucide-react";

interface HLSPlayerProps {
  url: string;
  onPlayingStateChange: (isPlaying: boolean) => void;
  onError: (error: string) => void;
}

const HLSPlayer = ({ url, onPlayingStateChange, onError }: HLSPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

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
            onError("Failed to auto-play video");
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
                onError(`Stream error: ${data.type}`);
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch((e) => {
            console.error("Error auto-playing video:", e);
            onError("Failed to auto-play video");
          });
        });
      } else {
        onError("HLS is not supported in this browser");
      }
    };

    initializeHls();

    video.addEventListener('playing', () => {
      onPlayingStateChange(true);
      onError("");
    });

    video.addEventListener('pause', () => onPlayingStateChange(false));
    video.addEventListener('error', (e) => {
      console.error('Video error:', e);
      onError('Failed to load video stream');
      onPlayingStateChange(false);
    });

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      video.removeEventListener('playing', () => onPlayingStateChange(true));
      video.removeEventListener('pause', () => onPlayingStateChange(false));
      video.removeEventListener('error', () => onPlayingStateChange(false));
    };
  }, [url, onPlayingStateChange, onError]);

  return (
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
  );
};

export default HLSPlayer;