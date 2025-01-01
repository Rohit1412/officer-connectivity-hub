import Hls from "hls.js";

export type StreamProtocol = 'rtsp' | 'http' | 'https' | 'rtmp' | 'hls' | 'webrtc' | 'usb';

export const createStreamAdapter = async (
  videoElement: HTMLVideoElement,
  protocol: StreamProtocol,
  url: string
): Promise<void> => {
  switch (protocol) {
    case 'rtsp':
    case 'rtmp':
      // Convert RTSP/RTMP to WebRTC using a signaling server
      try {
        const response = await fetch(`/api/convert-stream`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, protocol })
        });
        const { webrtcUrl } = await response.json();
        await setupWebRTC(videoElement, webrtcUrl);
      } catch (error) {
        console.error(`Failed to convert ${protocol} stream:`, error);
        throw new Error(`${protocol.toUpperCase()} to WebRTC conversion failed`);
      }
      break;

    case 'hls':
      if (Hls.isSupported()) {
        const hls = new Hls({
          debug: false,
          enableWorker: true,
          lowLatencyMode: true,
        });
        hls.attachMedia(videoElement);
        hls.loadSource(url);
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = url;
      }
      break;

    case 'webrtc':
      await setupWebRTC(videoElement, url);
      break;

    case 'usb':
      await setupUSBCamera(videoElement);
      break;

    default:
      videoElement.src = url;
  }
};

const setupWebRTC = async (videoElement: HTMLVideoElement, url: string) => {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  });

  pc.ontrack = (event) => {
    if (videoElement.srcObject !== event.streams[0]) {
      videoElement.srcObject = event.streams[0];
    }
  };

  try {
    const response = await fetch(url);
    const { sdp } = await response.json();
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
  } catch (error) {
    console.error('WebRTC setup failed:', error);
    throw new Error('WebRTC connection failed');
  }
};

const setupUSBCamera = async (videoElement: HTMLVideoElement) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    });
    videoElement.srcObject = stream;
  } catch (error) {
    console.error('USB camera setup failed:', error);
    throw new Error('Failed to access USB camera');
  }
};