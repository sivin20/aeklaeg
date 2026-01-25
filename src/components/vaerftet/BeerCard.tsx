import { Beer, Coffee, Droplets } from 'lucide-react';
import React from 'react';

const BeerCard = () => {
  return (
    <div className='bg-card border border-border/50 rounded-sm shadow-sm relative overflow-hidden grid grid-cols-1 md:grid-cols-2'>
      {/* LEFT SIDE: IMAGE SPLASH WITH TEXT OVERLAY */}
      <div className='relative h-96 md:h-full min-h-[400px] group'>
        <img
          src='/img/vaerftet_oel.jpg'
          alt='Værftet Beer'
          className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
        />
        {/* Gradient overlay for text readability */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent' />

        {/* Text Content Overlay */}
        <div className='absolute bottom-0 left-0 p-8 md:p-12 text-white z-10'>
          <div className='flex items-center gap-3 mb-4 opacity-90'>
            <Beer className='w-6 h-6 text-primary' />
            <span className='text-sm font-bold tracking-widest uppercase'>
              Signatur Øl
            </span>
          </div>
          <h3 className='font-typewriter text-xl md:text-2xl font-bold mb-4 leading-tight'>
            Værftet x Fanø Bryghus
          </h3>
          <p className='font-serif text-xl italic text-white/90 mb-6'>
            "100% Velvære"
          </p>
          <div className='text-sm text-white/70 space-y-1 leading-relaxed max-w-xs'>
            <p>
              Vores egen unikke{' '}
              <span className='text-primary font-medium'>Märzen</span>.
            </p>
            <p className='uppercase tracking-widest text-xs pt-2'>
              6.7% Alkohol • 55.4460 N 8.4055 E
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: SELECTION LIST */}
      <div className='p-8 md:p-12 flex flex-col justify-center'>
        <div className='text-left mb-8'>
          <h2 className='font-typewriter text-2xl md:text-3xl text-primary mb-4'>
            Øl & Vand
          </h2>
          <div className='h-1 w-16 bg-primary/30 rounded-full' />
        </div>

        <div className='space-y-10'>
          {/* Fanø Bryghus List */}
          <div>
            <h3 className='font-serif text-3xl text-foreground mb-3 flex items-center gap-2'>
              Fanø Bryghus
              <img
                src='/logos/fanoe_bryghus-primary.svg'
                alt='Fanø Bryghus Logo'
                className='w-20'
              />
            </h3>
            <p className='text-muted-foreground leading-relaxed text-sm'>
              Vi er stolte af at præsentere et stort udvalg af lokale specialøl
              fra Fanø Bryghus. Spørg i baren for at høre om dagens udvalg af
              sæsonens favoritter.
            </p>
          </div>

          {/* Non-Alcoholic Options */}
          <div className='pt-8 border-t border-border/30'>
            <h3 className='font-serif text-xl text-foreground mb-3 flex items-center gap-2'>
              <Droplets className='w-5 h-5 text-primary' />
              Alkoholfrie Alternativer
            </h3>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li className='flex items-center gap-3 group'>
                <span className='w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors' />
                Alkoholfri Øl (Specialudvalg)
              </li>
              <li className='flex items-center gap-3 group'>
                <span className='w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors' />
                Stort udvalg af sodavand
              </li>
              <li className='flex items-center gap-3 group'>
                <span className='w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors' />
                <span className='flex items-center gap-1'>
                  Kaffe & Varme drikke{' '}
                  <Coffee className='w-3.5 h-3.5 ml-1 opacity-70' />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Subtle background decoration for the right side */}
      <div className='absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -z-10 pointer-events-none mix-blend-multiply hidden md:block' />
    </div>
  );
};

export default BeerCard;
