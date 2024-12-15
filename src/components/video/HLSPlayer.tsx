import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HLSPlayerProps {
  url: string;
  protocol?: string;
  onPlayingStateChange: (isPlaying: boolean) => void;
  onError: (error: string) => void;
}

const HLSPlayer = ({ url, protocol = 'hls', onPlayingStateChange, onError }: HLSPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (!videoRef.current || !url) return;

    const video = videoRef.current;
    
    // Clean up previous instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const initializeStream = () => {
      // Handle local IP camera streams
      if (url.includes('192.168.') || url.includes('localhost') || url.includes('127.0.0.1')) {
        console.log("Local network stream detected");
        // Ensure URL has proper protocol
        const streamUrl = url.startsWith('http') ? url : `http://${url}`;
        video.src = streamUrl;
        video.crossOrigin = "anonymous"; // Add CORS header
        video.play().catch((e) => {
          console.error("Error playing local stream:", e);
          onError("Unable to connect to local camera. Please ensure the camera is accessible and CORS is enabled.");
        });
        return;
      }

      // Handle HLS streams
      if (protocol === 'hls') {
        if (Hls.isSupported()) {
          const hls = new Hls({
            debug: false,
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
            hls.loadSource(url);
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
                  console.log("Fatal network error encountered, trying to recover...");
                  hls.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  console.log("Fatal media error encountered, trying to recover...");
                  hls.recoverMediaError();
                  break;
                default:
                  console.log("Fatal error, cannot recover");
                  hls.destroy();
                  onError(`Stream error: ${data.details}`);
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
        }
      } 
      // Handle HTTP/HTTPS direct video streams
      else if (protocol === 'http' || protocol === 'https') {
        video.src = url;
        video.crossOrigin = "anonymous"; // Add CORS header
        video.play().catch((e) => {
          console.error("Error playing HTTP stream:", e);
          onError("Failed to play stream. Please check if the URL is accessible and the format is supported.");
        });
      }
      // Handle unsupported protocols
      else {
        onError(`Protocol ${protocol} is not supported directly in the browser. Consider using a streaming server to convert to HLS.`);
        return;
      }
    };

    initializeStream();

    // Event listeners
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
      onError('Failed to load video stream. Please check the URL and ensure the stream is accessible.');
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
  }, [url, protocol, onPlayingStateChange, onError]);

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