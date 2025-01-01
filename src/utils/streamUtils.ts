export const formatStreamUrl = (inputUrl: string): string => {
  try {
    // Remove any trailing colons and clean up the URL
    let cleanUrl = inputUrl.trim().replace(/:+$/, '').replace(/\/{2,}/, '/');
    
    // Handle empty or invalid URLs early
    if (!cleanUrl) return '';
    
    // For local/DroidCam URLs
    if (cleanUrl.match(/^(192\.168\.|localhost|127\.0\.0\.1)/)) {
      // Ensure proper protocol
      if (!cleanUrl.startsWith('http')) {
        cleanUrl = `http://${cleanUrl}`;
      }
      // Add /video endpoint for DroidCam if needed
      if (cleanUrl.includes('4747') && !cleanUrl.includes('/video')) {
        cleanUrl = `${cleanUrl.replace(/\/?$/, '')}/video`;
      }
    }
    
    // Validate URL format
    new URL(cleanUrl);
    return cleanUrl;
  } catch (e) {
    console.error("Invalid URL format:", e);
    return "";
  }
};

export const isLocalStream = (url: string): boolean => {
  return url.includes('192.168.') || 
         url.includes('localhost') || 
         url.includes('127.0.0.1');
};