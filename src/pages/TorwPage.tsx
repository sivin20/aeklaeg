import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MapPin, Clock } from 'lucide-react';
import React from 'react';

const TorwPage = () => {
  const brands = [
    {
      name: 'PIKE BROTHERS',
      description:
        'Autentisk workwear inspireret af 1930-1960. Slidstærkt tøj produceret på vintage shuttlevæve.',
      image: '/img/pikebrothers.png',
    },
    {
      name: 'STETSON',
      description:
        'Det ikoniske amerikanske hattemærke. Kvalitetshatte med historie.',
      image: '/img/stetson.png',
    },
    {
      name: 'LAKOR',
      description:
        'Dansk design med rødder i kystkulturen. Bæredygtighed møder humor.',
      image: '/img/lakor_outfit.png',
    },
    {
      name: 'SHEPHARD',
      description:
        'Håndlavede lædervarer fra Fyn og ægte fåreskindsprodukter fra Sverige.',
      image: '/img/shepard.png',
    },
  ];

  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col'>
      <Navigation />

      <main className='flex-grow'>
        {/* HERO SECTION */}
        <section className='relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden'>
          {/* Background Image with Overlay */}
          <div className='absolute inset-0'>
            <img
              src='/img/torw_hero.png'
              alt='TØRW Interiør'
              className='object-cover w-full h-full'
            />
            {/* Dark overlay to match site style */}
            <div className='absolute inset-0 bg-black/60' />
          </div>

          {/* Content */}
          <div className='relative z-10 px-4 w-full flex justify-center'>
            <img
              src='/logos/torw_white.svg'
              alt='TØRW Logo'
              className='max-w-md sm:max-w-2xl md:max-w-3xl drop-shadow-2xl mr-3'
            />
          </div>
        </section>

        {/* INTRO SECTION */}
        <section className='py-20 md:py-24 bg-background'>
          <div className='container mx-auto px-6'>
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6'>
                <h2 className='font-typewriter text-2xl md:text-3xl text-foreground'>
                  Slidstærkt arbejdstøj &{' '}
                  <span className='text-primary'>maritim elegance</span>
                </h2>
                <p className='text-muted-foreground text-lg leading-relaxed'>
                  Træd ind i TØRW, hvor vi hylder det gode håndværk. Vores butik
                  i Æ' Klæg byder på en unik shoppingoplevelse med fokus på
                  kvalitetstøj inspireret af 1920-1960'erne.
                </p>
                <div className='flex items-center gap-2 text-sm font-medium text-foreground pt-4'>
                  <MapPin className='h-4 w-4 text-primary' />
                  <span>Havnevej 2, Fanø</span>
                </div>
              </div>

              {/* Image Grid / Decoration */}
              <div className='relative mt-8 md:mt-0'>
                <div className='aspect-[4/5] overflow-hidden rounded-sm'>
                  <img
                    src='/img/shoes.png'
                    alt='Clothing detail'
                    className='object-cover w-full h-full hover:scale-105 transition-transform duration-700'
                  />
                </div>
                {/* Decorative offset box */}
                <div className='absolute -bottom-6 -left-6 w-2/3 h-1/2 bg-muted -z-10' />
              </div>
            </div>
          </div>
        </section>

        {/* BRANDS GRID */}
        <section
          className='py-20 bg-muted/30 border-y border-border scroll-mt-32'
          id='brands'
        >
          <div className='container mx-auto px-6'>
            <div className='text-center mb-16'>
              <h2 className='font-typewriter text-2xl md:text-3xl text-foreground mb-4'>
                Kuraterede Brands
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Vi udvælger nøje vores mærker baseret på historie, kvalitet og
                holdbarhed.
              </p>
            </div>

            {/* CHANGED: md:grid-cols-4 puts all items in one row on desktop */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              {brands.map((brand, idx) => (
                <div
                  key={idx}
                  // CHANGED: Removed custom colSpan.
                  // Added aspect-[3/4] which is standard portrait size, keeping them uniform and contained.
                  className='group relative overflow-hidden rounded-sm aspect-[3/4]'
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className='object-cover w-full h-full transition-transform duration-700 group-hover:scale-110'
                  />

                  {/* Gradient Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500' />

                  {/* Text Content */}
                  <div
                    className='absolute bottom-0 left-0 p-6 w-full transition-all duration-500 transform
                                  opacity-100 translate-y-0
                                  md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0'
                  >
                    <h3 className='font-typewriter text-lg md:text-xl text-white mb-2'>
                      {brand.name}
                    </h3>
                    <p className='text-white/80 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-none'>
                      {brand.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GROOMING SECTION */}
        <section className='py-20 md:py-24 bg-background'>
          <div className='container mx-auto px-6'>
            <div className='bg-card border border-border p-8 md:p-12'>
              <div className='grid md:grid-cols-2 gap-12 items-center'>
                <div className='order-2 md:order-1'>
                  <span className='text-primary text-xs font-bold tracking-widest uppercase mb-2 block'>
                    Grooming & Pleje
                  </span>
                  <h3 className='font-typewriter text-xl md:text-2xl mb-6 text-card-foreground'>
                    Til manden med og uden skæg
                  </h3>
                  <p className='text-muted-foreground mb-8'>
                    Vi tilbyder et udvalg af eksklusive plejeprodukter, der
                    forener traditioner med moderne behov. Fra italienske
                    klassikere som{' '}
                    <span className='text-foreground font-medium'>Proraso</span>{' '}
                    til svensk{' '}
                    <span className='text-foreground font-medium'>
                      Mr. Bear Family
                    </span>
                    .
                  </p>
                  <ul className='space-y-3 mb-8'>
                    {[
                      'Proraso',
                      'Taylor of Old Bond St.',
                      'Mr. Bear Family',
                      'Mühle Shaving',
                    ].map((item) => (
                      <li
                        key={item}
                        className='flex items-center gap-3 text-muted-foreground'
                      >
                        <div className='h-1.5 w-1.5 rounded-full bg-primary' />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='order-1 md:order-2 relative aspect-square md:aspect-[4/3] overflow-hidden rounded-sm'>
                  <img
                    src='https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=1472'
                    alt='Grooming products'
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VISIT BANNER */}
        <section className='py-20 bg-primary/5'>
          <div className='container mx-auto px-6 text-center'>
            <h2 className='font-typewriter text-2xl md:text-4xl text-foreground mb-6'>
              Kig forbi butikken
            </h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto mb-10'>
              Oplev kvaliteten med dine egne hænder. Vi står klar til at guide
              dig til det helt rigtige valg.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto'>
              <div className='bg-background p-6 border border-border flex items-center gap-4'>
                <div className='bg-primary/10 p-3 rounded-full'>
                  <Clock className='h-6 w-6 text-primary' />
                </div>
                <div className='text-left'>
                  <p className='font-medium text-foreground'>Åbningstider</p>
                  <p className='text-sm text-muted-foreground'>
                    Alle dage: 11.00 - 16.00
                  </p>
                </div>
              </div>

              <div className='bg-background p-6 border border-border flex items-center gap-4'>
                <div className='bg-primary/10 p-3 rounded-full'>
                  <MapPin className='h-6 w-6 text-primary' />
                </div>
                <div className='text-left'>
                  <p className='font-medium text-foreground'>Find os</p>
                  <p className='text-sm text-muted-foreground'>
                    Havnevej 2, Nordby
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TorwPage;
