import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { ArrowRight, Table, Table2, Utensils } from 'lucide-react';

const ElsesGab = () => {
  return (
    <section id='elses-gab' className='py-20 md:py-32 bg-background'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          {/* Text Section */}
          <div className='order-2 md:order-1'>
            <div className='flex items-center gap-4 mb-6'>
              <h2 className='font-serif text-4xl md:text-6xl font-bold text-primary'>
                Elses Gab
              </h2>
              <img
                src='/logos/elsesgab_outlined-primary.svg'
                alt='Elses Gab'
                className='h-12 md:h-16'
              />
            </div>
            <h3 className='font-serif text-2xl md:text-3xl mb-8 text-secondary tracking-wide'>
              Café & Spisested
            </h3>

            <div className='space-y-6 text-muted-foreground mb-10'>
              <p className='font-sans text-lg leading-relaxed'>
                Elses Gab er en hyggelig café, der emmer af hjemlig charme. Her
                bydes gæsterne velkommen af duften af friskbagt brød og
                nybrygget kaffe.
              </p>
              <p className='font-sans text-lg leading-relaxed'>
                På menukortet finder du smørrebrød med et tvist, åbne sandwiches
                på hjemmebagt brød og madvafler. Stuen vækker minder om et besøg
                hos bedstemor og danner rammen om en hyggelig frokost i
                sofagruppen.
              </p>
            </div>

            {/* --- IMPROVED CTA --- */}
            <div className='flex flex-col sm:flex-row gap-4 pt-2'>
              <Link to='/elses-gab'>
                <Button className='w-full sm:w-auto h-12 px-8 text-base gap-2 group'>
                  Se Menukort
                  <img
                    src='/anchor-text.svg'
                    alt='Anchor Right'
                    className='w-4 h-4 rotate-[270deg] transition-transform duration-300 group-hover:translate-x-1'
                  />
                </Button>
              </Link>

              <Link to='/elses-gab#event-space'>
                <Button
                  variant='outline'
                  className='w-full sm:w-auto h-12 px-8 text-base gap-2 border-primary/20 hover:border-primary hover:bg-primary/5'
                >
                  Book et bord
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className='order-1 md:order-2'>
            <div className='relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl group'>
              <img
                src='/img/elsesgab.png'
                alt='Elses Gab Café'
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

export default ElsesGab;
