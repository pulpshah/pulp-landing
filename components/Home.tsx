'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { navLinks } from '../constants/data'
import { useTransition, animated, config } from 'react-spring';
import dynamic from 'next/dynamic';
import Preloader from './Preloader';
import { useMediaQuery } from 'react-responsive';
import { DynamicVideoProps } from './DynamicVideo'; // Make sure to import the props type

// Dynamically import the video component
const DynamicVideo = dynamic(() => import('./DynamicVideo'), { ssr: false });

const sectionVideos = {
  home: "/img/planeVid.mp4",
  about: "/img/brain.mp4",
  services: "/img/sea.mp4",
  studio: "/img/studio.mp4",
  people: "/img/square.mp4",
  blog: "/img/telescope.mp4"
};

type SectionName = 'home' | 'about' | 'services' | 'studio' | 'people' | 'blog';

const isSectionName = (section: string): section is SectionName => {
  return ['home', 'about', 'services', 'studio', 'people', 'blog'].includes(section);
};

type ActiveContent = {
  h1: string;
  p: string | string[];
};

const Home = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionName>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeContent, setActiveContent] = useState<ActiveContent>({ h1: '', p: '' });
  const [showMenu, setShowMenu] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
  const logoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMobileMenu = () => {
    console.log("Toggling menu. Current state:", mobileMenuOpen);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    console.log("Menu state changed:", mobileMenuOpen);
  }, [mobileMenuOpen]);

  const handleNavClick = (section: string) => {
    if (isSectionName(section)) {
      setActiveSection(section);
      if (section !== 'home') {
        setShowMenu(false);
        const content = getContentDescription(section);
        setActiveContent(content);
      } else {
        setShowMenu(true);
      }
    } else {
      console.error(`Invalid section name: ${section}`);
    }
  };

  useEffect(() => {
    console.log("Active section changed to:", activeSection);
  }, [activeSection]);

  const getContentDescription = (section: string) => {
    switch (section.toLowerCase()) {
      case 'about':
        return {
          h1: "Experience Information",
          p: [
            "Pulp is a boutique information design firm focused on conversation modeling, interaction design, and metadata.",
            "We specialize in creating innovative solutions that bridge the gap between complex data and user-friendly interfaces, enhancing communication and decision-making processes."
          ]
        };
      case 'services':
        return {
          h1: "Services & Specialties",
          p: [
            "Pulp delivers precision in conversation design, transforming analysis into actionable insights and interactive experiences that resonate.",
            "We offer a range of specialized services, from conversation modeling, advanced sentiment analysis, advertising technology, price prediction, and more."
          ]
        };
      case 'studio':
        return {
          h1: "Studio & Products",
          p: [
            "We are always excited to meet business owners that have complicated product ideas. Pulp loves to work with other companies that are committed to decreasing the cognitive load on their users.",
            "Our studio is where experimentation meets execution. We engineer products that challenge norms and elevate the information experience. ",
          ]
        };
      case 'people':
        return {
          h1: "People and Partnerships",
          p: [
            "Pulp is a group of seasoned executives, young professionals, and students. Our culture is all about harmonizing experience with fresh perspective.",
            "Shah Ullah, Founder & CEO",
            "Jeff Harris, Chief of Partnerships"
          ]
        };
      case 'blog':
        return {
          h1: "Research & Digital Civics",
          p: [
            "Pulp believes in the power of urgent dialogue to shape communities. We push boundaries in conversation research because informed action can't wait.",
            "As digital and civic engagement converge, we aim to build product experiences that offset cognitive load and distorted decision-making. ",
          ]
        };
      default:
        return {
          h1: "Discover More",
          p: "Find out about what we offer and how we can help you."
        };
    }
  };

  // Memoize the transition configuration
  const getTransitions = useCallback(() => {
    return useTransition(activeSection, {
      from: { transform: 'translateX(100%)' },
      enter: { transform: 'translateX(0%)' },
      leave: { transform: 'translateX(-100%)' },
      config: { mass: 1, tension: 280, friction: 60 },
    });
  }, [activeSection]);

  const getVideoSource = useCallback((section: SectionName) => {
    const videoSource = sectionVideos[section];
    console.log(`Video source for ${section}:`, videoSource);
    return videoSource;
  }, []);

  const transitions = getTransitions();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 3 seconds loading time, adjust as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className='flex flex-col lg:flex-row h-screen'>
      {/* Mobile Top Navbar */}
      <nav className='lg:hidden fixed top-0 left-0 right-0 bg-black z-50'>
        <div className='flex justify-between items-center p-4'>
          <Link href="/" onClick={() => handleNavClick('home')}>
            <Image src="/img/logo.svg" alt="logo" width={120} height={24} />
          </Link>
          <button 
            onClick={toggleMobileMenu} 
            className="text-white focus:outline-none"
          >
            <div className={`w-8 h-8 flex flex-col justify-center items-center ${mobileMenuOpen ? 'space-y-0' : 'space-y-2'}`}>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-x-0 top-[64px] bg-black z-40 transition-transform duration-300 ease-in-out transform ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <ul className='flex flex-col items-center py-4'>
          {navLinks.map((link) => (
            <li key={link.name} className="py-2">
              <button
                className="text-white hover:text-gray-300 text-xl"
                onClick={() => {
                  handleNavClick(link.name.toLowerCase());
                  setMobileMenuOpen(false);
                }}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Sidebar */}
      <nav className='hidden lg:flex w-[450px] shadow-sm flex-col relative overflow-hidden bg-black'>
        {/* Fixed header for Home button */}
        <div className="absolute top-0 left-0 right-0 bg-black border-b border-gray-800 z-30">
          <div className="flex items-center px-6 py-4">
            <button
              className="text-white text-xl hover:text-gray-300 transition-colors focus:outline-none flex items-center"
              onClick={() => handleNavClick('home')}
            >
              ← Home
            </button>
          </div>
        </div>

        {/* Main menu */}
        <div className={`absolute inset-0 flex items-center justify-center px-20 transition-opacity duration-500 ease-in-out ${showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-20 bg-black`}>
          <div className="w-full">
            <Link href="/" onClick={() => handleNavClick('home')}>
              <Image src="/img/logo.svg" alt="PULP" width={170} height={32} className="mb-16" />
            </Link>
            <ul className='flex flex-col items-start gap-8 w-full'>
              {navLinks.map((link) => (
                <li key={link.name} className="w-full">
                  <button
                    className="text-white text-2xl hover:text-gray-300 transition-colors focus:outline-none"
                    onClick={() => handleNavClick(link.name.toLowerCase())}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section content */}
        <div className={`absolute inset-0 flex flex-col justify-center items-start px-20 transition-opacity duration-500 ease-in-out ${!showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-10 bg-black`}>
          <div className="text-white">
            <h2 className="text-4xl lg:text-5xl mb-6 text-left">{activeContent.h1}</h2>
            {Array.isArray(activeContent.p) ? (
              activeContent.p.map((paragraph, index) => (
                <p key={index} className="text-xl mb-4 text-left leading-relaxed">{paragraph}</p>
              ))
            ) : (
              <p className="text-xl mb-8 text-left leading-relaxed">{activeContent.p}</p>
            )}
          </div>
        </div>

        {/* Fixed footer for navigation buttons */}
        <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-30">
          <div className="flex justify-between items-center px-6 py-4">
            <button
              className="text-white text-xl hover:text-gray-300 transition-colors focus:outline-none"
              onClick={() => {
                const currentIndex = navLinks.findIndex(link => link.name.toLowerCase() === activeSection);
                const prevIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
                handleNavClick(navLinks[prevIndex].name.toLowerCase());
              }}
            >
              ← Previous
            </button>
            <button
              className="text-white text-xl hover:text-gray-300 transition-colors focus:outline-none"
              onClick={() => {
                const currentIndex = navLinks.findIndex(link => link.name.toLowerCase() === activeSection);
                const nextIndex = (currentIndex + 1) % navLinks.length;
                handleNavClick(navLinks[nextIndex].name.toLowerCase());
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </nav>
      <div className='flex-grow relative overflow-hidden mt-[64px] lg:mt-0'>
        {transitions((style, item) => (
          <animated.div style={style} className="absolute inset-0 flex flex-col">
            <div className="relative w-full h-full lg:h-full">
              {sectionVideos[item] && (
                <>
                  {isVideoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                      <p className="text-white">Loading video for {item}...</p>
                    </div>
                  )}
                  <DynamicVideo
                    src={getVideoSource(item)}
                    onLoad={() => {
                      console.log(`Video for ${item} loaded successfully`);
                      setIsVideoLoaded(true);
                      setIsVideoLoading(false);
                    }}
                    onError={(e: Error) => {
                      console.error(`Error loading video for ${item}:`, e);
                      setVideoError(`Error loading video for ${item}`);
                      setIsVideoLoading(false);
                    }}
                  />
                  {videoError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                      <p className="text-white">{videoError}</p>
                    </div>
                  )}
                </>
              )}
              {item !== 'home' && (
                <div className="absolute inset-0 pointer-events-none" />
              )}

              {/* Centered logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className={`cursor-pointer transition-all duration-300 ${isLogoHovered || isLogoAnimating ? 'scale-110 brightness-125 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : ''}`}
                  onMouseEnter={() => setIsLogoHovered(true)}
                  onMouseLeave={() => setIsLogoHovered(false)}
                  onClick={() => {
                    const currentIndex = navLinks.findIndex(link => link.name.toLowerCase() === activeSection);
                    const nextIndex = (currentIndex + 1) % navLinks.length;
                    handleNavClick(navLinks[nextIndex].name.toLowerCase());
                    
                    setIsLogoAnimating(true);
                    if (logoTimeoutRef.current) {
                      clearTimeout(logoTimeoutRef.current);
                    }
                    logoTimeoutRef.current = setTimeout(() => {
                      setIsLogoAnimating(false);
                    }, 300);
                  }}
                >
                  <Image 
                    className={`transition-opacity duration-300 ${isLogoHovered || isLogoAnimating ? 'opacity-90' : 'opacity-50'}`}
                    src="/img/logo.svg" 
                    alt="Centered logo" 
                    width={200} 
                    height={40} 
                  />
                </div>
              </div>
            </div>
            
            {/* Mobile and tablet content for non-home sections */}
            {activeSection !== 'home' && (
              <div className="lg:hidden w-full h-1/2 md:h-1/3 bg-black flex flex-col">
                <div className="flex-grow overflow-y-auto">
                  <div className="text-white p-6">
                    <h2 className="text-4xl mb-4 text-left">{activeContent.h1}</h2>
                    {Array.isArray(activeContent.p) ? (
                      activeContent.p.map((paragraph, index) => (
                        <p key={index} className="text-xl mb-3 text-left leading-relaxed">{paragraph}</p>
                      ))
                    ) : (
                      <p className="text-xl mb-6 text-left leading-relaxed">{activeContent.p}</p>
                    )}
                  </div>
                </div>
                <div className="sticky bottom-0 flex justify-between items-center border-t border-gray-700 p-4 bg-black">
                  <button
                    className="text-white text-lg hover:text-gray-300 transition-colors focus:outline-none"
                    onClick={() => {
                      const currentIndex = navLinks.findIndex(link => link.name.toLowerCase() === activeSection);
                      const prevIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
                      handleNavClick(navLinks[prevIndex].name.toLowerCase());
                    }}
                  >
                    ← Previous
                  </button>
                  <button
                    className="text-white text-lg hover:text-gray-300 transition-colors focus:outline-none"
                    onClick={() => {
                      const currentIndex = navLinks.findIndex(link => link.name.toLowerCase() === activeSection);
                      const nextIndex = (currentIndex + 1) % navLinks.length;
                      handleNavClick(navLinks[nextIndex].name.toLowerCase());
                    }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </animated.div>
        ))}
      </div>
    </div>
  )
}

export default Home