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
        <h1 className='font-serif text-6xl md:text-8xl font-bold mb-6 text-primary'>
          Æ Klæg
        </h1>
        <p className='font-serif text-2xl md:text-4xl mb-4 text-foreground'>
          Havnevej 2, 6720
        </p>
        <div className='max-w-2xl mx-auto mt-12 space-y-6'>
          <p className='font-sans text-lg md:text-xl text-muted-foreground leading-relaxed'>
            Er navnet på den paraply, der samler alle vores aktiviteter på
            Havnevej 2
          </p>
          <div className='grid grid-cols-2 gap-4 mt-8 text-sm md:text-base'>
            <a href='/vaerftet'>
              <div className='p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors'>
                <p className='font-sans text-foreground'>
                  Cocktailbaren Værftet
                </p>
              </div>
            </a>
            <a href='/elses-gab'>
              <div className='p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors'>
                <p className='font-sans text-foreground'>Caféen Elses Gab</p>
              </div>
            </a>
            <a href='/torw'>
              <div className='p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors'>
                <p className='font-sans text-foreground'>Tøjbutikken TØRW</p>
              </div>
            </a>
            <a href='#'>
              <div className='p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors'>
                <p className='font-sans text-foreground'>
                  Galleri & Udstillinger
                </p>
              </div>
            </a>
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
