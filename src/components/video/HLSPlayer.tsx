import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { formatStreamUrl, isLocalStream } from "@/utils/streamUtils";
import LocalStreamPlayer from "./LocalStreamPlayer";

interface HLSPlayerProps {
  url: string;
  protocol?: string;
  onPlayingStateChange: (isPlaying: boolean) => void;
  onError: (error: string) => void;
}

const HLSPlayer = ({ url, protocol = 'hls', onPlayingStateChange, onError }: HLSPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const formattedUrl = formatStreamUrl(url);

  useEffect(() => {
    if (!videoRef.current || !formattedUrl) {
      onError("Invalid URL format. Please check the stream URL.");
      return;
    }

    // Clean up previous instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const video = videoRef.current;

    // Handle HLS streams
    if (protocol === 'hls' && !isLocalStream(formattedUrl)) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          debug: false,
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
          maxBufferLength: 30,
        });

        hlsRef.current = hls;
        hls.attachMedia(video);

        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          console.log("HLS Media attached");
          hls.loadSource(formattedUrl);
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("HLS Manifest parsed");
          video.play().catch((e) => {
            console.error("Error auto-playing video:", e);
            onError("Failed to auto-play video. Please check your browser's autoplay settings.");
          });
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                onError(`Stream error: ${data.details}`);
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = formattedUrl;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(e => onError("Failed to auto-play video"));
        });
      }
    } 
    // Handle HTTP/HTTPS direct video streams
    else if ((protocol === 'http' || protocol === 'https') && !isLocalStream(formattedUrl)) {
      video.src = formattedUrl;
      video.play().catch((e) => {
        console.error("Error playing HTTP stream:", e);
        onError("Failed to play stream. Please check if the URL is accessible.");
      });
    }

    const handlePlaying = () => {
      console.log("Video is playing");
      onPlayingStateChange(true);
      onError("");
    };

    const handlePause = () => {
      console.log("Video is paused");
      onPlayingStateChange(false);
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      onPlayingStateChange(false);
    };

    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, [formattedUrl, protocol, onPlayingStateChange, onError]);

  if (isLocalStream(formattedUrl)) {
    return (
      <LocalStreamPlayer
        url={formattedUrl}
        onPlayingStateChange={onPlayingStateChange}
        onError={onError}
      />
    );
  }

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