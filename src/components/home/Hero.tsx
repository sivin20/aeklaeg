import { Link } from 'react-router-dom';

const Hero = () => {
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

      <div className='relative z-10 container mx-auto px-4 text-center animate-fade-in'>
        <img
          src='/logos/aeklaeg_primary.svg'
          alt='Æ Klæg'
          className='h-24 md:h-40 mx-auto mb-6'
        />
        <p className='font-typewriter text-2xl md:text-4xl mb-4 text-primary'>
          Æ Klæg
        </p>
        <div className='max-w-2xl mx-auto mt-12 space-y-6'>
          <p className='font-sans text-lg md:text-xl text-muted-foreground leading-relaxed'>
            Er navnet på den paraply, der samler alle vores aktiviteter på
            Havnevej 2
          </p>
          <div className='grid grid-cols-2 gap-4 mt-8 text-sm md:text-base'>
            <Link to='/vaerftet'>
              <div className='group p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-all duration-300 flex items-center justify-between gap-3 hover:bg-card/70'>
                <div className='items-start flex flex-col'>
                  <p className='font-sans text-foreground text-sm'>
                    Cocktailbaren
                  </p>
                  <p className='font-sans text-foreground text-sm'>Værftet</p>
                </div>
                <img
                  src='/logos/vaerftet_white.svg'
                  alt='Værftet'
                  className='h-8 sm:h-16 transition-transform duration-300 group-hover:scale-110'
                />
              </div>
            </Link>
            <Link to='/elses-gab'>
              <div className='group p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-all duration-300 flex items-center justify-between gap-3 hover:bg-card/70'>
                <div className='items-start flex flex-col'>
                  <p className='font-sans text-foreground text-sm'>Caféen</p>
                  <p className='font-sans text-foreground text-sm'>Elses Gab</p>
                </div>
                <img
                  src='/logos/elsesgab_white.svg'
                  alt='Elses Gab'
                  className='h-8 sm:h-16 transition-transform duration-300 group-hover:scale-110'
                />
              </div>
            </Link>
            <Link to='/kaedekassen'>
              <div className='group p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-all duration-300 flex items-center justify-between gap-3 hover:bg-card/70'>
                <div className='items-start flex flex-col'>
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
                  className='h-8 sm:h-16 transition-transform duration-300 group-hover:scale-110'
                />
              </div>
            </Link>
            <Link to='/torw'>
              <div className='group p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-all duration-300 flex items-center justify-between gap-3 hover:bg-card/70'>
                <div className='items-start flex flex-col'>
                  <p className='font-sans text-foreground text-sm'>
                    Tøjbutikken
                  </p>
                  <p className='font-sans text-foreground text-sm'>TØRW</p>
                </div>
                <img
                  src='/logos/torw_white.svg'
                  alt='TØRW'
                  className='h-8 sm:h-16 transition-transform duration-300 group-hover:scale-110'
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
