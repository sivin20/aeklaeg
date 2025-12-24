import Navigation from '@/components/Navigation.tsx';
import OpeningHours from '@/components/elses-gab/OpeningHours.tsx';
import Footer from '@/components/Footer.tsx';
import BarCard from '@/components/vaerftet/BarCard.tsx';
import React, { useEffect, useState } from 'react';
import AboutSection from '@/components/vaerftet/AboutSection.tsx';
import { Button } from '@/components/ui/button.tsx';
import ReviewSection from '@/components/vaerftet/ReviewSection.tsx';
import { useLocation } from 'react-router-dom';

const VaerftetPage = () => {
  // State to track if video is ready
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // We use a tiny timeout to ensure the element is rendered in the DOM before scrolling
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If no hash, scroll to top (standard behavior)
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navigation />
      <main>
        <section className='relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden'>
          {/* --- BACKGROUND LAYERS --- */}
          <div className='absolute inset-0 z-0'>
            {/* 1. Placeholder Image (Always visible, sits behind video)
                 Use a screenshot of the first frame of your video for the best effect.
            */}
            <img
              src='https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1547' // Replace with your 'poster.jpg'
              alt='Værftet background'
              className='absolute inset-0 w-full h-full object-cover'
            />

            {/* 2. The Video (Fades in over the image) */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload='auto'
              onLoadedData={() => setIsVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src='/bartending.mp4' type='video/mp4' />
            </video>

            {/* 3. Dark Overlay (Stays on top of both to keep text readable) */}
            <div className='absolute inset-0 bg-black/40 z-10'></div>
          </div>

          {/* --- TEXT CONTENT --- */}
          <div className='relative z-20 text-center px-4'>
            <h1 className='font-typewriter text-4xl md:text-7xl text-white drop-shadow-lg'>
              Velkommen til
            </h1>
            <h1 className='font-typewriter text-4xl md:text-7xl mb-6 text-white drop-shadow-lg'>
              Værftet
            </h1>
            <div className='flex gap-4 items-center justify-center w-full max-w-md mx-auto'>
              <a href='#bar-card' className='flex-1'>
                <Button className='w-full'>Barkort</Button>
              </a>
              <a href='#opening-hours' className='flex-1'>
                <Button className='w-full'>Åbningstider</Button>
              </a>
            </div>
          </div>

          <div className='absolute bottom-8 animate-bounce'>
            <img src='/anchor.svg' className='w-8' alt='Anchor' />
          </div>
        </section>

        <AboutSection />

        <OpeningHours pathPrefix='zhLGIqf2J0aXtotDOJYqLXodJTC2/vaerftet' />

        <BarCard />

        <ReviewSection />
      </main>
      <Footer />
    </div>
  );
};

export default VaerftetPage;
