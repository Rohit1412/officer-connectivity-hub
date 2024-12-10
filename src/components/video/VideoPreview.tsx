import React from "react";
import { Eye } from "lucide-react";

const VideoPreview = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-40 mb-4 flex items-center justify-center">
      <Eye className="w-8 h-8 text-gray-400" />
    </div>
  );
};

export default VideoPreview;