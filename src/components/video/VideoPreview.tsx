import React from "react";
import { Eye } from "lucide-react";

interface VideoPreviewProps {
  url?: string;
  protocol?: string;
}

const VideoPreview = ({ url, protocol }: VideoPreviewProps) => {
  if (!url) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-40 flex items-center justify-center">
        <Eye className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  // For HTTP/HTTPS streams that support direct playback
  if (protocol === "http" || protocol === "https" || protocol === "hls") {
    return (
      <video
        className="w-full rounded-lg"
        controls
        autoPlay
        muted
        style={{ maxHeight: "240px" }}
      >
        <source src={url} type="application/x-mpegURL" />
        Your browser does not support the video tag.
      </video>
    );
  }

  // For RTSP/RTMP streams, we show a placeholder with the stream URL
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-40 flex flex-col items-center justify-center p-4">
      <Eye className="w-8 h-8 text-gray-400 mb-2" />
      <p className="text-sm text-center text-muted-foreground break-all">
        {protocol?.toUpperCase()} Stream: {url}
      </p>
    </div>
  );
};

export default VideoPreview;