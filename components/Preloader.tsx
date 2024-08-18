import React from 'react';
import Image from 'next/image';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="flex flex-col items-center">
        <Image 
          src="/img/logo.svg" 
          alt="PULP" 
          width={200} 
          height={40} 
          className="mb-8 animate-pulse"
        />
        <div className="w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Preloader;