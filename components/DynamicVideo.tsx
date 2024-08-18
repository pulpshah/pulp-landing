import React, { useEffect, useRef } from 'react';

export interface DynamicVideoProps {
  src: string;
  onLoad: () => void;
  onError: (e: Error) => void;
}

const DynamicVideo: React.FC<DynamicVideoProps> = ({ src, onLoad, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoad = () => {
      console.log('Video loaded successfully');
      onLoad();
    };

    const handleError = (e: Event) => {
      console.error('Error loading video:', e);
      onError(new Error('Failed to load video'));
    };

    video.addEventListener('loadeddata', handleLoad);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoad);
      video.removeEventListener('error', handleError);
    };
  }, [src, onLoad, onError]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
};

export default DynamicVideo;