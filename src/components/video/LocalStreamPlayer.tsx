import React, { useEffect, useRef } from 'react';

interface LocalStreamPlayerProps {
  url: string;
  onPlayingStateChange: (isPlaying: boolean) => void;
  onError: (error: string) => void;
}

const LocalStreamPlayer = ({ url, onPlayingStateChange, onError }: LocalStreamPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || !url) return;

    const video = videoRef.current;
    console.log("Local stream detected, attempting to connect to:", url);
    
    const img = new Image();
    img.onload = () => {
      video.src = url;
      video.play().catch((e) => {
        console.error("Error playing local stream:", e);
        onError("Please ensure:\n1. Camera app is running\n2. Device is on same network\n3. Using correct IP:port");
      });
    };
    
    img.onerror = () => {
      onError("Cannot connect to camera. Please verify:\n1. Camera app is running\n2. IP address is correct\n3. Port is open");
    };
    
    img.src = url;

    return () => {
      video.src = '';
    };
  }, [url, onError]);

  return (
    <video
      ref={videoRef}
      className="w-full rounded-lg bg-black"
      controls
      playsInline
      autoPlay
      muted
      style={{ maxHeight: "240px" }}
    />
  );
};

export default LocalStreamPlayer;