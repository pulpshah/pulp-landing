'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { navLinks } from '../constants/data'
import { useTransition, animated } from 'react-spring';

const sectionVideos = {
  home: "/img/planeVid.mp4",
  about: "/img/brain.mp4",
  services: "/img/sea.mp4",
  studio: "/img/telescope.mp4",
  people: "/img/square.mp4",
  blog: "/img/studio.mp4"
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
          h1: "People and Partnerships",
          p: [
            "Pulp is a group of seasoned executives, young professionals, and students. Our culture is all about harmonizing experience with fresh perspective.",
            "Shah Ullah, Founder & CEO",
            "Jeff Harris, Chairman & Chief of Partnerships"
          ]
        };
      case 'people':
        return {
          h1: "Research & Digital Civics",
          p: [
            "Pulp believes in the power of urgent dialogue to shape communities. We push boundaries in conversation research because informed action can't wait.",
            "As digital and civic engagement converge, we aim to build product experiences that offset cognitive load and distorted decision-making. ",
          ]
        };
      case 'blog':
        return {
          h1: "Studio & Products",
          p: [
            "We are always excited to meet business owners that have complicated product ideas. Pulp loves to work with other companies that are committed to decreasing the cognitive load on their users.",
            "Our studio is where experimentation meets execution. We engineer products that challenge norms and elevate the information experience. ",
          ]
        };
      default:
        return {
          h1: "Discover More",
          p: "Find out about what we offer and how we can help you."
        };
    }
  };

  const transitions = useTransition(activeSection, {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { mass: 1, tension: 280, friction: 60 },
  });

  return (
    <div className='flex flex-col lg:flex-row h-screen'>
      {/* Mobile Top Navbar */}
      <nav className='lg:hidden fixed top-0 left-0 right-0 bg-black z-50'>
        <div className='flex justify-between items-center p-4'>
          <Link href="/">
            <Image src="/img/logo.svg" alt="logo" width={120} height={24} />
          </Link>
          <button 
            onClick={toggleMobileMenu} 
            className="text-white focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
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
      <nav className='hidden lg:flex w-[450px] shadow-sm flex-col relative overflow-hidden'>
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
        <div className={`absolute inset-0 flex items-center justify-center px-20 transition-opacity duration-500 ease-in-out ${showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-20`}>
          <div className="w-full">
            <Image src="/img/logo.svg" alt="PULP" width={170} height={32} className="mb-16" />
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
        <div className={`absolute inset-0 flex flex-col justify-center items-start px-20 transition-opacity duration-500 ease-in-out ${!showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-10`}>
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
          <animated.div style={style} className="absolute inset-0">
            {sectionVideos[item] ? (
              <div className="relative w-full h-full">
                <video
                  className='w-full h-[calc(100vh-64px)] lg:h-screen object-cover'
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={sectionVideos[item]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {item !== 'home' && (
                  <div className="absolute inset-0  pointer-events-none" />
                )}
              </div>
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center text-white text-2xl">
                No video available for this section
              </div>
            )}
          </animated.div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <Image 
            className={`transition-all duration-300 opacity-50 w-[200px] h-[50px] lg:w-[200px] lg:h-[40px] ${isLogoHovered ? 'opacity-90 scale-110 filter brightness-125 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : ''}`}
            onClick={() => {
              const currentIndex = navLinks.findIndex(link => link.name.toLowerCase() === activeSection);
              const nextIndex = (currentIndex + 1) % navLinks.length;
              handleNavClick(navLinks[nextIndex].name.toLowerCase());
            }}
            src="/img/logo.svg" 
            alt="Centered logo" 
            width={250} 
            height={40} 
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          />
        </div>
        
        {/* Mobile content for non-home sections */}
        {activeSection !== 'home' && (
          <div className="lg:hidden absolute inset-x-0 bottom-0 bg-black bg-opacity-80 text-white p-6">
            <h2 className="text-4xl mb-4 text-left">{activeContent.h1}</h2>
            {Array.isArray(activeContent.p) ? (
              activeContent.p.map((paragraph, index) => (
                <p key={index} className="text-xl mb-3 text-left leading-relaxed">{paragraph}</p>
              ))
            ) : (
              <p className="text-xl mb-6 text-left leading-relaxed">{activeContent.p}</p>
            )}
            <div className="flex justify-between items-center mt-6 border-t border-gray-700 pt-4">
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
                onClick={() => handleNavClick('home')}
              >
                Home
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
      </div>
    </div>
  )
}

export default Home