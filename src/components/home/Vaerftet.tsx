import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { ArrowRight, Martini } from 'lucide-react'; // Make sure to import these

const Vaerftet = () => {
  return (
    <section
      id='vaerftet'
      className='py-20 md:py-32 bg-gradient-to-b from-background to-card'
    >
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          {/* Image Section */}
          <div className='order-1 md:order-1'>
            {/* Note: I added order-classes to ensure image is always where you want it on mobile vs desktop */}
            <div className='relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl group'>
              <img
                src='/img/vaerftet.png'
                alt='Værftet Cocktailbar'
                className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-out'
              />
              {/* Darker gradient overlay for more mood */}
              <div className='absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent'></div>
            </div>
          </div>

          {/* Text Section */}
          <div className='order-1 md:order-2'>
            <div className='flex items-center gap-4 mb-6'>
              <h2 className='font-typewriter text-3xl md:text-5xl font-bold text-primary'>
                Værftet
              </h2>
              {/* Added brightness-0 invert if you need the logo white, remove if it's already correct color */}
              <img
                src='/logos/vaerftet_primary.svg'
                alt='Værftet'
                className='h-12 md:h-16'
              />
            </div>
            <h3 className='font-serif text-2xl md:text-3xl mb-8 text-secondary tracking-wide'>
              Autentisk Cocktailbar
            </h3>

            <div className='space-y-6 text-muted-foreground mb-10'>
              <p className='font-sans text-lg leading-relaxed'>
                Værftet er vores cocktailbar, hvor vi kombinerer klassiske
                drinks med moderne kreationer. Baren er indrettet i gammel
                værftstil med autentiske detaljer og en varm atmosfære.
              </p>
              <p className='font-sans text-lg leading-relaxed'>
                Her kan du nyde alt fra en klassisk Old Fashioned til vores egne
                specialiteter, alle lavet med omhu og de bedste ingredienser.
              </p>
            </div>

            {/* --- IMPROVED CALL TO ACTION --- */}
            <div className='flex flex-col sm:flex-row gap-4 pt-2'>
              <Link to='/vaerftet'>
                <Button className='w-full sm:w-auto h-12 px-8 text-base gap-2 group'>
                  Oplev Værftet
                  <img
                    src='/anchor-text.svg'
                    alt='Anchor Right'
                    className='w-4 h-4 rotate-[270deg] transition-transform duration-300 group-hover:translate-x-1'
                  />
                </Button>
              </Link>

              <Link to='/vaerftet#bar-card'>
                <Button
                  variant='outline'
                  className='w-full sm:w-auto h-12 px-8 text-base gap-2 border-primary/20 hover:border-primary hover:bg-primary/5'
                >
                  <Martini className='w-4 h-4' />
                  Se Cocktailkort
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vaerftet;
