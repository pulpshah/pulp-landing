import React, { useRef, useEffect } from 'react';

interface DynamicVideoProps {
  src: string;
  onLoad: () => void;
}

const DynamicVideo: React.FC<DynamicVideoProps> = ({ src, onLoad }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = src;
      videoRef.current.load();
      videoRef.current.play().catch(error => console.error('Error playing video:', error));
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      className='w-full h-full object-cover'
      autoPlay
      loop
      muted
      playsInline
      onLoadedData={onLoad}
    />
  );
};

export default DynamicVideo;