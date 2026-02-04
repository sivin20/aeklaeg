import React from 'react';
import { Star, Quote, ArrowUpRight } from 'lucide-react';

const ElsesGabReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Steffen Uhl',
      text: 'En stille oase af velvære ikke langt fra færgehavnen. Venligt og opmærksomt personale. Indenfor minder det mere om en kærligt møbleret stue end en café (...). Vi nød klassisk smørebrød og sandwich, som var virkelig lækre. Den hjemmebagte kage kan også varmt anbefales. Det er et sted, hvor du bare kan slappe af.',
      source: 'Google',
      link: 'https://share.google/TaA3uNyrtY88dE409',
    },
    {
      id: 2,
      name: 'Carsten Hagemann',
      text: 'En hyggelig oase. Caféen er smukt indrettet og har endda omklædningsfaciliteter. Maden er fantastisk, og den varme chokolade kan varmt anbefales. Vi kommer helt sikkert tilbage.',
      source: 'Google',
      link: 'https://share.google/EsCxCujStvHcuyRWG',
    },
    {
      id: 3,
      name: 'Isa Grubbe',
      text: 'Fantastisk sted, tog til Fanø for en hyggelig dagstur. Fandt denne perle af et sted, fik en mad vaffel og en belgisk vaffel til dessert. Super lækkert',
      source: 'Google',
      link: 'https://maps.app.goo.gl/e7DCdcCwptt714JN7',
    },
  ];

  return (
    <section className='py-20 md:py-24 bg-muted/30 border-t border-border'>
      <div className='container mx-auto px-6'>
        {/* Header */}
        <div className='text-center mb-16 space-y-4'>
          <h2 className='font-typewriter text-2xl md:text-4xl text-foreground'>
            Det siger gæsterne om Elses Gab
          </h2>
          <div className='flex items-center justify-center gap-2 text-amber-500'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className='w-5 h-5 fill-current' />
              ))}
            </div>
            <span className='text-sm font-sans text-muted-foreground ml-2'>
              4.6 af 5 stjerner på Google
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {reviews.map((review) => (
            <a
              key={review.id}
              href={review.link}
              target='_blank'
              rel='noopener noreferrer'
              className='group relative bg-background p-8 rounded-sm shadow-sm border border-border/50 flex flex-col h-full hover:border-primary/40 hover:shadow-md transition-all duration-300'
            >
              <Quote className='absolute top-6 right-6 h-8 w-8 text-primary/10 rotate-180 group-hover:text-primary/20 transition-colors' />

              <div className='flex gap-1 mb-6 text-amber-500'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-4 h-4 fill-current' />
                ))}
              </div>

              <p className='font-serif text-lg text-foreground mb-6 flex-grow leading-relaxed italic opacity-90 group-hover:opacity-100 transition-opacity'>
                "{review.text}"
              </p>

              <div className='mt-auto pt-6 border-t border-border/50 flex items-center justify-between'>
                <div>
                  <p className='font-sans text-sm font-bold text-foreground group-hover:text-primary transition-colors'>
                    {review.name}
                  </p>
                  <p className='text-xs text-muted-foreground flex items-center gap-1'>
                    Via {review.source}
                    <ArrowUpRight className='h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300' />
                  </p>
                </div>

                <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300'>
                  {review.name.charAt(0)}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer Link */}
        <div className='mt-12 text-center'>
          <a
            href='https://share.google/AuIIzOMHtuoUuYgbb'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5'
          >
            Læs alle anmeldelser på Google
            <ArrowUpRight className='h-4 w-4' />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ElsesGabReviews;
