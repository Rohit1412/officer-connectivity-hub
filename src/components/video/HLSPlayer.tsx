import React, { useEffect, useRef } from "react";
import { formatStreamUrl, isLocalStream } from "@/utils/streamUtils";
import LocalStreamPlayer from "./LocalStreamPlayer";
import { createStreamAdapter, StreamProtocol } from "@/utils/streamAdapters";

interface HLSPlayerProps {
  url: string;
  protocol?: StreamProtocol;
  onPlayingStateChange: (isPlaying: boolean) => void;
  onError: (error: string) => void;
}

const HLSPlayer = ({ 
  url, 
  protocol = 'hls', 
  onPlayingStateChange, 
  onError 
}: HLSPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const formattedUrl = formatStreamUrl(url);

  useEffect(() => {
    if (!videoRef.current || !formattedUrl) {
      onError("Invalid URL format. Please check the stream URL.");
      return;
    }

    const video = videoRef.current;

    const setupStream = async () => {
      try {
        await createStreamAdapter(video, protocol, formattedUrl);
        video.play().catch((e) => {
          console.error("Error auto-playing video:", e);
          onError("Failed to auto-play video. Please check your browser's autoplay settings.");
        });
      } catch (error) {
        console.error('Stream setup error:', error);
        onError(error instanceof Error ? error.message : "Failed to setup stream");
      }
    };

    setupStream();

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
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      if (video.srcObject instanceof MediaStream) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
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
      className="w-full h-full rounded-lg bg-black object-contain"
      controls
      playsInline
      autoPlay
      muted
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default HLSPlayer;