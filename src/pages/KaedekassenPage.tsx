import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEvents } from '@/contexts/EventsContext';
import EventCard from '@/components/EventCard.tsx';
import { Button } from '@/components/ui/button.tsx';
import React, { useState } from 'react';

const KaedekassenPage = () => {
  const { upcomingEvents, previousEvents, isLoading } = useEvents();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className='relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden'>
          {/* --- BACKGROUND LAYERS --- */}
          <div className='absolute inset-0 z-0'>
            {/* 1. Placeholder Image (Always visible, sits behind video)
                 Use a screenshot of the first frame of your video for the best effect.
            */}
            <img
              src='/img/kaedekassen_hero.png' // Replace with your 'poster.jpg'
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
              <source src='/kaedekassen.mp4' type='video/mp4' />
            </video>

            {/* 3. Dark Overlay (Stays on top of both to keep text readable) */}
            <div className='absolute inset-0 bg-black/40 z-10'></div>
          </div>

          {/* --- TEXT CONTENT --- */}
          <div className='relative z-10 text-center px-4'>
            <img src='/logos/kaedekassen_white.svg' alt='Kædekassen logo' />
          </div>

          <div className='absolute bottom-8 animate-bounce'>
            <svg
              className='w-6 h-6 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className='py-16 md:py-24'>
          <div className='container mx-auto px-4'>
            <h2 className='font-serif text-3xl md:text-5xl font-bold text-center mb-16 text-foreground'>
              Kommende Events
            </h2>
            {isLoading ? (
              <p className='text-center'>Indlæser events...</p>
            ) : (
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12'>
                {upcomingEvents.slice(0, 6).map((ev) => (
                  <EventCard event={ev} key={ev.id} basePath='/kaedekassen' />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Previous Events */}
        <section className='py-16 md:py-24 bg-card'>
          <div className='container mx-auto px-4'>
            <h2 className='font-serif text-4xl text-center mb-12'>
              Musikere gennem tiden
            </h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
              {previousEvents.map((ev) => (
                <div
                  key={ev.id}
                  className='flex flex-col items-center text-center'
                >
                  <div className='w-full max-w-xs aspect-square overflow-hidden rounded-lg'>
                    <img
                      src={
                        ev.gallery_items?.data[0]?.original_url ??
                        '/placeholder.jpg'
                      }
                      alt={ev.name}
                      className='object-cover w-full h-full transition-transform duration-500 hover:scale-105'
                    />
                  </div>
                  <h3 className='mt-4 font-serif text-lg font-bold text-primary'>
                    {ev.name}
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    {new Date(ev.starts_at).toLocaleDateString('da-DK', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default KaedekassenPage;
