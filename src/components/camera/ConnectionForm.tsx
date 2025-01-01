import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConnectionFormProps {
  url: string;
  protocol: string;
  name: string;
  onUrlChange: (url: string) => void;
  onProtocolChange: (protocol: string) => void;
  onNameChange: (name: string) => void;
}

const ConnectionForm = ({
  url,
  protocol,
  name,
  onUrlChange,
  onProtocolChange,
  onNameChange,
}: ConnectionFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Connection Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>

      <div className="flex space-x-2">
        <Select value={protocol} onValueChange={onProtocolChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Protocol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rtsp">RTSP</SelectItem>
            <SelectItem value="http">HTTP</SelectItem>
            <SelectItem value="https">HTTPS</SelectItem>
            <SelectItem value="rtmp">RTMP</SelectItem>
            <SelectItem value="hls">HLS</SelectItem>
            <SelectItem value="webrtc">WebRTC</SelectItem>
            <SelectItem value="usb">USB Camera</SelectItem>
          </SelectContent>
        </Select>
        {protocol !== 'usb' && (
          <Input
            placeholder="Stream URL"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            className="flex-1"
          />
        )}
      </div>
    </div>
  );
};

export default ConnectionForm;