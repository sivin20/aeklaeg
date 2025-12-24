import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const TORW = () => {
  return (
    <section
      id='torw'
      className='py-20 md:py-32 bg-gradient-to-b from-card to-background'
    >
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          {/* Text Section */}
          <div className='order-2 md:order-1'>
            <div className='flex items-center gap-4 mb-6'>
              <h2 className='font-typewriter text-3xl md:text-5xl font-bold text-primary'>
                TØRW
              </h2>
              <img
                src='/logos/torw_primary.svg'
                alt='TØRW'
                className='h-12 md:h-16'
              />
            </div>
            <h3 className='font-serif text-2xl md:text-3xl mb-8 text-secondary tracking-wide'>
              Tøjbutik & Unika
            </h3>

            <div className='space-y-6 text-muted-foreground mb-10'>
              <p className='font-sans text-lg leading-relaxed'>
                Træd ind i TØRW, hvor mode møder stil og kvalitet. Vores butik
                på Fanø byder på en unik shoppingoplevelse i Æ’ Klæg – et lille
                kulturhus og butiksfællesskab tæt ved færgelejet.
              </p>
              <p className='font-sans text-lg leading-relaxed'>
                Vi fokuserer på klassisk tidløst design inspireret af
                1920-1960'ernes slidstærke arbejdstøj blandet med et maritimt
                udtryk. Her finder du også håndlavede lædervarer, hatte og
                plejeprodukter til manden med og uden skæg.
              </p>
            </div>

            {/* --- IMPROVED CTA --- */}
            <div className='flex flex-col sm:flex-row gap-4 pt-2'>
              <Link to='/torw'>
                <Button className='w-full sm:w-auto h-12 px-8 text-base gap-2 group'>
                  Oplev TØRW
                  <ArrowRight className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' />
                </Button>
              </Link>

              <Link to='/torw#brands'>
                <Button
                  variant='outline'
                  className='w-full sm:w-auto h-12 px-8 text-base gap-2 border-primary/20 hover:border-primary hover:bg-primary/5'
                >
                  <ShoppingBag className='w-4 h-4' />
                  Se Brands
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className='order-1 md:order-2'>
            <div className='relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl group'>
              <img
                src='/img/torw.png'
                alt='TØRW Tøjbutik'
                className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-out'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background/40 to-transparent'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TORW;
