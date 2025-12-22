import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate rotation and scale based on scroll
  const rotation = scrollY * 0.05; // Rotate as you scroll
  const scale = 1 + Math.min(scrollY * 0.0003, 0.15); // Grow up to 15% larger

  return (
    <section
      id='hjem'
      className='relative min-h-screen flex items-center justify-center overflow-hidden'
    >
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974')",
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background'></div>
      </div>

      {/* Background Logo */}
      <div className='absolute inset-0 z-[5] flex items-center justify-center pointer-events-none'>
        <img
          src='/logos/aeklaeg_primary.svg'
          alt=''
          className='w-[85%] max-w-[500px] md:max-w-none md:w-auto md:h-[75vh] opacity-[0.75] transition-transform duration-100 ease-out'
          style={{
            transform: `rotate(${rotation}deg) scale(${scale})`,
          }}
        />
      </div>

      <div className='relative z-10 container mx-auto px-4 text-center animate-fade-in'>
        <div className='max-w-2xl mx-auto mb-12 space-y-6'>
          <div className='grid grid-cols-2 gap-4 mt-8 text-sm md:text-base'>
            <Link to='/vaerftet'>
              <div className='group p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-all duration-300 flex items-center justify-center sm:justify-between gap-3 hover:bg-card/70'>
                <div className='items-center sm:items-start flex flex-col'>
                  <p className='font-sans text-foreground text-sm'>
                    Cocktailbaren
                  </p>
                  <p className='font-sans text-foreground text-sm'>Værftet</p>
                </div>
                <img
                  src='/logos/vaerftet_white.svg'
                  alt='Værftet'
                  className='hidden sm:block h-8 sm:h-16 transition-transform duration-300 group-hover:scale-110'
                />
              </div>
            </Link>
            <Link to='/elses-gab'>
              <div className='group p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-all duration-300 flex items-center justify-center sm:justify-between gap-3 hover:bg-card/70'>
                <div className='items-center sm:items-start flex flex-col'>
                  <p className='font-sans text-foreground text-sm'>Caféen</p>
                  <p className='font-sans text-foreground text-sm'>Elses Gab</p>
                </div>
                <img
                  src='/logos/elsesgab_outlined-white.svg'
                  alt='Elses Gab'
                  className='hidden sm:block h-8 sm:h-16 transition-transform duration-300 group-hover:scale-110'
                />
              </div>
            </Link>
            <Link to='/kaedekassen'>
              <div className='group p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-all duration-300 flex items-center justify-center sm:justify-between gap-3 hover:bg-card/70'>
                <div className='items-center sm:items-start flex flex-col'>
                  <p className='font-sans text-foreground text-sm'>
                    Spillestedet
                  </p>
                  <p className='font-sans text-foreground text-sm'>
                    Kædekassen
                  </p>
                </div>
                <img
                  src='/logos/kaedekassen_white.svg'
                  alt='Kædekassen'
                  className='hidden sm:block h-8 sm:h-16 transition-transform duration-300 group-hover:scale-110'
                />
              </div>
            </Link>
            <Link to='/torw'>
              <div className='group p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-all duration-300 flex items-center justify-center sm:justify-between gap-3 hover:bg-card/70'>
                <div className='items-center sm:items-start flex flex-col'>
                  <p className='font-sans text-foreground text-sm'>
                    Tøjbutikken
                  </p>
                  <p className='font-sans text-foreground text-sm'>TØRW</p>
                </div>
                <img
                  src='/logos/torw_white.svg'
                  alt='TØRW'
                  className='hidden sm:block h-8 sm:h-16 transition-transform duration-300 group-hover:scale-110'
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'>
        <svg
          className='w-6 h-6 text-primary'
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
  );
};

export default Hero;
